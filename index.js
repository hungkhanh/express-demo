const express = require('express');

const app = express();

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index', { title: 'Aloha', message: 'Hello ' });
});

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: [
      {id: 1, name: 'Thing'},
      {id: 2, name: 'Tho'},
      {id: 3, name: 'Toan'},
      {id: 4, name: 'Hung'},
    ]
  });
});

app.listen(3000, (req, res) => {
  console.log('Server start on port 3000');
});