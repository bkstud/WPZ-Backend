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
    let {id, username, password, name, surname, email} = data
    await User.update({
        username,
        password,
        name,
        surname, 
        email
    }, {where: {id}})
}

async function createUser(data) {
    let {username, password, name, surname, email} = data
    console.log(data)
    await User.create({
        username,
        password,
        name,
        surname,
        email
    })
}

module.exports = {
    getAllUsers, getUserById, getUserByUsername, deleteUserById, updateUser, createUser, getUserByUsernameAndPassword
}