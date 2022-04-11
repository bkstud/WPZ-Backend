'use strict';

const userDao = require('../dao/userDao');
const bcrypt = require('bcrypt');

async function authenticate(username, password) {
    const user = await userDao.getUserByUsername(username)
    if(user == null) {
        return false
    }

    return await bcrypt.compare(password, user.password)
}

async function authenticateAndGetUser(username, password) {
    const user = await userDao.getUserByUsername(username);
    if(user == null) {
        return null;
    }

    let success = await bcrypt.compare(password, user.password);
    return success ? user : null;
}

function getUserData(user_in){
    return {
        "id":user_in.id,
        "username": user_in.username,
        "admin": user_in.admin,
        "name": user_in.name,
        "surname": user_in.surname,
        "email": user_in.email
    }
}

module.exports = {
    authenticate, authenticateAndGetUser, getUserData
}