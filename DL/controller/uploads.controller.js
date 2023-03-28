const userData = require("../model/user.model");

async function create(data) {
  return await userData.create(data);
}

async function read(filter, proj) {
  return await userData.find(filter, proj);
}

async function updateOne(filter, newData) {
  return await userData.findOneAndUpdate(filter, newData);
}

async function del(filter) {
  return await userData.findOneAndDelete(filter);
}

module.exports = {
  del,
  updateOne,
  read,
  create,
};
