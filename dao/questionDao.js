'use strict';

const Question = require("../models/Question");

async function getAllQuestions(){
    return await Question.findAll();
}

async function getQuestion(pk){
    return await Question.findByPk(pk);
}

async function getQuestionsForExam(exam_id){
    return await Question.findAll({where: {"exam_id":exam_id}});
}

function mCreateQuestion(question_data){
    let q1 = Question.build({
        "exam_id": question_data.exam_id,
        "text": question_data.text,
        "type": question_data.type
    })

    q1.options = question_data.options;

    if(!Array.isArray(q1.options)){
        throw "'options' field must be an array.";
    }

    let option_id_counter=1;

    for(let option of q1.options){
        if(!typeof option.correct === "boolean"){
            throw "Each option must have a boolean field 'correct'";
        }
        if(!(typeof option.text === 'string' || option.text instanceof String)){
            throw "Each option must have a string field 'text'";
        }
        if(option.hasOwnProperty("id")){
            option_id_counter = parseInt(id) + 1;
        }
        else{
            option.id = option_id_counter;
            ++option_id_counter;
        }
    }
    return q1;
}

async function createQuestion(question_data){
    let q1 = mCreateQuestion(question_data);
    return await q1.save();
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
    if(await getQuestionById(question_id)!=null){
        await deleteQuestion(question_id);
    }
    let q1 = mCreateQuestion(question_data);
    q1.id = question_id;
    return await q1.save();
}

module.exports = {
    getAllQuestions,
    getQuestion,
    getQuestionsForExam,
    createQuestion,
    updateQuestion,
    deleteExamQuestions
}