'use strict';

const express = require('express');
const router = express.Router();
const userDao = require('../../dao/userDao');
const{onClientError, onServerError} = require("../errorHandler");

router.use(express.json());

// Nie trzeba, bo mamy zbiorczo w adminController

//router.use(jwtService.verifyTokenAdmin);

router.get('/', (req, res) => {
    userDao.getAllUsers()
        .then(users => res.json(users))
        .catch(err => onServerError(res, err))
})

router.get('/:id', (req, res) => {

    let user_id = req.params.id;
    userDao.getUserById(user_id)
        .then(
            user => {
                if(user==null){
                    onClientError(res, 404, `User with id ${user_id} not found.`);
                }
                else{
                    res.json(user);
                }
            })
        .catch(err => onServerError(res, err))
})

router.post('/', (req, res) => {
    userDao.createUser(req.body)
        .then(res.redirect('/api/users'))
        .catch(err => onServerError(res, err))
})

router.delete('/:id', (req, res) => {
    userDao.deleteUserById(req.params.id)
        .then(res.redirect('/api/users'))
        .catch(err => onServerError(res, err))
})

router.put('/', (req,res) => {
    userDao.updateUser(req.body)
        .then(res.redirect('/api/users'))
        .catch(err => onServerError(res, err))
})

module.exports = router