const User = require('./../models/User');
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
        DDRAGON: 1000 * 60 * 60 * 24 * 30, // cache for a month
        MATCH: 60 * 60 * 24 * 1 // 30 days
      },
      byMethod: {
        [METHOD_NAMES.SUMMONER.GET_BY_SUMMONER_NAME]: 1000 * 60 * 60 * 0.1, // ms
        [METHOD_NAMES.MATCH.GET_MATCHLIST]: 5000, // ms
        [METHOD_NAMES.MATCH.GET_MATCH_TIMELINE]: 10000 // ms
      }
    }
  }
});

exports.addSummonerName = async (req, res, next) => {
  try {
    await kayn.Summoner.by.name(req.body.summonerName).then(async user => {
      const addUser = await User.findOneAndUpdate(
        { uniqueid: req.body.uniqueid },
        {
          $push: {
            summonerNames: {
              summonerName: req.body.summonerName,
              region: req.body.region
            }
          }
        },
        { new: true }
      );
      res.json({ addUser });
    });
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(404).send('No User Found');
    } else {
      res.status(500).send({ error });
    }
  }
};

exports.deleteSummonerName = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { uniqueid: req.body.uniqueid },
      {
        $pull: {
          summonerNames: {
            _id: req.body._id
          }
        }
      },
      { new: true }
    );
    res.json({
      user
    });
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(404).send('No User Found');
      console.log(error);
    } else {
      res.status(500).send({ error });
      console.log(error);
    }
  }
};
exports.addUniqueId = async (req, res, next) => {
  console.log('Adding Unique ID');
  User.countDocuments({ uniqueid: req.body.uniqueid }, async function(
    err,
    count
  ) {
    if (count > 0) {
      const users = await User.findOne({ uniqueid: req.body.uniqueid });
      res.status(200).json({
        msg: 'User already has a UUID',
        users: users
      });
    } else {
      const newUser = await User.create({ uniqueid: req.body.uniqueid });
      res.status(201).json({
        msg: 'UUID Stored',
        users: newUser
      });
    }
  });
};

exports.addFriends = async (req, res) => {
  console.log('Adding Friends');
  try {
    const addUser = await User.findOneAndUpdate(
      { uniqueid: req.body.uniqueid },
      { $push: { friendNames: { $each: req.body.friendNames } } },
      { new: true }
    );

    res.json({ addUser });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

exports.addUniqueId = async (req, res, next) => {
  User.countDocuments({ uniqueid: req.body.uniqueid }, async function(
    err,
    count
  ) {
    if (count > 0) {
      const users = await User.findOne({ uniqueid: req.body.uniqueid });
      res.status(200).json({
        msg: 'User already has a UUID',
        users: users
      });
    } else {
      const newUser = await User.create({ uniqueid: req.body.uniqueid });
      res.status(201).json({
        msg: 'UUID Stored',
        users: newUser
      });
    }
  });
};
