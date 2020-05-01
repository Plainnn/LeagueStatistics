const express = require('express');
const router = express.Router();
const leaguesController = require('./../controllers/leaguesController');

router
  .route('/leagues/:region/:league/:rank/:page')
  .get(leaguesController.getLeagues);

router
  .route('/leagues/gettopnames/:region/:league/:rank/:page')
  .get(leaguesController.getTopNames);

router.route('/getcs/:platform/:name').get(leaguesController.getCs);

router.route('/match/:platform/:name').get(leaguesController.matchTimeline);

module.exports = router;
