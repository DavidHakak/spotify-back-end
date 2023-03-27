const { deleteOne } = require("../model/user.model");
const userData = require("../model/user.model");

async function create(data) {
  return await userData.create(data);
}

async function read(filter, select) {
  return await userData.findOne(filter).select(select);
}

async function update(id, newData) {
  return await userData.updateOne({ _id: id }, newData);
}

async function del(filter) {
  return await userData.deleteOne(filter);
}

module.exports = { create, read, update, del };
