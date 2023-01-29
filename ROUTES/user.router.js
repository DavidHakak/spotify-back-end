const express = require("express");
const userService = require("../BL/user.service");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = await userService.register(req.body);
    res.send(newUser);
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userService.login(req.body);
    res.send(user);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
