const uploadsController = require("../DL/controller/uploads.controller");
const { errController } = require("../errController");

async function saveOrChangeTheProfile(user_id, data) {
  const ifExists = await uploadsController.read({ _id: user_id });

  if (!ifExists) throw errController.USER_NOT_FOUND;

  const newProfile = await uploadsController.updateOne(
    { _id: user_id },
    { imageData: data }
  );
  return newProfile.imageData;
}

async function deleteProfile() {}

module.exports = {
  saveOrChangeTheProfile,
  deleteProfile,
};
