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
            user_r => {
                if(user_r.success){
                    res.status(200).json(user_r.user);
                }
                else{
                    onClientError(res, user_r.status_code, user_r.message);
                }
            }).catch(err => onServerError(res, err))
})

router.post('/', (req, res) => {
    userDao.createUser(req.body, true)
        .then(
            user_r => {
            if(user_r.success){
                res.status(201).json(user_r.user);
            }
            else{
                onClientError(res, user_r.status_code, user_r.message);
            }

        }).catch(err => onServerError(res, err))
})

router.delete('/:id', (req, res) => {
    userDao.deleteUserById(req.params.id)
        .then(user_r => {
            if(user_r.success){
                res.sendStatus(204);
            }
            else{
                onClientError(res, user_r.status_code, user_r.message);
            }
        }).catch(err => onServerError(res, err))
})

router.put('/:id', (req,res) => {
    userDao.updateUser(req.params.id, req.body, true).then(
            user_r => {
            if(user_r.success){
                res.status(201).json(user_r.user);
            }
            else{
                onClientError(res, user_r.status_code, user_r.message);
            }
        }).catch(err => onServerError(res, err))
})

module.exports = router