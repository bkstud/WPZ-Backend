const User = require("../models/User")

async function getAllUsers() {
    return await User.findAll()
}

async function getUserById(userId) {
    return await User.findByPk(userId)
}

async function getUserByUsername(username) {
    return await User.findOne({
        where: {username}
    })
}

async function getUserByUsernameAndPassword(username, password) {
    return await User.findOne({
        where: {username, password}
    })
}

async function deleteUserById(userId) {
    await User.destroy({
        where: {
            id: userId
        }
    })
}

async function updateUser(data) {
    await User.update({
        "username":data.username,
        "admin":data.admin,
        "password":data.password,
        "name":data.name,
        "surname":data.surname,
        "email":data.email,
    }, {where: {id}})
}

async function createUser(data) {
    await User.create({
        "username":data.username,
        "admin":data.admin,
        "password":data.password,
        "name":data.name,
        "surname":data.surname,
        "email":data.email,
    })
}

module.exports = {
    getAllUsers, getUserById, getUserByUsername, deleteUserById, updateUser, createUser, getUserByUsernameAndPassword
}