const playlistController = require("../DL/controller/playlist.controller");

require("dotenv").config();
require("../DL/db").connect();

async function creatPlaylist(data) {
  try {
    return await playlistController.create(data);
  } catch (e) {
    console.log(e.message);
  }
}

async function readPlaylistsNamesByUser_id(user_Id) {
  try {
    return await playlistController.read(
      { userId: user_Id },
      "playlistName _id"
    );
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { creatPlaylist, readPlaylistsNamesByUser_id };
