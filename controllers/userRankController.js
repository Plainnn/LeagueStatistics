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

exports.getRank = async (req, res) => {
  let userData = {};

  const efficiently = async (kayn) => {
    let data = {};
    try {
      const summoner = await kayn.Summoner.by
        .name(req.params.name)
        .region(req.params.platform.toLowerCase());
      // req.params.platform but i recieve in like euw/na/kr/br/ needs to be changed into the right format of REGIONS.NORTH_AMERICA (for example)
      const rankedData = await kayn.League.Entries.by
        .summonerID(summoner.id)
        .region(req.params.platform.toLowerCase());

      if (rankedData.length == 0) {
        data = {
          summonerName: summoner.name,
          summmonerTier: 'Unranked',
          summmonerRank: ' ',
          summonerWins: 'No Ranked Wins',
          summonerLosses: 'No Ranked Losses',
          summonerLp: '0',
          summonerLeagueName: ' ',
          profileIcon: summoner.profileIconId,
        };
      } else {
        const leagueData = await kayn.League.by
          .uuid(rankedData[0].leagueId)
          .region(req.params.platform.toLowerCase());
        const newRankedData = await rankedData.filter(
          (d) => d.queueType === 'RANKED_SOLO_5x5'
        );
        data = {
          summonerName: summoner.name,
          summmonerTier: newRankedData[0].tier,
          summmonerRank: newRankedData[0].rank,
          summonerWins: newRankedData[0].wins,
          summonerLosses: newRankedData[0].losses,
          summonerLp: newRankedData[0].leaguePoints,
          summonerLeagueName: leagueData.name,
          profileIcon: summoner.profileIconId,
        };
      }

      res.json({
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  const main = async (kayn) => {
    let results = await efficiently(kayn);
  };

  main(kayn).then;
};
