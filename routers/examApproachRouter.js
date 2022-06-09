'use strict';

const express = require('express');
const router = express.Router();
const examApproachDao = require("../dao/examApproachDao");
const scoreDao = require("../dao/scoreDao");
const answerDao = require("../dao/answerDao");

//const onError = require("./errorController");
const{onClientError, onServerError} = require("./errorHandler");

const jwtService = require('../services/jwtService');
//router.use(express.json());
router.use(jwtService.verifyToken);

router.get("/", (req, res)=>{
    examApproachDao.getAllExamsWithApproachData(req.user_id).then(
        exams => res.status(200).json(exams)
    ).catch(err => onServerError(res, err));

});


router.get("/:exam_id(\\d+)", (req, res)=>{
    let exam_id = req.params.exam_id;

    examApproachDao.getExamWithApproachData(exam_id, req.user_id).then(
        exam_r => {
            if(exam_r.success){
                res.status(200).json(exam_r.exam)
            }
            else{
                onClientError(res, exam_r.status_code, exam_r.message)
            }
        }
    ).catch(err => onServerError(res, err));
});

router.post("/:exam_id(\\d+)/start", (req, res)=>{
    let exam_id = req.params.exam_id;
    examApproachDao.startExam(exam_id, req.user_id).then(function(approach_r){
        if(approach_r.success){
            res.status(200).json({
                "detail":"Started the exam",
                "exam_data": approach_r.exam,
                "questions": approach_r.questions,
                "approach_id": approach_r.approach_id
            })
        }
        else{
            onClientError(res, approach_r.status_code, approach_r.message);
        }
        
    }).catch(err => onServerError(res, err));
});

router.post("/approaches/:approach_id(\\d+)/end", (req, res)=>{
    let approach_id = req.params.approach_id;
    examApproachDao.finishApproach(approach_id, req.user_id).then( r => {
        if(r.success){
            res.status(200).json({
                "detail": r.message
            });
        }
        else{
            onClientError(res, r.status_code, r.message);
        }
    });
});

router.get("/approaches/:approach_id(\\d+)/questions", (req, res)=>{
    let approach_id = req.params.approach_id;
    answerDao.getQuestionsForApproachWithAnswers(approach_id, req.user_id).then(function(result){
        if(result.success){
            res.status(200).json(result.questions);
        }
        else{
            onClientError(res, result.status_code, result.message);
        }
    }).catch(err => onServerError(res, err));
});

router.get("/approaches/:approach_id(\\d+)/score", (req,res)=>{

    let approach_id = req.params.approach_id;
    scoreDao.getScoreForApproach(approach_id, req.user_id, req.user_admin, false).then(s_r => {
        if(s_r.success){
            res.status(200).json({
                "exam_id": s_r.exam_id,
                "max_points": s_r.max_points,
                "score": s_r.score,
            })
        }
        else{
            onClientError(res, s_r.status_code, s_r.message);
        }

    }).catch(err => onServerError(res, err));
});

router.get("/approaches/:approach_id(\\d+)/detailed_score", (req,res)=>{
    let approach_id = req.params.approach_id;
    scoreDao.getScoreForApproach(approach_id, req.user_id, req.user_admin, true).then(s_r => {
        if(s_r.success){
            res.status(200).json({
                "exam_id": s_r.exam_id,
                "max_points": s_r.max_points,
                "score": s_r.score,
                "detailed_score": s_r.detailed_score
            })
        }
        else{
            onClientError(res, s_r.status_code, s_r.message);
        }
    }).catch(err => onServerError(res, err));
});

module.exports = router;
