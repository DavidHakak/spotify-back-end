require("dotenv").config();
require("./DL/db").connect();
const express = require("express");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const userRouter = require("./ROUTES/user.router");
const playlistRouter = require("./ROUTES/playlist.router");
const uploadsRouter = require("./ROUTES/uploads.router");

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/uploads", uploadsRouter);

app.listen(PORT, () => {
  console.log("Connection Port Success!!!, listening to port " + PORT);
});
