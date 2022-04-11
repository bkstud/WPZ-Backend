'use strict';

const express = require('express')
const router = express.Router()
const userDao = require('../dao/userDao')
const jwtService = require('../services/jwtService')
const userService = require('../services/userService')
require('dotenv').config({ path: 'config/.env'})

const{onClientError} = require("./errorHandler");


router.use(express.json())

router.post('/register', (req, res) => {

    userDao.createUser(req.body, false).then(user_r => {
        if(user_r.success){
            let created_user = user_r.user;
            res.status(201).json({
                "detail": "Created new user",
                "user_id": created_user.id,
                "username": created_user.username,
            });
        }
        else{
            onClientError(res, user_r.status_code, user_r.message);
        }
    }).catch(err => onServerError(res, err));
});



router.post("/login", (req, res) => {

    jwtService.login(req.body).then(token_r=>{
        if(token_r.success){
            res.status(200).json({
                "token": token_r.token,
                "user_data": token_r.user_data
            });
        }
        else{
            onClientError(res, token_r.status_code, token_r.message);
        }
    }).catch(err => onServerError(res, err));
});

router.get("/my_account", jwtService.verifyToken, (req, res)=>{
    userDao.getUserById(req.user_id).then(user_r=>{
        if(user_r.success){
            res.status(200).json(userService.getUserData(user_r.user));
        }
        else{
            onClientError(res, user_r.status_code, user_r.message);
        }
    }).catch(err => onServerError(res, err));
});


module.exports = router;