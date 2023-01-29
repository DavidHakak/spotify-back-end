const playlistData = require("../model/playlist.model")



async function create(data) {
    return await playlistData.create(data);
}

async function read(filter, proj) {
    return await playlistData.find(filter, proj)  
}

async function readPlaylistByUser(filter) {
    return await playlistData
        .find(filter)
        .populate('userId', 'email permission')
        .populate('products.product');
}

async function updateOne(playlistId, newData) {
    return await playlistData.findOneAndUpdate(playlistId, newData, { new: true });
}

async function updateMany(playlistId, newData) {
    return await playlistData.updateMany(playlistId, newData);
}

async function del(playlistId) {
    return update(playlistId, { isActive: false });
}

module.exports = { del, updateOne, updateMany, read, create,readPlaylistByUser }