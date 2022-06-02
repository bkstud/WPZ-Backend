'use strict';

const examDao = require("./examDao.js");
const questionDao = require("./questionDao");

const ExamApproach = require("../models/ExamApproach");

async function findAllApproachesInProgress(user_id){

    let approaches = await ExamApproach.findAll({
        where:{
            "user_id": user_id,
            "finished": false,
        }
    });

    return approaches;
}

async function mCollectExamData(exam_in, user_id){
    if(exam_in==null)return null;

    let exam = {
        "id":exam_in.id,
        "title":exam_in.title,
        "max_approaches":exam_in.max_approaches,
        "start_time":exam_in.start_time,
        "end_time":exam_in.end_time
    }

    const approaches = await ExamApproach.findAll(
        {where:{"user_id":user_id, "exam_id":exam.id}});

    if(exam.max_approaches >= 0){
        let approaches_remaining = exam.max_approaches - approaches.length;
        if(approaches_remaining<0)approaches_remaining=0;

        exam.approaches_remaining = approaches_remaining;
        exam.can_start = approaches_remaining > 0;
    }
    else{
        exam.max_approaches = -1;
        exam.approaches_remaining = -1;
        exam.can_start = true;
    }

    if(exam.can_start){
        if(exam.start_time!=null && Date.now() < exam.start_time){
            exam.can_start = false;
        }
        else if(exam.end_time!=null && Date.now() > exam.end_time){
            exam.can_start = false;
        }
    }

    exam.approaches_in_progress = approaches.filter(a=>!a.finished).map(a=>a.id);
    exam.finished_approaches = approaches.filter(a=>a.finished).map(a=>a.id);

    exam.number_of_questions = await questionDao.countQuestionsByExamId(exam.id);

    return exam;
}

async function getAllExamsWithApproachData(user_id){
    let exams = await examDao.getAllExams();
    return await Promise.all(exams.map(async function(exam){
        return await mCollectExamData(exam, user_id);
    }));
}

async function getExamWithApproachData(exam_id, user_id){
    let exam_r = await examDao.getExam(exam_id);
    if(exam_r.success){
        exam_r.exam = await mCollectExamData(exam_r.exam, user_id);
    }

    return exam_r;
}


async function getApproach(approach_id, user_id, finished=false, user_admin=false){
    let approach = await ExamApproach.findByPk(approach_id);
    
    if(approach==null){
        return {
            "success": false,
            "status_code": 404,
            "message": `Approach with id: ${approach} not found.`
        }
    }
    else if(!user_admin)
    {
        if(approach.user_id!=user_id){
            return {
                "success": false,
                "status_code": 403,
                "message": `This approach does not belong to you.`
            }
        }
        else if(!finished && approach.finished){
            return {
                "success": false,
                "status_code": 410,
                "message": `Approach with id: ${approach} is finished.`
            }
        }
        else if(finished && !approach.finished){
            return {
                "success": false,
                "status_code": 425,
                "message": `Approach with id: ${approach} is not finished yet.`
            }
        }
    }

    return {
        "success": true,
        "approach": approach
    }
}

async function startExam(exam_id, user_id){
    const exam_r = await getExamWithApproachData(exam_id, user_id);
    if(!exam_r.success){
        return exam_r;
    }
    let exam = exam_r.exam;

    if(exam.approaches_in_progress.length!=0)
    {
        return {
            "success": false,
            "status_code": 409,
            "message": `There is already approach in progress with id: ${exam.approaches_in_progress[0]} to this exam`
        }
    }
    else if(exam.approaches_remaining==0){
        return {
            "success": false,
            "status_code": 409,
            "message": "You have exhausted the number of approaches to this exam.",
        }
    }
    else if(exam.start_time!=null && Date.now() < exam.start_time){
        return {
            "success": false,
            "status_code": 425,
            "message": "Too early, you cannot start this exam yet."
        }
    }
    else if(exam.end_time!=null && Date.now() > exam.end_time){
        return {
            "success":false,
            "status_code": 410,
            "message": "Too late, the time to start this exam is over."
        }
    }
    else if(!exam.can_start){
        return {
            "success": false,
            "status_code": 403,
            "message": "You cannot start this exam."
        }
    }
    else{

        let approach = await ExamApproach.create({
            "exam_id": exam.id,
            "user_id": user_id,
            "start_time": Date.now(),
        });

        return {
            "success": true,
            "exam": exam,
            "approach_id": approach.id,
            "questions": await questionDao.getQuestionsByExamId(exam.id, true)
        }
    }
}

async function getQuestionsForApproach(approach_id, user_id){

    let approach_r = await getApproach(approach_id, user_id);
    if(approach_r.success){
        let approach = approach_r.approach;
        let questions = await questionDao.getQuestionsByExamId(approach.exam_id, true); 
        return {
            "success":true,
            "questions":questions
        }
    }
    else{
        return approach_r;
    }
}

async function finishApproach(approach_id, user_id){
    let approach_r = await getApproach(approach_id, user_id);
    if(approach_r.success){
        let approach = approach_r.approach;

        approach.finished = true;
        approach.finish_time = Date.now();

        await approach.save();

        return {
            "success": true,
            "message": `Approach with id: ${approach_id} is marked as finished`
        }
    }
    else{
        return approach_r;
    }
}


async function deleteApproaches(exam_id){
    await ExamApproach.destroy({
        where:{
            exam_id: exam_id
        }
    });
}

module.exports = {
    findAllApproachesInProgress,
    getAllExamsWithApproachData,
    getExamWithApproachData,
    getApproach,

    startExam,
    getQuestionsForApproach,
    finishApproach,

    deleteApproaches,
}