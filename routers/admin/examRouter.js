'use strict';
const express = require('express');
const router = express.Router();

const examDao = require("../../dao/examDao");
const{onClientError, onServerError} = require("../errorHandler");

router.use(express.json());

function mBooleanQueryParam(req, param_name){
    if(req.query.hasOwnProperty(param_name)){
        let param = req.query[param_name];
        if(param=="true"|| param=="1")return true;
    }
    return false;
}

router.get("/", (req, res)=>{
    let include_questions = mBooleanQueryParam(req, "include_questions");

    examDao.getAllExams(include_questions).then(exams=>{
        res.status(200).json(exams);
    }).catch(err => onServerError(res, err));
});

router.get("/:exam_id(\\d+)", (req, res)=>{
    
    let include_questions = mBooleanQueryParam(req, "include_questions");
    let exam_id = req.params.exam_id;

    examDao.getExam(exam_id, include_questions).then(exam_r=>{
        if(exam_r.success){
            res.status(200).json(exam_r.exam);
        }
        else{
            onClientError(res, exam_r.status_code, exam_r.message);
        }
    }).catch(err => onServerError(res, err));
});

router.post("/", (req, res)=>{
    examDao.createExam(req.body).then(exam_r=>{
        if(exam_r.success){
            res.status(200).json(exam_r.exam);
        }
        else{
            onClientError(res, exam_r.status_code, exam_r.message);
        }
    }).catch(err => onServerError(res, err));
});

router.put("/:exam_id(\\d+)", (req, res) =>{
    let exam_id = req.params.exam_id;
    examDao.updateExam(exam_id, req.body).then(exam_r=>{
        if(exam_r.success){
            res.status(200).json(exam_r.exam);
        }
        else{
            onClientError(res, exam_r.status_code, exam_r.message);
        }
    }).catch(err => onServerError(res, err));
});

router.delete("/:exam_id(\\d+)", (req, res)=>{
    let exam_id = req.params.exam_id;
    examDao.deleteExam(exam_id, true).then(exam_r=>{
        if(exam_r.success){
            res.sendStatus(204);
        }
        else{
            onClientError(res, exam_r.status_code, exam_r.message);
        }
    }).catch(err => onServerError(res, err));
});


module.exports = router;