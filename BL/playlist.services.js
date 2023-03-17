require("dotenv").config();
require("../DL/db").connect();
const playlistController = require("../DL/controller/playlist.controller");

async function createPlaylist(data) {
  try {
    await playlistController.create(data);
    return await readPlaylistsNamesByUser_id(data.userId);
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

async function deletePlaylistBy_id(data) {
  try {
    await playlistController.del({ _id: data.playlist_Id });
    return await readPlaylistsNamesByUser_id(data.userId);
  } catch (e) {
    console.log(e.message);
  }
}

async function readPlaylistsByPlaylist_id(playlist_Id) {
  try {
    const songs = await playlistController.read({ _id: playlist_Id }, "songs");
    return await songs[0]["songs"];
  } catch (e) {
    console.log(e.message);
  }
}

async function createNewSongInPlaylist(data) {
  try {
    await playlistController.updateOne(
      { _id: data.playlist_id },
      { $push: { songs: data.songInfo } }
    );
    return await readPlaylistsNamesByUser_id(data.userId);
  } catch (e) {
    console.log(e.message);
  }
}

async function deleteSongFromPlaylist(data) {
  try {
    await playlistController.updateOne(
      { _id: data.playlistId },
      {
        $pull: {
          songs: { id: data.songId },
        },
      }
    );
    return await readPlaylistsByPlaylist_id(data.playlistId);
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  createPlaylist,
  readPlaylistsNamesByUser_id,
  deletePlaylistBy_id,
  createNewSongInPlaylist,
  deleteSongFromPlaylist,
  readPlaylistsByPlaylist_id,
};
