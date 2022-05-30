'use strict';
const express = require('express');
const router = express.Router();
const questionDao = require("../../dao/questionDao");
const{onClientError, onServerError} = require("../errorHandler");


router.use(express.json());

// Nie trzeba, bo mamy zbiorczo w adminController

//router.use(jwtService.verifyTokenAdmin);

router.get("/", (req, res)=>{
    questionDao.getAllQuestions().then(
        questions => res.status(200).json(questions)
    ).catch(err => onServerError(res, err));
});


router.get("/:question_id(\\d+)", (req, res)=>{
    let question_id = req.params.question_id;
    questionDao.getQuestion(question_id).then(
        q_r => {
            if(q_r.success){
                res.status(200).json(q_r.question);
            }
            else{
                onClientError(res, q_r.status_code, q_r.message);
            }
        }
    ).catch(err => onServerError(res, err));
});


router.post("/", (req, res)=>{
    questionDao.createQuestion(req.body).then(
        q_r => {
            if(q_r.success){
                res.status(201).json(q_r.question);
            }
            else{
                onClientError(res, q_r.status_code, q_r.message);
            }
        }
    ).catch(err => onServerError(res, err));
});

router.put("/:question_id(\\d+)", (req, res)=>{
    let question_id = req.params.question_id;
    questionDao.updateQuestion(question_id, req.body).then(
        q_r => {
            if(q_r.success){
                res.status(200).json(q_r.question);
            }
            else{
                onClientError(res, q_r.status_code, q_r.message);
            }
        }

    ).catch(err => onServerError(res, err));
})

module.exports = router;