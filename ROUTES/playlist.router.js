const express = require("express");
const playlistService = require("../BL/playlist.servics");
const router = express.Router();
const auth = require("../auth");

router.post("/create", async (req, res) => {
  try {
    const newPlaylist = await playlistService.creatPlaylist(req.body);
    res.send(newPlaylist);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/names", async (req, res) => {
  try {
    const listPlaylistsNames =
      await playlistService.readPlaylistsNamesByUser_id(req.body.user_Id);
    res.send(listPlaylistsNames);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
