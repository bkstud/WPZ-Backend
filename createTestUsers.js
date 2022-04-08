#!/usr/bin/node
'use strict';

const bcrypt = require('bcrypt');
const userDao = require('./dao/userDao');

async function createTestUser(){
    userDao.createUser({
        "username": "janusz_nosacz",
        "password": await bcrypt.hash("janusz123", 10),
        "surname": "Nosacz",
        "name": "Janusz",
        "email": "janusz.nosacz@example.com",
        "admin": false,
    });

    userDao.createUser({
        "username": "czesiek_programista",
        "password": await bcrypt.hash("czesiek987", 10),
        "surname": "Programista",
        "name": "Czesław",
        "email": "czesio.programista@example.com",
        "admin": true
    });
}

createTestUser();
