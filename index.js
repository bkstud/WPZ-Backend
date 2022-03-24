const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!2');
});

app.get('/test', function (req, res) {
    res.send('Hello World! TEST');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
