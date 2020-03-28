const express = require('express');
const router = express.Router();
const getWinLossController = require('./../controllers/getWinLossController');
const userRankController = require('./../controllers/userRankController');
const getPercentController = require('./../controllers/getPercentController');

router.route('/:platform/:name').get(getWinLossController.getWinLoss);
router.route('/winloss/:platform/:name').get(getPercentController.getPercent);
router.route('/getrank/:platform/:name').get(userRankController.getRank);

module.exports = router;
