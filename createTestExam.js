#!/usr/bin/node
'use strict';

const examDao = require("./dao/examDao");
const questionDao = require("./dao/questionDao");


async function createTestExam(){
    
    let exam1 = await examDao.createExam({
        "title": "Debug exam",
        "max_approaches": 2,
    });

    let q1 = await questionDao.createQuestion({
        "exam_id": exam1.id,
        "text":"Co to jeste HTML?",
        "type":0,
        "options":[
            {
                "text":"język programowania",
                "correct": false,
            },
            {
                "text":"język znaczników",
                "correct": true,
            },
            {
                "text":"baza danych",
                "correct": false,
            }
        ]
    });

    let q2 = await questionDao.createQuestion({
        "exam_id": exam1.id,
        "text":"Kim jest Władmir Putin?",
        "type":1,
        "options":[
            {
                "correct": true,
                "text":"zbrodniarzem wojennym"
            },
    
            {
                "correct": true,
                "text":"dyktatorem"
            },
            {
                "correct": false,
                "text":"szefem Micro$oftu xD"
            }
    
        ]
    });

    //pytanie wielokrotnego wyboru z 1 poprawną odpowiedzią
    let q3 = await questionDao.createQuestion({
        "exam_id": exam1.id,
        "text": `Które z poniższych kodów HTTP świadczą o błędzie po stronie clienta?`,
        "type":1,
        "options": [
            {
                "correct": false,
                "text":"200"
            },
            {
                "correct": false,
                "text":"201"
            },
            {
                "correct": true,
                "text":"403"
            },
            {
                "correct": false,
                "text":"500"
            },

        ]
    });

}

createTestExam();