const mongoose = require("mongoose");

const songsSchema = new mongoose.Schema({
  youtubeId: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },

  songName: {
    type: String,
  },

  channelName: {
    type: String,
  },

  imgUrl: {
    type: String,
    required: true,
  },

  time: {
    type: String,
  },

  createDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const SongData = mongoose.model("Song", songsSchema);

module.exports = SongData;
