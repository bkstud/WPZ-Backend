#!/usr/bin/node
'use strict';

const userDao = require('./dao/userDao');

async function createTestUser(){
    let u1 = await userDao.createUser({
        "username": "janusz_nosacz",
        "password": "janusz123",
        "surname": "Nosacz",
        "name": "Janusz",
        "email": "janusz.nosacz@example.com",
        "admin": false,
    }, true);

    

    let u2 = await userDao.createUser({
        "username": "czesiek_programista",
        "password": "czesiek987",
        "surname": "Programista",
        "name": "Czesław",
        "email": "czesio.programista@example.com",
        "admin": true
    }, true);

    //console.log(u1);
    //console.log(u2);
}

createTestUser();
