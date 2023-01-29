// // לבצע התחברות ל-DB
// require('./db').connect()

// להגדיר את מבנה הטבלה והשדות
const mongoose = require('mongoose');

// ליצור סכמה - אכיפת המבנה
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    playlist: [
        {
            id: {
                type: String,
                unique: true,
            }
        }],

    createDate: {
        type: Date,
        default: Date.now,
    },
    permission: {
        type: String,
        enum: ["admin", "editor", "viewer"],
        default: "viewer"
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

// ליצור את המודל נתונים (את הטבלה - אוסף)
const userData = mongoose.model('user', userSchema)
// ליצא את המודל הנתונים
module.exports = userData;