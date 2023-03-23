const songsData = require("../model/songs.model");

async function create(data) {
  const newSong = await songsData.create(data);
  return newSong;
}

async function read(filter, proj) {
  return await songsData.find(filter, proj);
}

module.exports = { create, read };
