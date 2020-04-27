const express = require('express');
const router = express.Router();
const addId = require('./../controllers/addId');

router.route('/add').post(addId.addUniqueId);
router.route('/add/user/summoner').post(addId.addSummonerName);
router.route('/delete/user/summoner').delete(addId.deleteSummonerName)
router.route('/add/friends').post(addId.addFriends);

module.exports = router;
