'use strict';

const examDao = require("./examDao.js");
const ExamApproach = require("../models/ExamApproach");

async function findAllApproachesInProgress(user_id){

    let approaches = await ExamApproach.findAll({
        where:{
            "user_id": user_id,
        }
    });

    return approaches;
}
async function mCollectExamData(exam, user_id){

    if(exam==null)return exam;

    const previous_approaches = await ExamApproach.findAll(
        {where:{"user_id":user_id}});

    let approaches_remaining = exam.max_approaches - previous_approaches.length;
    if(approaches_remaining<0)approaches_remaining=0;

    exam.approaches_remaining = approaches_remaining;
    exam.can_start = approaches_remaining > 0;

    return exam;
}

async function getAllExamsWithApproachData(user_id){
    let exams = await examDao.getAllExams();
    return await Promise.all(exams.map(async function(exam){
        return await mCollectExamData(exam, user_id);
    }));
}

async function getExamWithApproachData(exam_id, user_id){
    let exam = await examDao.getExam(exam_id);
    return await mCollectExamData(exam, user_id);
}

async function createApproachToTheExam(exam_id, user_id){
    const exam = await getExamWithApproachData(exam_id, user_id);
    if(exam==null){
        return {
            "success": false,
            "cause_id": 0
        }
    }
    else if(!exam.can_start){
        return {
            "success": false,
            "cause_id": 1
        }
    }else{

        let approach = await ExamApproach.create({
            "exam_id": exam.id,
            "user_id": user_id
        });

        return {
            "success": true,
            "exam": exam,
            "approach": approach,
            "questions": await questionDao.getQuestionsForExam(exam.id)
        }
    }
}

async function deleteApproachesToTheExam(exam_id){
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
    createApproachToTheExam,
    deleteApproachesToTheExam,
}