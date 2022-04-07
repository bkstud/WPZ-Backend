#!/usr/bin/node
'use strict';

const bcrypt = require('bcrypt');
const userDao = require('./dao/userDao');

async function createTestUser(){
    const password = await bcrypt.hash("janusz123", 10);
    console.log(password);

    userDao.createUser({
        "username": "janusz_programista",
        "password": password,
        "surname": "Nosacz",
        "name": "Janusz",
        "email": "janusz.nosacz@example.com"
    });
}

createTestUser();
