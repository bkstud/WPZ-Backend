const express = require('express')
const router = express.Router()
const userService = require('../services/userService')
const userDao = require('../dao/userDao')
const jwtService = require('../services/jwtService')
require('dotenv').config({ path: 'config/.env'})

router.use(express.json())

router.post('/register', userService.createUser, (req, res) => {
    res.sendStatus(200)
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    if(await userService.authenticate(username, password)) {
        const user = await userDao.getUserByUsername(username)
        const token = jwtService.generateToken(user)
        res.json({token})
    } else {
        res.sendStatus(403)
    }
})

module.exports = router