#!/usr/bin/node
'use strict';

const userDao = require("./dao/userDao");

const readline = require("readline");
const rl = readline.createInterface(
    process.stdin, process.stdout);

rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted)
        rl.output.write("\x1B[2K\x1B[200D"+ rl.query+ "*".repeat(rl.line.length));
    else
        rl.output.write(stringToWrite);
};

function ask(query) {
    rl.stdoutMuted = false;
    rl.query = query;
    return new Promise((resolve, reject) => {
        rl.question(query, (input) => resolve(input) );
    });
}

function askHidden(query){
    rl.stdoutMuted = true;
    rl.query = query;
    return new Promise((resolve, reject) => {
        rl.question(query, (input) =>{
            console.log("");
            resolve(input)
        });
    });
}

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
    let surname = await ask("Surname:");
    let email = await readEmail();
    let admin = true;

    let result = await userDao.createUser({username, password, name, surname, email, admin}, true);
    if(!result.success){
        throw result.message;
    }
}

console.log("Creating an administrator account.")

createSuperuser().then(function(){
    process.exit(0);
}).catch(function(err){
    console.error("Exception occured");
    console.error(err);
    process.exit(1);
});