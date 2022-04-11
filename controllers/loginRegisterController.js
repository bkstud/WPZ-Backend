const express = require('express')
const router = express.Router()
const userDao = require('../dao/userDao')
const jwtService = require('../services/jwtService')
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
                "admin": token_r.admin
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
            const my_account = user_r.user;
            res.status(200).json({
                "id": my_account.id,
                "username": my_account.username,
                "admin": my_account.admin,
                "name": my_account.name,
                "surname": my_account.surname,
                "email": my_account.email
            })
        }
        else{
            onClientError(res, user_r.status_code, user_r.message);
        }
    }).catch(err => onServerError(res, err));
});


module.exports = router;