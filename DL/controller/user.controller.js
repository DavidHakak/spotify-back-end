const userData = require('../model/user.model')

async function create(data) {
    return await userData.create(data)
}

async function read(filter) {
    return await userData.findOne(filter)
}

async function readUserForCheckPassword(filter) {
    return await userData.findOne(filter).select("+password");
}

async function update(id, newData) {
    return await userData.updateOne({ _id: id }, newData)
}

async function del(id) {
    return await update(id, { isActive: false })
}


module.exports = { create, read, update, del, readUserForCheckPassword }