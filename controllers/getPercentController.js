const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const { Kayn, REGIONS, BasicJSCache, METHOD_NAMES } = require('kayn');

const basicCache = new BasicJSCache();
const myCache = basicCache;

const kayn = Kayn(process.env.API_KEY)({
  region: REGIONS.EUROPE_WEST,
  apiURLPrefix: 'https://%s.api.riotgames.com',
  locale: 'en_US',
  debugOptions: {
    isEnabled: true,
    showKey: false
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: true,
    shouldExitOn403: false
  },
  cacheOptions: {
    cache: myCache,
    timeToLives: {
      useDefault: true,
      byGroup: {
        DDRAGON: 1000 * 60 * 60 * 24 * 30,
        SUMMONER: 100000
      }
    }
  }
});
exports.getPercent = async (req, res) => {
  let userData = {};

  const processMatch = (championIdMap, summonerId, match) => {
    const { participantId } = match.participantIdentities.find(
      pi => pi.player.summonerId === summonerId
    );
    const participant = match.participants.find(
      p => p.participantId === participantId
    );
    const champion = championIdMap.data[participant.championId];
    return {
      gameCreation: match.gameCreation,
      seasonId: match.seasonId,
      didWin:
        participant.teamId ===
        match.teams.find(({ win }) => win === 'Win').teamId,
      championName: champion.name
    };
  };

  const efficiently = async kayn => {
    try {
      const championIdMap = await kayn.DDragon.Champion.listDataByIdWithParentAsId();
      const { id, accountId } = await kayn.Summoner.by.name(req.params.name);
      const { matches } = await kayn.Matchlist.by
        .accountID(accountId)
        .query({ queue: 420 });
      const gameIds = matches.slice(0, 20).map(({ gameId }) => gameId);
      const matchDtos = await Promise.all(gameIds.map(kayn.Match.get));
      // `processor` is a helper function to make the subsequent `map` cleaner.
      const processor = match => processMatch(championIdMap, id, match);
      const results = await Promise.all(matchDtos.map(processor));
      res.json({ results });
      let data = [];

      const groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const copy = results.filter(val => val.didWin == true);
      let grouped = Object.entries(groupBy(copy, 'championName'));

      const copyLoss = results.filter(val => val.didWin == false);
      let groupedLoss = Object.entries(groupBy(copyLoss, 'championName'));

      const wins = Object.keys(grouped).map(el => {
        return {
          champ: grouped[el][0],
          wins: grouped[el][1].length
        };
      });

      const mostWins = wins.reduce((champ, game) =>
        champ.wins > game.wins ? champ : game
      );

      const loss = Object.keys(groupedLoss).map(el => {
        return {
          champ: groupedLoss[el][0],
          losses: groupedLoss[el][1].length
        };
      });

      const mostLosses = loss.reduce((champ, game) =>
        champ.losses > game.losses ? champ : game
      );

      
    } catch (error) {
      res.status(400).json({
        error
      });
    }
  };

  const main = async kayn => {
    let results = await efficiently(kayn);
  };

  main(kayn).then;
};
