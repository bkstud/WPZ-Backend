#!/usr/bin/node
'use strict';

const readline = require("readline");
const rl = readline.createInterface(
    process.stdin, process.stdout);

function ask(query) {
    return new Promise((resolve, reject) => {
        rl.question(query, (input) => resolve(input) );
    });
}

function askHidden(query){
    return new Promise((resolve, reject) => {
        rl.question(query, (input) => resolve(input) );
    });
}

const userDao = require("./dao/userDao");


async function readUsername(){
    while(true){
        let username = await ask("Username:");
        if(username.length < 3){
            console.log("Too short username. At least 3 characters required.");
        }
        else if(await userDao.isUsernameTaken(username)){
            console.log("This username is already taken.");
        }
        else{
            return username;
        }
    }
}


async function readPassword(){

    while(true){
        let pass1 = await askHidden("Password:",{
            hideEchoBack:true
        });
    
        let pass2 = await askHidden("Repeat password:",{
            hideEchoBack:true
        });

        if(pass1==pass2)return pass1;

        console.log("Passwords do not match, please re-enter.");
    }
}

async function readEmail(){
    while(true){
        let email = await ask("Email:");
        if(userDao.isEmailValid(email)){
            return email;
        }
        console.log("This is not email, please re-enter.")
    }
}

async function createSuperuser(){
    let username = await readUsername();
    let password = await readPassword();
    let name = await ask("First name:");
    let surname = await ask("Surname");
    let email = await readEmail();

    console.log(`Hello, ${username}`);
    console.log(`Your password: ${password}`);
}


createSuperuser().then(function(){
    console.log("Successfully created superuser");
    process.exit(0);
}).catch(function(err){
    console.log("Exception occured");
    console.log(err);
    process.exit(1);
});