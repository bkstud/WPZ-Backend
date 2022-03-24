const express = require('express')
const router = express.Router()
const UserDao = require('../dao/UserDao')

userDao = new UserDao()

router.use(express.json())

router.get('/', (req, res) => {
    userDao.getAllUsers()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    userDao.createUser(req.body)
        .then(res.redirect('/users'))
        .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
    userDao.deleteUserById(req.body.id)
        .then(res.redirect('/users'))
        .catch(err => console.log(err))
})

router.put('/', (req,res) => {
    userDao.updateUser(req.body)
        .then(res.redirect('/users'))
        .catch(err => console.log(err))
})

module.exports = router