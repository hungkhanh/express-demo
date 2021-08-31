const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h2>Hello</h2>');
});

app.listen(3000, (req, res) => {
    console.log('Server start on port 3000');
});