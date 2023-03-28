const playlistData = require("../model/playlist.model");

async function create(data) {
  return await playlistData.create(data);
}

async function read(filter, proj) {
  return await playlistData.find(filter, proj);
}

async function readWithPopulate(filter) {
  const song = await playlistData.find(filter).populate("songs_id");
  return song[0];
}

async function updateOne(playlistId, newData) {
  return await playlistData.findOneAndUpdate(playlistId, newData);
}

async function del(filter) {
  return await playlistData.findOneAndDelete(filter);
}

module.exports = {
  del,
  updateOne,
  read,
  readWithPopulate,
  create,
};
