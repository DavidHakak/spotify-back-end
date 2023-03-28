const express = require("express");
const uploadsService = require("../BL/uploads.services");
const router = express.Router();
const auth = require("../auth");
const { upload } = require("../BL/helpers/multer/storage");
const fs = require("fs");

router.post(
  "/createAndUpdatePhoto",
  auth.validToken,
  upload.single("imageFile"),
  async (req, res) => {
    try {
      const imageData = req.file.buffer;
      const base64Data = imageData.toString("base64");

      const photoData = await uploadsService.saveOrChangeTheProfile(
        req.data._id,
        base64Data
      );

      res.status(200).send(photoData);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
