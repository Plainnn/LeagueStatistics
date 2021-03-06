const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const { Kayn, REGIONS, BasicJSCache, METHOD_NAMES } = require('kayn');

const basicCache = new BasicJSCache();
const myCache = basicCache;

const kayn = Kayn(process.env.API_KEY)({
  apiURLPrefix: 'https://%s.api.riotgames.com',
  locale: 'en_US',
  debugOptions: {
    isEnabled: true,
    showKey: false,
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: true,
    shouldExitOn403: false,
  },
  cacheOptions: {
    cache: myCache,
    timeToLives: {
      useDefault: true,
      byGroup: {
        DDRAGON: 1000 * 60 * 60 * 24 * 30,
        SUMMONER: 100000,
      },
    },
  },
});

exports.getWinLoss = async (req, res) => {
  let userData = {};
  const processMatch = (championIdMap, summonerId, match) => {
    const { participantId } = match.participantIdentities.find(
      (pi) => pi.player.summonerId === summonerId
    );
    const participant = match.participants.find(
      (p) => p.participantId === participantId
    );

    // console.log(participant.timeline.lane);

    const champion = championIdMap.data[participant.championId];

    return {
      gameCreation: match.gameCreation,
      seasonId: match.seasonId,
      didWin:
        participant.teamId ===
        match.teams.find(({ win }) => win === 'Win').teamId,
      championName: champion.name,
      championId: champion.id,
      championKey: champion.key,
      creepScore: participant.stats.totalMinionsKilled,
      lanePlayed: participant.timeline.lane,
    };
  };

  const efficiently = async (kayn) => {
    try {
      const championIdMap = await kayn.DDragon.Champion.listDataByIdWithParentAsId();
      const { id, accountId, summonerId } = await kayn.Summoner.by
        .name(req.params.name)
        .region(req.params.platform.toLowerCase());

      const { matches } = await kayn.Matchlist.by
        .accountID(accountId)
        .query({ queue: 420 })
        .region(req.params.platform.toLowerCase());
      const gameIds = matches.slice(0, 10).map(({ gameId }) => gameId);
      const matchDtos = await Promise.all(
        gameIds.map((gameId) =>
          kayn.Match.get(gameId).region(req.params.platform.toLowerCase())
        )
      );
      // `processor` is a helper function to make the subsequent `map` cleaner.
      const processor = (match) => processMatch(championIdMap, id, match);
      const results = await Promise.all(matchDtos.map(processor));
      // Add All Creepscores
      const cs = results.reduce((a, b) => ({
        creepScore: a.creepScore + b.creepScore,
      }));

      //Reduce Results Array, adding wins and losses to the accumlator finally returning the array.
      const winRate = results.reduce((acc, cur) => {
        let champion = cur['championName'];
        let won = cur['didWin'] === true;
        let id = cur['championId'];
        let key = cur['championKey'];
        if (!acc[champion]) {
          acc[champion] = {
            championName: champion,
            id: id,
            key,
            won: won ? 1 : 0,
            lost: won ? 0 : 1,
            rate: won ? 1 : 0,
          };
        } else {
          acc[champion].won += won ? 1 : 0;
          acc[champion].lost += won ? 0 : 1;
          acc[champion].rate =
            (acc[champion].won + 1) /
            (acc[champion].won + 1 + acc[champion].lost);
        }

        return acc;
      }, {});

      let data = [];

      const groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      //Group Wins
      const copy = results.filter((val) => val.didWin == true);
      let grouped = Object.entries(groupBy(copy, 'championName'));

      //Group Losses
      const copyLoss = results.filter((val) => val.didWin == false);
      let groupedLoss = Object.entries(groupBy(copyLoss, 'championName'));

      //Create Win Object
      const wins = Object.keys(grouped).map((el) => {
        return {
          champ: grouped[el][0],
          wins: grouped[el][1].length,
        };
      });

      //Reduce who has the most wins, repeat for losses
      const mostWins = wins.reduce((champ, game) =>
        champ.wins > game.wins ? champ : game
      );

      const loss = Object.keys(groupedLoss).map((el) => {
        return {
          champ: groupedLoss[el][0],
          losses: groupedLoss[el][1].length,
        };
      });

      const mostLosses = loss.reduce((champ, game) =>
        champ.losses > game.losses ? champ : game
      );

      res.json({
        mostWins,
        mostLosses,
        winRate,
        cs,
      });
    } catch (error) {
      if (error.statusCode == 404) {
        res.status(404).json({
          message: 'User Not Found',
          error,
        });
      } else if (error.statusCode == 500) {
        res.status(500).json({
          message: 'Internal Server Error',
          error,
        });
      } else {
        res.status(400).json({
          message: 'Bad Request - Check API key',
          error,
        });
      }
    }
  };

  const main = async (kayn) => {
    let results = await efficiently(kayn);
  };

  main(kayn).then;
};
