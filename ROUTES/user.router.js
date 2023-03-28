const express = require("express");
const userService = require("../BL/user.services");
const router = express.Router();
const auth = require("../auth");
const { checkData } = require("../errController");

router.post("/register", async (req, res) => {
  try {
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
    res.status(200).send(user);
  } catch (error) {
    console.log("error", error);
  }
});

router.delete("/delete", auth.validToken, async (req, res) => {
  try {
    const ifExists = await userService.deleteUser({ _id: req.data._id });
    res.status(200).send(ifExists);
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/forgot", async (req, res) => {
  try {
    const response = await userService.getUserForResetPass(req.query.email);
    res.status(200).send(response);
  } catch (err) {
    console.log(res, err);
  }
});

router.post("/changepassword", async (req, res) => {
  try {
    const updatedUser = await userService.changePasswordByToken(req.body);
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(res, err);
  }
});

module.exports = router;
