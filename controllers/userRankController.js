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
  console.log(`User Found: ${req.params.name} 1`);
  console.log(`Region Found: ${req.params.platform}`);
  const efficiently = async (kayn) => {
    try {
      const summoner = await kayn.Summoner.by
        .name(req.params.name)
        .region(REGIONS.EUROPE_WEST); // req.params.platform but i recieve in like euw/na/kr/br/ needs to be changed into the right format of REGIONS.NORTH_AMERICA (for example)
      const rankedData = await kayn.League.Entries.by.summonerID(summoner.id);
      console.log(rankedData.length);
      if (!rankedData.length) {
        const data = {
          summonerName: summoner.name,
          summmonerRank: 'Unranked',
          profileIcon: summoner.profileIconId,
        };

        res.json({
          data,
        });
      } else {
        const leagueData = await kayn.League.by.uuid(rankedData[0].leagueId);
        const newRankedData = await rankedData.filter(
          (d) => d.queueType === 'RANKED_SOLO_5x5'
        );
        const data = {
          summonerName: summoner.name,
          summmonerTier: newRankedData[0].tier,
          summmonerRank: newRankedData[0].rank,
          summonerWins: newRankedData[0].wins,
          summonerLosses: newRankedData[0].losses,
          summonerLp: newRankedData[0].leaguePoints,
          summonerLeagueName: leagueData.name,
          profileIcon: summoner.profileIconId,
        };

        console.log(data);

        res.json({
          data,
        });
      }
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
