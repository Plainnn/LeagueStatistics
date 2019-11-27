const express = require('express');
const router = express.Router();
const getWinLossController = require('./../controllers/getWinLossController');
const userRankController = require('./../controllers/userRankController');

router.route('/:platform/:name').get(getWinLossController.getWinLoss);
router.route('/getrank/:platform/:name').get(userRankController.getRank);

module.exports = router;
