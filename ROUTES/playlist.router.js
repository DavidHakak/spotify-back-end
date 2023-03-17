const express = require("express");
const playlistService = require("../BL/playlist.services");
const router = express.Router();
const auth = require("../auth");

router.post("/createplaylist", auth.validToken, async (req, res) => {
  try {
    const newPlaylists = await playlistService.createPlaylist({
      userId: req.data._id,
      playlistName: req.body.playlistName,
    });
    res.status(200).send(newPlaylists);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/deleteplaylist", auth.validToken, async (req, res) => {
  try {
    const newPlaylists = await playlistService.deletePlaylistBy_id(req.body);
    res.status(200).send(newPlaylists);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/readplaylist", auth.validToken, async (req, res) => {
  try {
    const data = {
      playlistId: req.query.playlistid,
      userId: req.data._id,
    };
    const listPlaylistSongs = await playlistService.readPlaylistsByPlaylist_id(
      data.playlistId
    );
    res.status(200).send(listPlaylistSongs);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/names", auth.validToken, async (req, res) => {
  try {
    const listPlaylistsNames =
      await playlistService.readPlaylistsNamesByUser_id(req.data._id);
    res.send(listPlaylistsNames);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/createSongInPlaylist", auth.validToken, async (req, res) => {
  try {
    console.log(req.body);
    await playlistService.createNewSongInPlaylist(req.body);
    res.status(200);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/deleteSongFromPlaylist", auth.validToken, async (req, res) => {
  try {
    const newArray = await playlistService.deleteSongFromPlaylist(req.body);
    res.status(200).send(newArray);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
