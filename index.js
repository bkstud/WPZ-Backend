#!/usr/bin/node
'use strict';

const express = require('express');
const db = require('./config/database');
const cors = require('cors')

const app = express();

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(() => console.log("Error: ", err))

app.use(cors())

app.use('/api/auth', require('./routers/loginRegisterRouter'));
app.use('/api/admin', require('./routers/adminRouter'));

app.use('/api/exams', require("./routers/examApproachRouter"));
app.use('/api/answers',  require("./routers/answerRouter"));

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

app.use('/priv', express.static('priv'));

app.listen(3002, () => {
    console.log('Exam app listening on port 3002!');
});
