const dotenv = require('dotenv');
const https = require('https');
dotenv.config({ path: './config.env' });
const { Kayn, REGIONS, BasicJSCache, METHOD_NAMES } = require('kayn');
const axios = require('axios');

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
exports.getLeagues = async (req, res) => {
  ///leagues/:region/:league/:page
  const regions = {
    br: 'br1',
    eun: 'eun1',
    euw: 'euw1',
    jp: 'jp1',
    kr: 'kr',
    la: 'la1',
    na: 'na1',
    oc: 'oc1',
    tr: 'tr1',
    ru: 'ru',
  };

  let baseUrl = `https://${
    regions[req.params.region]
  }.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${req.params.league.toUpperCase()}/${
    req.params.rank
  }?page=${req.params.page}&api_key=${process.env.API_KEY}`;

  try {
    const response = await axios.get(baseUrl);
    const sendResponse = response.data;
    console.log(sendResponse);
    res.json({
      sendResponse,
    });
  } catch (error) {
    console.error(error);
  }
};
