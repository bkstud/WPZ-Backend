'use strict';

const Exam = require("../models/Exam");

async function getAllExams(){
    return await Exam.findAll();
}

async function getExam(pk){

    let exam = await Exam.findByPk(pk);
    if(exam==null){
        return {
            "success":false,
            "status_code":404,
            "message":`Exam with id: ${pk} not found`
        }
    }
    else {
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
    await Exam.destroy({
        where:{
            id: exam_id
        } 
    });
}

function mCreateExam(exam_data){
    let exam = Exam.build({
        "title": exam_data.title,
        "max_approaches": exam_data.max_approaches,
        "start_time" : exam_data.start_time,
        "end_time" : exam_data.end_time,
    })

    return exam;
}


async function createExam(exam_data){
    let exam = mCreateExam(exam_data);
    return await exam.save();
}


async function updateExam(exam_id, exam_data){

    let exam = mCreateExam(exam_data);
    if(await getExam(exam_id)!=null){
        await deleteExam(exam_id)
    }
    exam.id = exam_id;
    return await exam.save();
}

module.exports = {
    getAllExams,
    getExam,
    getExamByTitle,
    createExam,
    updateExam,
    deleteExam,   
}