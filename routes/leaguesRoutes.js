const express = require('express');
const router = express.Router();
const leaguesController = require('./../controllers/leaguesController');

router
  .route('/leagues/:region/:league/:rank/:page')
  .get(leaguesController.getLeagues);

module.exports = router;
