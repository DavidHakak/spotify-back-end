const mongoose = require("mongoose");

require("./user.model");

const playlistSchema = new mongoose.Schema({

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },

    playlistName: {
        type: String,
        required: true,
    },

    songs: [{
        type: Object,
    }],

    createDate: {
        type: Date,
        default: Date.now,
        immutable: true,
    },

    isActive: {
        type: Boolean,
        default: true
    }
})


const playlistData = mongoose.model("playlist", playlistSchema);


module.exports = playlistData;

