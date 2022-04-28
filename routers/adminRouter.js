'use strict';

const express = require('express');
const jwtService = require('../services/jwtService');
const admin_router = express.Router();

admin_router.use(jwtService.verifyTokenAdmin);

admin_router.use("/users", require("./admin/userRouter"));
admin_router.use("/questions", require("./admin/questionRouter"));

module.exports = admin_router