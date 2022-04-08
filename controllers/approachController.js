'use strict';

const express = require('express');
const router = express.Router();
const approachDao = require("../dao/approachDao.js");
//const onError = require("./errorController");
const{onClientError, onServerError} = require("./errorHandler");
const jwtService = require('../services/jwtService');

//router.use(express.json());
router.use(jwtService.verifyToken);

router.get("/exam", (req, res)=>{
    approachDao.getAllExamsWithApproachData(req.user_id).then(
        exams => res.status(200).json(exams)
    ).catch(err => onServerError(res, err));

});


router.get("/exam/:exam_id(\\d+)", (req, res)=>{
    let exam_id = req.params.exam_id;

    approachDao.getExamWithApproachData(exam_id, req.user_id).then(
        exam_r => {
            if(exam_r.success){
                res.status(200).json(exam_r.exam)
            }
            else{
                onClientError(res, exam_r.error_code, exam_r.message)
            }
        }
    ).catch(err => onServerError(res, err));
});

router.post("/exam/:exam_id(\\d+)/start", (req, res)=>{
    let exam_id = req.params.exam_id;
    approachDao.startExam(exam_id, req.user_id).then(function(approach_r){
        if(approach_r.success){
            res.status(200).json({
                "detail":"Started the exam",
                "exam_data": approach_r.exam,
                "questions": approach_r.questions,
                "approach_id": approach_r.approach_id
            })
        }
        else{
            onClientError(res, approach_r.error_code, approach_r.message);
        }
        
    }).catch(err => onServerError(res, err));
});

router.post("/:approach_id(\\d+)/end", (req, res)=>{
    let approach_id = req.params.approach_id;
    approachDao.finishApproach(approach_id, req.user_id).then( r => {
        if(r.success){
            res.status(200).json({
                "detail": r.message
            });
        }
        else{
            onClientError(res, r.error_code, r.message);
        }
    });
});

router.get("/:approach_id(\\d+)/questions", (req, res)=>{
    let approach_id = req.params.approach_id;
    approachDao.getQuestionsForApproach(approach_id, req.user_id).then(function(result){
        if(result.success){
            res.status(200).json(result.questions);
        }
        else{
            onClientError(res, result.error_code, result.message);
        }
    }).catch(err => onServerError(res, err));
});

module.exports = router;
