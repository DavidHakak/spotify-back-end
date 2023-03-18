const userData = require("../model/user.model");

async function create(data) {
  return await userData.create({
    userFirstName: data.firstName,
    userLastName: data.lastName,
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
  });
}

async function read(filter, select) {
  return await userData.findOne(filter).select(select);
}

async function update(id, newData) {
  return await userData.updateOne({ _id: id }, newData);
}

async function del(id) {
  return await update(id, { isActive: false });
}

module.exports = { create, read, update, del };
