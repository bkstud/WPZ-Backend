'use strict';


const answerDao = require("../dao/answerDao");
const jwtService = require('../services/jwtService');
const express = require('express');
const router = express.Router();
const{onClientError, onServerError} = require("./errorHandler");


router.use(express.json());
router.use(jwtService.verifyToken);

router.post("/", (req, res)=>{
    answerDao.postAnswer(req.user_id, req.body).then(
        a_r => {
            if(a_r.success){
                res.status(201).json({
                    "detail": a_r.message
                })
            }
            else{
                onClientError(res, a_r.error_code, a_r.message);
            }
        }
    ).catch(err => onServerError(res, err));
});

module.exports = router;
