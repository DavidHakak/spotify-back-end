// // לבצע התחברות ל-DB
// require('./db').connect()

// להגדיר את מבנה הטבלה והשדות
const mongoose = require("mongoose");

// ליצור סכמה - אכיפת המבנה
const userSchema = new mongoose.Schema({
  userFirstName: {
    type: String,
    required: true,
  },
  userLastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  imageData: { type: String },

  resetPass: { type: String },

  createDate: {
    type: Date,
    default: Date.now,
  },
  permission: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// ליצור את המודל נתונים (את הטבלה - אוסף)
const UserData = mongoose.model("User", userSchema);
// ליצא את המודל הנתונים
module.exports = UserData;
