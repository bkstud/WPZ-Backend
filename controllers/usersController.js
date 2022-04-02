const express = require('express')
const router = express.Router()
const userDao = require('../dao/userDao')
const jwtService = require('../services/jwtService')

router.use(express.json())

router.get('/', jwtService.verifyToken, (req, res) => {
    userDao.getAllUsers()
        .then(users => res.json(users))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get('/:id', jwtService.verifyToken, (req, res) => {
    userDao.getUserById(req.params.id)
        .then(user => res.json(user))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.post('/', jwtService.verifyToken, (req, res) => {
    userDao.createUser(req.body)
        .then(res.redirect('/api/users'))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.delete('/:id', jwtService.verifyToken, (req, res) => {
    userDao.deleteUserById(req.params.id)
        .then(res.redirect('/api/users'))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.put('/', jwtService.verifyToken, (req,res) => {
    userDao.updateUser(req.body)
        .then(res.redirect('/api/users'))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

module.exports = router