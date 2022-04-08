#!/usr/bin/node
'use strict';

const express = require('express');
const db = require('./config/database');

const app = express();

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(() => console.log("Error: ", err))

app.use('/api/user', require('./controllers/usersController'));
app.use('/api/auth', require('./controllers/loginRegisterController'));

app.use('/api/question', require("./controllers/questionController"));
app.use('/api/approach', require("./controllers/approachController"));
app.use('/api/answer',  require("./controllers/answerController"));
app.use("/api/score",  require("./controllers/scoreController"));

const jwtService = require("./services/jwtService");

app.get('/api/hello', jwtService.verifyToken, (req, res)=>{
  let response = `
Hello, ${req.user_login}!
Your id is: ${req.user_id}.
`
  if(req.user_admin){
    response += "You are admin.\n";
  }
  else{
    response += "You are not admin.\n";
  }

  res.status(200).send(response);
})


app.listen(3002, () => {
    console.log('Exam app listening on port 3002!');
});
