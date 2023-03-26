const playlistController = require("../DL/controller/playlist.controller");
const songsController = require("../DL/controller/songs.controller");
const { errController } = require("../errController");

async function createPlaylist(data) {
  await playlistController.create(data);
  const allPlaylistNames = await readPlaylistsNamesByUser_id(data.userId);
  return allPlaylistNames;
}

async function readPlaylistsNamesByUser_id(user_Id) {
  return await playlistController.read({ userId: user_Id }, "playlistName _id");
}

async function deletePlaylistBy_id(data) {
  await playlistController.del({ _id: data.playlist_id });
  return await readPlaylistsNamesByUser_id(data.user_id);
}

async function createNewSongInPlaylist(data) {
  let songExistInDb = await songsController.read({
    youtubeId: data.youtubeId,
  });

  let songs_id = "";

  if (songExistInDb.length === 0) {
    songExistInDb = await songsController.create(data);
    songs_id = songExistInDb._id;
  } else {
    songs_id = songExistInDb[0]._id;
  }

  const songExistInPlaylist = await playlistController.read({
    _id: data.playlist_id,
    songs_id: songs_id,
  });

  if (songExistInPlaylist.length !== 0) throw errController.SONG_IS_EXIST;

  await playlistController.updateOne(
    { _id: data.playlist_id },
    { $push: { songs_id: songs_id } }
  );
}

async function deleteSongFromPlaylist(data) {
  const playlistExist = await playlistController.read({ _id: data.playlistId });
  if (playlistExist.length === 0) throw errController.PLAYLIST_NOT_FOUND;

  const songExistInPlaylist = await playlistController.read({
    _id: data.playlistId,
    songs_id: {
      $in: data.songId,
    },
  });

  if (songExistInPlaylist.length === 0) throw errController.THE_SONG_NOT_FOUND;

  const test = await playlistController.updateOne(
    { _id: data.playlistId },
    {
      $pull: {
        songs_id: data.songId,
      },
    }
  );
  return await readPlaylistsByPlaylist_id(data.playlistId);
}

async function readPlaylistsByPlaylist_id(playlist_Id) {
  const playlistExist = await playlistController.read({ _id: playlist_Id });

  if (!playlistExist) throw errController.PLAYLIST_NOT_FOUND;

  const allSongs = await playlistController.readWithPopulate({
    _id: playlist_Id,
  });
  return allSongs.songs_id;
}

module.exports = {
  createPlaylist,
  readPlaylistsNamesByUser_id,
  deletePlaylistBy_id,
  createNewSongInPlaylist,
  deleteSongFromPlaylist,
  readPlaylistsByPlaylist_id,
};
