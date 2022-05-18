'use strict';

const Exam = require("../models/Exam");
const questionDao = require("./questionDao");

function mAddQuestionsToExam(exam, questions){
    return {
        "id": exam.id,
        "title": exam.title,
        "max_approaches": exam.max_approaches,
        "start_time": exam.start_time,
        "end_time": exam.end_time,
        "questions": questions,
        "createdAt": exam.createdAt,
        "updatedAt": exam.updatedAt,
    }
}

async function mCollectExamQuestions(exam){
    return mAddQuestionsToExam(exam,
        await questionDao.getQuestionsByExamId(exam.id, false));
}

async function getAllExams(include_questions=false){
    let exams = await Exam.findAll();
    if(include_questions){
        exams = await Promise.all(exams.map(mCollectExamQuestions))
    }

    return exams;
}

async function getExam(pk, include_questions=false){

    let exam = await Exam.findByPk(pk);
    if(exam==null){
        return {
            "success":false,
            "status_code":404,
            "message":`Exam with id: ${pk} not found`
        }
    }
    else {
        if(include_questions){
            exam = await mCollectExamQuestions(exam);
        }

        return {
            "success":true,
            "exam":exam
        }
    }
}

async function getExamByTitle(title){

    let exam = await Exam.findOne({where:{
        title: title
    }});

    if(exam==null){
        return {
            "success":false,
            "status_code":404,
            "message":`Exam with title ${title} not found`
        }
    }
    else {
        return {
            "success":true,
            "exam":exam
        }
    }
}

async function deleteExam(exam_id,deleteApproaches=false){
    let exam_r = await getExam(exam_id);
    if(!exam_r.success){
        return exam_r;
    }

    questionDao.deleteExamQuestions(exam_id);

    await Exam.destroy({
        where:{
            id: exam_id
        } 
    });

    return {
        "success": true
    }
}

async function isExamTitleTaken(title){
    let exam = await Exam.findOne({where:{
        title: title
    }});

    return exam!=null;
}

async function mCreateExam(exam_data){

    if(!exam_data.hasOwnProperty("title")){
        return {
            "success": false,
            "status_code": 400,
            "message": "Exam must have a string field 'title'."
        }
    }
    else if(await isExamTitleTaken(exam_data.title)){
        return {
            "success": false,
            "status_code": 409,
            "message": "This exam title is already taken."
        }
    }

    if(!exam_data.hasOwnProperty("start_time")){
        exam_data.start_time = null;
    }

    if(!exam_data.hasOwnProperty("end_time")){
        exam_data.end_time = null;
    }

    if(!exam_data.hasOwnProperty("max_approaches")){
        exam_data.max_approaches = -1;
    }


    let exam = Exam.build({
        "title": exam_data.title,
        "max_approaches": exam_data.max_approaches,
        "start_time" : exam_data.start_time,
        "end_time" : exam_data.end_time,
    });


    return {
        "success":true,
        "exam": exam,
    }
}


async function createExam(exam_data){

    let exam_r = await mCreateExam(exam_data);
    if(exam_r.success){

        let exam =  await exam_r.exam.save();
        if(exam_data.hasOwnProperty("questions")){
            let q_r = await questionDao.createExamQuestions(exam.id, exam_data.questions);
            if(!q_r.success){
                return q_r;
            }
            exam_r.exam = mAddQuestionsToExam(exam, q_r.questions);
        }
        else{
            exam_r.exam = exam;
        }
    }
    return exam_r;
}


async function updateExam(exam_id, exam_data){

    let exam_r = await mCreateExam(exam_data);
    if(!exam_r.success){
        return exam_r;
    }

    let previous_exam = await getExam(exam_id);
    if(previous_exam.success){
        exam_r.exam.createdAt = previous_exam.createdAt;
        await deleteExam(exam_id);
    }

    exam_r.exam.id = exam_id;
    exam_r.exam = await exam_r.exam.save();

    if(exam_data.hasOwnProperty("questions")){
        await questionDao.deleteExamQuestions(exam_r.exam.id);

        let q_r = questionDao.createExamQuestions(exam_r.exam.id,exam_data.questions);
        if(!q_r.success){
            return q_r;
        }

        exam_r.questions = mAddQuestionsToExam(q_r.questions);
    }

    return exam_r;
}

module.exports = {
    getAllExams,
    getExam,
    getExamByTitle,
    createExam,
    updateExam,
    deleteExam,   
}