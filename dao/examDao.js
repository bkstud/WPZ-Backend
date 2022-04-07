'use strict';

const Exam = require("../models/Exam");

const questionDao = require("./questionDao");

async function getAllExams(){
    return await Exam.findAll();
}

async function getExam(pk){
    return await Exam.findByPk(pk);
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


async function createExam(){
    let exam = mCreateExam();
    await exam.save();
}




async function updateExam(exam_id, exam_data){

    let exam = mCreateExam(exam_data);
    if(await getExam(exam_id)!=null){
        await deleteExam(exam_id)
    }
    exam.id = exam_id;
    await exam.save();
}

module.exports = {
    getAllExams,
    getExam,
    createExam,
    updateExam,
    deleteExam,   
}