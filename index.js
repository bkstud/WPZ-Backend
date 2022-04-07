#!/usr/bin/node
'use strict';

const express = require('express');
const db = require('./config/database');

const app = express();

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(() => console.log("Error: ", err))

app.use('/api/users', require('./controllers/usersController'));
app.use('/api/auth', require('./controllers/loginRegisterController'));
app.use('/api/question', require("./controllers/questionController"));
app.use('/api/approach', require("./controllers/approachController"));

app.listen(3002, () => {
    console.log('Example app listening on port 3000!');
});
