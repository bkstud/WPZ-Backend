const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'config/.env'})

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']

    if(typeof authHeader !== 'undefined') {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) {
                res.sendStatus(403)
            } else {
                next()
            }
        })
    } else {
        res.sendStatus(403)
    }
}

function generateToken(user) {
    const {name, surname} = user
    return jwt.sign({name, surname}, process.env.JWT_SECRET)
}

module.exports = {
    verifyToken, generateToken
}