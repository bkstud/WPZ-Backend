'use strict';

const jwtService = require('../services/jwtService');
const express = require('express');
const router = express.Router();
const{onClientError, onServerError} = require("./errorHandler");

const scoreDao = require("../dao/scoreDao");

router.use(jwtService.verifyToken);

router.get("/approach/:approach_id(\\d+)", (req, res)=>{
    let approach_id = req.params.approach_id;
    scoreDao.getScoreForApproach(approach_id, req.user_id, req.user_admin, false).then(s_r => {
        if(s_r.success){
            res.status(200).json({
                "exam_id": s_r.exam_id,
                "max_points": s_r.max_points,
                "score": s_r.score,
            })
        }
        else{
            onClientError(res, s_r.error_code, s_r.message);
        }

    }).catch(err => onServerError(res, err));
});

router.get("/approach/:approach_id(\\d+)/detailed", (req, res)=>{

    let approach_id = req.params.approach_id;
    scoreDao.getScoreForApproach(approach_id, req.user_id, req.user_admin, true).then(s_r => {
        if(s_r.success){
            res.status(200).json({
                "exam_id": s_r.exam_id,
                "max_points": s_r.max_points,
                "score": s_r.score,
                "detailed_score": s_r.detailed_score
            })
        }
        else{
            onClientError(res, s_r.error_code, s_r.message);
        }
    }).catch(err => onServerError(res, err));
});

module.exports = router;