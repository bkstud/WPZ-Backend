const userDao = require('../dao/userDao')
const bcrypt = require('bcrypt')

async function authenticate(username, password) {
    const user = await userDao.getUserByUsername(username)
    if(user == null) {
        return false
    }

    return await bcrypt.compare(password, user.password)
}

async function createUser(req, res, next) {
    if(await isUserInfoValid(req.body)) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        userDao.createUser(req.body)
        next()
    } else {
        res.sendStatus(400)
    }
}

async function isUserInfoValid(userData) {
    const {username, password, name, surname, email} = userData
    const user = await userDao.getUserByUsername(username)
    if(user) return false
    
    return isEmailValid(email) && 
           !isUsernameTaken(username) &&
           username.length > 2 &&
           password.length > 4 &&
           name.length > 2 &&
           surname.length > 2
}

function isUsernameTaken(username) {
    const user = userDao.getUserByUsername(username)
    if (user.length > 0) {
        return true
    }
    return false
}

function isEmailValid(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true
    }
    return false
}


module.exports = {
    createUser, authenticate
}