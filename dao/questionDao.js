'use strict';

const Question = require("../models/Question");

function mHideTheSolution(q){

    return {
        "id": q.id,
        "exam_id": q.exam_id,
        "type": q.type,
        "text": q.text,
        "options": q.options.map(o => {return {
            "id": o.id,
            "text": o.text
        }})
    }
}


async function getAllQuestions(hideTheSolution=false){    
    let questions = await Question.findAll();
    if(hideTheSolution){
        questions = questions.map( q => mHideTheSolution(q));
    }
    
    return questions;
}

async function getQuestion(pk, hideTheSolution=false){

    let question = await Question.findByPk(pk);
    if(question==null){
        return {
            "success": false,
            "status_code": 404,
            "message": `Question with id ${pk} not found.`
        }
    }

    if(hideTheSolution){
        question = mHideTheSolution(question);
    }

    return {
        "success": true,
        "question": question
    }
}

async function getQuestionsByExamId(exam_id, hideTheSolution=false){
    let questions = await Question.findAll({where: {"exam_id":exam_id}});
    if(hideTheSolution){
        questions = questions.map( q => mHideTheSolution(q));
    }
    return questions;
}

async function countQuestionsByExamId(exam_id){
    return await Question.count({where: {"exam_id":exam_id}});
}


function mCreateQuestion(question_data, exam_id_in=null){

    if(exam_id_in!=null){
        question_data.exam_id = exam_id_in;
    }

    if(!(typeof question_data.text === 'string' || question_data.text instanceof String)){
        return {
            "success": false,
            "status_code": 400,
            "message": "Question must have a string field 'text'"
        }
    }

    if(!question_data.hasOwnProperty("type")){
        return {
            "success": false,
            "status_code": 400,
            "message": "Question must have an integer field 'type'"
        }
    }

    if(! question_data.hasOwnProperty("exam_id")) {
        return {
            "success": false,
            "status_code": 400,
            "message": "Question must have an integer field 'exam_id'"
        }
    }
    
    let q1 = Question.build({
        "exam_id": question_data.exam_id,
        "text": question_data.text,
        "type": question_data.type
    })

    //q1.options = question_data.options;

    let options = question_data.options;

    if(!Array.isArray(options)){
        return {
            "success": false,
            "status_code": 400,
            "message": "'options' field must be an array."
        }
    }

    let option_id_counter=1;

    for(let option of options){
        if(!typeof option.correct === "boolean"){

            return {
                "success": false,
                "status_code": 400,
                "message": "Each option must have a boolean field 'correct'."
            }
        }
        if(!(typeof option.text === 'string' || option.text instanceof String)){
            
            return {
                "success": false,
                "status_code": 400,
                "message": "Each option must have a string field 'text'."
            }
        }
        if(option.hasOwnProperty("id")){
            option_id_counter = parseInt(id) + 1;
        }
        else{
            option.id = option_id_counter;
            ++option_id_counter;
        }
    }

    q1.options = options.map(o=>{
        return {
            "id" : o.id,
            "correct" : o.correct,
            "text": o.text
            }})

    return {
        "success": true,
        "question": q1
    }
}

async function createQuestion(question_data){
    let q1_r = mCreateQuestion(question_data);
    if(q1_r.success){
        q1_r.question = await q1_r.question.save();
    }
    return q1_r;
}

async function createExamQuestions(exam_id, question_data_list){
    let questions = question_data_list.map( a=> mCreateQuestion(a, exam_id));
    for(let t of questions){
        if(!t.success){
            return t;
        }
    }
    questions = await Promise.all(questions.map(q_r => q_r.question).map(async function(question){
        return await question.save();
    }));

    return {
        "success": true,
        "questions": questions
    }
}


async function deleteQuestion(question_id){
    await Question.destroy({
        where: {
            id: userId
        }
    });
}


async function deleteExamQuestions(exam_id){
    await Question.destroy({
        where:{
            exam_id: exam_id
        }
    });
}

async function updateQuestion(question_id, question_data){

    let q1_r = mCreateQuestion(question_data);
    if(q1_r.success){
        let previous_question = await getQuestionById(question_id);
        if(previous_question!=null){
            let t = previous_question.createdAt;
            await deleteQuestion(question_id);
            q1_r.question.createdAt = t;
        }
        q1_r.question.id = question_id;
        q1_r.question = await q1_r.question.save();
    }
    return q1_r;
}

module.exports = {
    getAllQuestions,
    getQuestion,
    getQuestionsByExamId,
    countQuestionsByExamId,
    createQuestion,
    updateQuestion,
    createExamQuestions,
    deleteExamQuestions
}