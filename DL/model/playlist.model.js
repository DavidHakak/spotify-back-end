const mongoose = require("mongoose");
require("./songs.model");
require("./user.model");

const playlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  playlistName: {
    type: String,
  },

  songs_id: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Song",
    },
  ],

  createDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const PlaylistData = mongoose.model("Playlist", playlistSchema);

module.exports = PlaylistData;
