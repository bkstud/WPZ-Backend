'use strict';

const{onClientError} = require("../controllers/errorHandler");


const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'config/.env'})

/*
Dodałem basic auth jako drugą metodę autentyfikacji (fallback).
Głównie do testowania api
*/
const userService = require("./userService");
const userDao = require('../dao/userDao');

async function verifyBasicAuth(req){
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const strauth = Buffer.from(b64auth, 'base64').toString();

    if(strauth==null || strauth=="")return false;
    const splitIndex = strauth.indexOf(':');

    const login = strauth.substring(0, splitIndex);
    const password = strauth.substring(splitIndex + 1);


    if(await userService.authenticate(login ,password)){
        const user = await userDao.getUserByUsername(login);
        req.user_id = user.id;
        req.user_login = user.username;
        req.user_admin = user.admin;
        return true;
    }
    return false;
}


function mVerifyToken(req, res, next, admin_perm_required=false) {

    function n1(){
        if(admin_perm_required && !req.user_admin){
            onClientError(res, 403, "Only admin user can do this.");
        }
        else{
            next();
        }
    }
    
    
    const authHeader = req.headers['authorization']
    if(typeof authHeader !== 'undefined') {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) {

                verifyBasicAuth(req).then(a => {
                    if(a){
                        n1();
                    }
                    else{
                        onClientError(res, 403, "Incorrect authentication.");
                    }
                });

            } else {
                req.user_login = data.username;
                req.user_id = data.user_id;
                req.user_admin = data.admin;
                n1();
            }
        })
    } else {
        onClientError(res, 401, "Authentication required.");
    }
}


function verifyToken(req, res, next){
    mVerifyToken(req, res, next, false);
}

function verifyTokenAdmin(req, res, next){
    mVerifyToken(req, res, next, true);
}

function generateToken(user) {
    const {username, user_id, admin} = user
    return jwt.sign({username, user_id}, process.env.JWT_SECRET)
}

module.exports = {
    verifyToken,
    verifyTokenAdmin,
    generateToken
}