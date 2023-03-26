const express = require("express");
const userService = require("../BL/user.services");
const router = express.Router();
const auth = require("../auth");
const { checkData } = require("../errController");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    checkData(req.body, [
      "firstName",
      "lastName",
      "email",
      "password",
      "phoneNumber",
    ]);
    const user = await userService.register(req.body);
    res.status(200).send(user);
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/login", async (req, res) => {
  checkData(req.body, ["email", "password"]);
  try {
    const user = await userService.login(req.body);
    res.status(200).send(user);
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/", auth.validToken, async (req, res) => {
  try {
    const user = await userService.getUser({ _id: req.data._id });
    const newUser = await { _id: user._id, playlist: user.playlist };
    res.status(200).send(newUser);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
