const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'config/.env'})

/*
Dodałem basic auth jako drugą metodę autentyfikacji.
Głównie do testowania api
*/
const userService = require("./userService");
const userDao = require('../dao/userDao');

async function verifyBasicAuth(req){
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const strauth = Buffer.from(b64auth, 'base64').toString();

    if(strauth==null || strauth=="")return null;
    const splitIndex = strauth.indexOf(':');

    const login = strauth.substring(0, splitIndex);
    const password = strauth.substring(splitIndex + 1);

    console.log(login);
    console.log(password);

    if(await userService.authenticate(login ,password)){
        const user = await userDao.getUserByUsername(login);
        req.user_id = user.id;
        req.user_login = user.login;
        req.user_admin = user.admin;
        return true;
    }
    return false;
}


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if(typeof authHeader !== 'undefined') {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) {

                verifyBasicAuth(req).then(a => {
                    if(a){
                        next();
                    }
                    else{
                        res.sendStatus(403);
                    }
                });

            } else {
                req.user_id = data.user_id;
                req.user_login = data.user_login;
                req.user_admin = data.admin;
                next()
            }
        })
    } else {
        res.sendStatus(401);
    }
}

function generateToken(user) {
    const {username, user_id, admin} = user
    return jwt.sign({username, user_id}, process.env.JWT_SECRET)
}

module.exports = {
    verifyToken, generateToken
}