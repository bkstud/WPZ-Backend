'use strict';

const examApproachDao = require("./examApproachDao");
const questionDao = require("./questionDao");

const Answer = require("../models/Answer");


async function findAnswersByApproachId(approach_id){
    return await Answer.findAll({where:{
        approach_id: approach_id,
    }})
}

async function findAnswersByApproachIdAndQuestionId(approach_id, question_id){
    return await Answer.findAll({where: {
        "approach_id": approach_id,
        "question_id": question_id,
    }});
}

async function countCorrectAnswersByApproachId(approach_id){
    return await Answer.count({where:{
        approach_id: approach_id,
        correct: true
    }})
}


async function postAnswer(user_id, answer_data){

    if(!answer_data.hasOwnProperty("approach_id")){
        return {
            "success": false,
            "status_code": 400,
            "message": "Answer must have an integer field 'approach_id'"
        }
    }

    if(!answer_data.hasOwnProperty("question_id")){
        return {
            "success": false,
            "status_code": 400,
            "message": "Answer must have an integer field 'question_id'"
        }
    }

    if(!Array.isArray(answer_data.chosen_options)){
        return {
            "success": false,
            "status_code": 400,
            "message": "Answer must have an array field 'chosen_options'"
        }
    }

    let approach_id = answer_data.approach_id;
    let question_id = answer_data.question_id;

    let approach_r = await examApproachDao.getApproach(approach_id, user_id);
    if(!approach_r.success){
        return approach_r;
    }
    let question_r = await questionDao.getQuestion(question_id, false);
    if(!question_r.success){
        return question_r;
    }

    function checkIfCorrect(question, answer_data){

        for(let option of question.options){
            if(option.correct){
                //Nie zaznaczono poprawnej opcji
                if(!answer_data.chosen_options.includes(option.id)){
                    return false;
                }
            }
            else{
                //Zaznaczono błędną opcję
                if(answer_data.chosen_options.includes(option.id)){
                    return false;
                }
            }
        }
        return true;
    }

    //let approach = approach_r.approach;
    let question = question_r.question;
    let answer = Answer.build({
        "user_id":user_id,
        "approach_id":approach_id,
        "question_id":question_id,
        "correct": checkIfCorrect(question, answer_data)
    })

    answer.chosen_options = answer_data.chosen_options;

    /*
    Sprawdzam, czy użytkownik udzielił już odpowiedzi na to pytanie w tej samej sesji,
    jeśli tak, to trzeba tę odpowiedź usunąć.
    (user_id nie trzeba sprawdzać, bo wynika funkcyjnie od approach_id)
    */
    let previousAnswers = await findAnswersByApproachIdAndQuestionId(approach_id, question_id);

    if(previousAnswers.length != 0){
        await Answer.destroy({
            where: {
                "approach_id": approach_id,
                "question_id":question_id,
            }
        });
    }

    await answer.save();

    return {
        "success":true,
        "message": `Successfully posted an answer to question: ${question_id}`
    }
}

async function mCollectAnswersForQuestion(approach_id, question){
    let id = question.id;
    let options = question.options;
    let exam_id = question.exam_id;
    let text = question.text;
    let type = question.type;

    let answers = await findAnswersByApproachIdAndQuestionId(approach_id, id);
    let chosen_options = answers.map(a=>a.chosen_options).flat();

    return {id, options, exam_id, text, type, chosen_options};
}

async function getQuestionsForApproachWithAnswers(approach_id, user_id){
    let res = await examApproachDao.getQuestionsForApproach(approach_id, user_id);
    if(!res.success)return res;
    
    res.questions = await Promise.all(res.questions.map(async function(question){
        return await mCollectAnswersForQuestion(approach_id, question);
    }));

    return res;
}

module.exports = {
    findAnswersByApproachId,
    countCorrectAnswersByApproachId,
    postAnswer,
    getQuestionsForApproachWithAnswers
}