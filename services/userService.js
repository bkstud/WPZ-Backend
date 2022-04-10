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

module.exports = {
    authenticate, authenticateAndGetUser
}