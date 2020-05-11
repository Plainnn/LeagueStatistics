const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uniqueid: {
    type: String,
    required: true,
    trim: true,
  },
  summonerNames: [
    {
      summonerName: {
        type: String,
        trim: true,
      },
      region: {
        type: String,
        trim: true,
        default: 'euw',
      },
    },
  ],
  friendNames: [
    {
      userName: String,
      region: String,
    },
  ],
});

module.exports = User = mongoose.model('User', userSchema);
