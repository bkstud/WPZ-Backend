'use strict';
const express = require('express');
const router = express.Router();
const questionDao = require("../dao/questionDao");
const{onClientError, onServerError} = require("./errorController");

const jwtService = require('../services/jwtService')

router.use(express.json());
router.use(jwtService.verifyToken);

router.get("/", (req, res)=>{
    questionDao.getAllQuestions().then(
        questions => res.status(200).json(questions)
    ).catch(err => onServerError(res, err));
});


router.get("/:question_id(\\d+)", (req, res)=>{
    let question_id = req.params.question_id;
    questionDao.getQuestionById(question_id).then(
        q => {
            if(q==null){
                onClientError(res, 404, `Question with id ${question_id} not found`);
            }
            else{
                res.status(200).json(q);
            }
        }
    ).catch(err => onServerError(res, err));
});


router.get("/hello", (req, res)=>{
    res.status(200).send(`Hello ${req.user_id}`);

});


module.exports = router;