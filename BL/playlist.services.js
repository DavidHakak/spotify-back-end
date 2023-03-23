const playlistController = require("../DL/controller/playlist.controller");
const songsController = require("../DL/controller/songs.controller");

async function createPlaylist(data) {
  try {
    await playlistController.create(data);
    const allPlaylistNames = await readPlaylistsNamesByUser_id(data.userId);
    return allPlaylistNames;
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
    data.playlist_id !== "" &&
      (await playlistController.del({ _id: data.playlist_id }));
    return await readPlaylistsNamesByUser_id(data.user_id);
  } catch (e) {
    console.log(e.message);
  }
}

async function createNewSongInPlaylist(data) {
  try {
    let songExistInDb = await songsController.read({
      youtubeId: data.youtubeId,
    });
    let song_id = "";

    if (songExistInDb.length === 0) {
      songExistInDb = await songsController.create(data);
      song_id = songExistInDb._id;
    } else {
      song_id = songExistInDb[0]._id;
    }

    const songExistInPlaylist = await playlistController.read({
      _id: data.playlist_id,
      songsId: song_id,
    });

    if (songExistInPlaylist.length !== 0) throw "song Exist In Playlist";

    await playlistController.updateOne(
      { _id: data.playlist_id },
      { $push: { songsId: song_id } }
    );
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

async function readPlaylistsByPlaylist_id(playlist_Id) {
  try {
    const allSongs = await playlistController.readWithPopulate({
      _id: playlist_Id,
    });
    return allSongs.songsId;
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
