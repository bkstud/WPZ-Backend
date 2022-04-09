'use strict';

const express = require('express');
const jwtService = require('../services/jwtService');
const admin_router = express.Router();

admin_router.use(jwtService.verifyTokenAdmin);

admin_router.use("/users", require("./admin/usersController"));
admin_router.use("/questions", require("./admin/questionController"));

module.exports = admin_router