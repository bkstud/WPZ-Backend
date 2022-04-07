'use strict';

const express = require('express');
const router = express.Router();
const approachDao = require("../dao/approachDao.js");
//const onError = require("./errorController");
const{onClientError, onServerError} = require("./errorController");
const jwtService = require('../services/jwtService');

router.use(express.json());
router.use(jwtService.verifyToken);

router.get("/exam", (req, res)=>{
    approachDao.getAllExamsWithApproachData(req.user_id).then(
        exams => res.status(200).json(exams)
    ).catch(err => onServerError(res, err));

});



function examNotFound(res, exam_id){
    onClientError(res, 404, `Exam with id:${exam_id} not found`);
}

router.get("/exam/:exam_id(\\d+)", (req, res)=>{
    let exam_id = req.params.exam_id;

    approachDao.getExamWithApproachData(exam_id, req.user_id).then(
        exam => {
            if(exam==null){
                examNotFound(res, exam_id);
            }
            else{
                res.status(200).json(exam);
            }
        }
    ).catch(err => onServerError(res, err));
});

router.post("/exam/:exam_id(\\d+)/start", (req, res)=>{
    let exam_id = req.params.exam_id;
    approachDao.startExam(exam_id, req.user_id).then(function(result){
        if(result.success){
            res.status(200).json({
                "detail":"Started the exam",
                "exam_data": result.exam,
                "questions": result.questions
            })
        }
        else if(result.cause==0){
            examNotFound(res, exam_id);
        }
        else if(result.cause==1){
            onClientError(res, 409, "You have exhausted the number of approach to this exam.");
        }
        else if(result.cause==2){
            onClientError(res, 425, "Too early, you cannot start this exam yet.");
        }
        else if(result.cause==3){
            onClientError(res, 410, "Too late, the time to start this exam is over.");
        }
        else{
            onClientError(res, 400, "You cannot start this exam for unknown reason.");
        }
    }).catch(err => onServerError(res, err));
});


module.exports = router;
