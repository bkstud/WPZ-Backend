'use strict';

const approachDao = require("./approachDao");
const examDao = require("./examDao");
const questionDao = require("./questionDao");
const answerDao = require("./answerDao");

async function getScoreForApproach(approach_id, user_id, user_admin, detailed=true){

    let approach_r = await approachDao.getApproach(approach_id, user_id, true, user_admin);
    if(!approach_r.success){
        return approach_r;
    }

    let approach = approach_r.approach;
    let exam_r = await examDao.getExam(approach.exam_id);
    if(!exam_r.success){
        return exam_r;
    }

    if(!detailed){
        let score = await answerDao.countCorrectAnswersByApproachId(approach_id);
        let max_points = await questionDao.countQuestionsByExamId(approach.exam_id);
        return {
            "success": true,
            "exam_id": approach.exam_id,
            "max_points": max_points,
            "score": score
        }
    }
    let score = 0;

    function checkIfAnswerCorrect(question, answers){
        for(let a of answers){
            if(a.question_id==question.id){
                if(a.correct){
                    ++score;
                }
                return a.correct;
            }
        }
        return false;
    }

    let questions = await questionDao.getQuestionsByExamId(approach.exam_id);
    let answers = await answerDao.findAnswersByApproachId(approach_id);

    let detailed_score = questions.map( q=> {return{
        "question_id": q.id,
        "correct": checkIfAnswerCorrect(q, answers),
    }});

    return {
        "success": true,
        "exam_id": approach.exam_id,
        "max_points": questions.length,
        "score": score,
        "detailed_score": detailed_score
    }

}

module.exports = {
    getScoreForApproach,
}