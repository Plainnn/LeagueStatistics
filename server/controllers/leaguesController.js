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

exports.matchTimeline = async (req, res) => {
  let userData = {};
  const processMatch = (championIdMap, summonerId, match) => {
    const { participantId } = match.participantIdentities.find(
      (pi) => pi.player.summonerId === summonerId
    );
    const participant = match.participants.find(
      (p) => p.participantId === participantId
    );

    let enemy = match.participants.map(({ participantId, championId }) => ({
      participantId,
      championId,
    }));

    const participantChampion = participant.championId;

    return {
      enemy,
      participantChampion: participant.championId,
      participantStats: participant.stats,
      participantChampion,
      participantId,
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
      const gameIds = matches.slice(0, 1).map(({ gameId }) => gameId);
      const matchDtos = await Promise.all(
        gameIds.map((gameId) =>
          kayn.Match.get(gameId).region(req.params.platform.toLowerCase())
        )
      );
      // `processor` is a helper function to make the subsequent `map` cleaner.
      const processor = (match) => processMatch(championIdMap, id, match);
      const results = await Promise.all(matchDtos.map(processor));

      const timeLine = await kayn.Match.timeline(gameIds).region(
        req.params.platform.toLowerCase()
      );

      const participantIdS = results[0].participantId;
      const gameId = gameIds[0];

      const frames = timeLine;

      const pFrames = frames.frames.map((frame) => {
        return Object.keys(frame.participantFrames)
          .filter(
            (key) =>
              frame.participantFrames[key].participantId === participantIdS
          )
          .map((key) => frame.participantFrames[key]);
      });

      const pEvents = frames.frames.map((frame) => {
        return Object.keys(frame.events)
          .filter((key) => frame.events[key].participantId === participantIdS)
          .map((key) => frame.events[key]);
      });

      const pKills = frames.frames.map((frame) => {
        return Object.keys(frame.events)
          .filter((key) => frame.events[key].killerId === participantIdS)
          .map((key) => frame.events[key]);
      });

      const pDeaths = frames.frames.map((frame) => {
        return Object.keys(frame.events)
          .filter((key) => frame.events[key].victimId === participantIdS)
          .map((key) => frame.events[key]);
      });

      const participantFrames = [].concat.apply([], pFrames);
      const participantEvents = [].concat.apply([], pEvents);
      const participantKills = [].concat.apply([], pKills);
      const participantDeaths = [].concat.apply([], pDeaths);

      const allEvents = participantEvents.concat(
        participantKills,
        participantDeaths
      );

      const sortedEvents = allEvents.sort(function (a, b) {
        return a.timestamp - b.timestamp;
      });

      var resultTotal = participantFrames.map((a) => a.totalGold);
      var resultCurrent = participantFrames.map((a) => a.currentGold);

      res.json({
        results,
        resultTotal,
        resultCurrent,
        sortedEvents,
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode == 404) {
        res.status(404).json({
          error,
        });
      } else {
        res.status(400).json({
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

exports.getCs = async (req, res) => {
  let userData = {};
  const processMatch = (championIdMap, summonerId, match) => {
    const { participantId } = match.participantIdentities.find(
      (pi) => pi.player.summonerId === summonerId
    );
    const participant = match.participants.find(
      (p) => p.participantId === participantId
    );

    return {
      participant,
      creepScore:
        participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled,
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
      const gameIds = matches.slice(0, 1).map(({ gameId }) => gameId);
      const matchDtos = await Promise.all(
        gameIds.map((gameId) =>
          kayn.Match.get(gameId).region(req.params.platform.toLowerCase())
        )
      );
      // `processor` is a helper function to make the subsequent `map` cleaner.
      const processor = (match) => processMatch(championIdMap, id, match);
      const results = await Promise.all(matchDtos.map(processor));

      const cs = results.reduce((a, b) => ({
        creepScore: a.creepScore + b.creepScore,
      }));

      res.json({
        cs,
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode == 404) {
        res.status(404).json({
          error,
        });
      } else {
        res.status(400).json({
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
    res.json({
      sendResponse,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getTopNames = async (req, res) => {
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
    const sendResponse = response.data.slice(0, 3);
    const names = Object.keys(sendResponse).map((el) => {
      return sendResponse[el].summonerName;
    });
    res.json(names);
  } catch (error) {
    console.error(error);
  }
};
