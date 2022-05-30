'use strict';

const bcrypt = require('bcrypt');
const User = require("../models/User");

async function getAllUsers() {
    return await User.findAll();
}

async function getUserById(user_id) {

    let user = await User.findByPk(user_id);
    if(user==null){
        return {
            "success":false,
            "status_code":404,
            "message": `User with id ${user_id} not found.`
        }
    }
    else{
        return {
            "success":true,
            "user": user
        }
    }
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

async function deleteUserById(user_id) {

    let user_r = await getUserById(user_id);
    if(!user_r.success)return user_r;

    await User.destroy({
        where: {
            id: user_id
        }
    });

    return {
        "success": true
    }
}

function isEmailValid(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true
    }
    return false
}

async function isUsernameTaken(username) {
    const user = await getUserByUsername(username)
    if (user != null) {
        return true
    }
    return false
}

async function mParseJson(json_in, allow_admin=false){
    const required_fields = ["username", "password", "name", "surname", "email"]
    for(let f of required_fields){
        if(!json_in.hasOwnProperty(f)){
            return {
                "success":false,
                "status_code": 400,
                "message": `User data must have a string field '${f}'`
            }
        }
    }

    if(json_in.username.length < 3){
        return {
            "success":false,
            "status_code":400,
            "message": "Too short username."
        }
    }

    if(json_in.username.password < 4){
        return {
            "success":false,
            "status_code":400,
            "message": "Too short password."
        }
    }
    else if(await isUsernameTaken(json_in.username)){
        return {
            "success":false,
            "status_code":409,
            "message": `The username '${json_in.username}' is already taken.`
        }
    }
    

    if(!json_in.hasOwnProperty("admin")){
        json_in.admin = false;
    }

    else if(typeof json_in.admin != "boolean"){
        return {
            "success":false,
            "status_code":400,
            "message": "'admin' field must be a boolean."
        }
    }
    else if(!allow_admin && json_in.admin){
        return {
            "success":false,
            "status_code":403,
            "message": "You are not allowed to create admin account this way."
        }
    }

    if(!isEmailValid(json_in.email)){
        return {
            "success":false,
            "status_code": 400,
            "message": `Incorrect email address: ${json_in.email}`
        }
    }
    let user = User.build({
        "username":json_in.username,
        "admin":json_in.admin,
        "password": await bcrypt.hash(json_in.password, 10),
        "name":json_in.name,
        "surname":json_in.surname,
        "email":json_in.email});
    
    return {
        "success":true,
        "user":user
    }
}

async function createUser(json_in, allow_admin=false){
    let user_r = await mParseJson(json_in, allow_admin);
    if(user_r.success){
        user_r.user = await user_r.user.save();
    }

    return user_r;
}

async function updateUser(user_id, json_in, allow_admin=false){
    let user_r = await mParseJson(json_in);
    if(!user_r.success)return user_r;

    user_r.user.id = user_id;
    user_r.status_code = 201;

    let previous_user_r = await getUserById(user_id);
    if(previous_user_r.success){
        user_r.status_code = 200;

        let previous_user = previous_user_r.user;
        user_r.user.createdAt = previous_user.createdAt;
        
        await User.destroy({
            where: {
                id: user_id
            }
        });
    }

    user_r.user = await user_r.user.save();
    return user_r;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    deleteUserById,
    updateUser,
    createUser,
    getUserByUsernameAndPassword,

    isUsernameTaken,
    isEmailValid
}