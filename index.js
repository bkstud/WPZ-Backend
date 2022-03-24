const express = require('express');
const db = require('./config/database')

const app = express();

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(() => console.log("Error: " + err))

app.use('/users', require('./controllers/usersController'));

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
