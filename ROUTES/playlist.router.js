const express = require("express");
const playlistService = require("../BL/playlist.services");
const router = express.Router();
const auth = require("../auth");
const { checkData } = require("../errController");

router.post("/createplaylist", auth.validToken, async (req, res) => {
  checkData(req.body, ["playlistName"]);
  try {
    const newPlaylists = await playlistService.createPlaylist({
      userId: req.data._id,
      playlistName: req.body.playlistName,
    });
    res.status(200).send(newPlaylists);
  } catch (error) {
    console.log(res, error);
  }
});

router.delete("/deleteplaylist", auth.validToken, async (req, res) => {
  checkData(req.body, ["playlist_id"]);
  try {
    const newPlaylists = await playlistService.deletePlaylistBy_id({
      user_id: req.data._id,
      playlist_id: req.body.playlist_id,
    });
    res.status(200).send(newPlaylists);
  } catch (error) {
    console.log(res, error);
  }
});

router.get("/names", auth.validToken, async (req, res) => {
  try {
    const listPlaylistsNames =
      await playlistService.readPlaylistsNamesByUser_id(req.data._id);
    res.status(200).send(listPlaylistsNames);
  } catch (error) {
    console.log(res, error);
  }
});

router.put("/createSongInPlaylist", auth.validToken, async (req, res) => {
  checkData(req.body, [
    "youtubeId",
    "imgUrl",
    "songName",
    "channelName",
    "time",
    "playlist_id",
  ]);
  try {
    await playlistService.createNewSongInPlaylist(req.body);
    res.status(200);
  } catch (error) {
    console.log(res, error);
  }
});

router.put("/deleteSongFromPlaylist", auth.validToken, async (req, res) => {
  checkData(req.body, ["songId", "playlistId"]);
  try {
    const newArray = await playlistService.deleteSongFromPlaylist(req.body);
    res.status(200).send(newArray);
  } catch (error) {
    console.log(error);
  }
});

router.get("/readplaylist", auth.validToken, async (req, res) => {
  checkData(req.query, ["playlistId"]);
  try {
    const listPlaylistSongs = await playlistService.readPlaylistsByPlaylist_id(
      req.query.playlistId
    );
    res.status(200).send(listPlaylistSongs);
  } catch (error) {
    console.log(res, error);
  }
});

module.exports = router;
