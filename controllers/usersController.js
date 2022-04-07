const express = require('express')
const router = express.Router()
const userDao = require('../dao/userDao')
const jwtService = require('../services/jwtService')
const{onClientError, onServerError} = require("./errorController");


router.use(express.json())

router.get('/', jwtService.verifyToken, (req, res) => {
    userDao.getAllUsers()
        .then(users => res.json(users))
        .catch(err => onServerError(res, err))
})

router.get('/:id', jwtService.verifyToken, (req, res) => {

    let user_id = req.params.id;
    userDao.getUserById(user_id)
        .then(
            user => {
                if(user==null){
                    onClientError(res, 404, `User with id ${user_id} not found`);
                }
                else{
                    res.json(user);
                }
            })
        .catch(err => onServerError(res, err))
})

router.post('/', jwtService.verifyToken, (req, res) => {
    userDao.createUser(req.body)
        .then(res.redirect('/api/users'))
        .catch(err => onServerError(res, err))
})

router.delete('/:id', jwtService.verifyToken, (req, res) => {
    userDao.deleteUserById(req.params.id)
        .then(res.redirect('/api/users'))
        .catch(err => onServerError(res, err))
})

router.put('/', jwtService.verifyToken, (req,res) => {
    userDao.updateUser(req.body)
        .then(res.redirect('/api/users'))
        .catch(err => onServerError(res, err))
})

module.exports = router