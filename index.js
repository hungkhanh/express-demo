const express = require('express');

const app = express();

var users= [
  {id: 1, name: 'Thing'},
  {id: 2, name: 'Tho'},
  {id: 3, name: 'Toan'},
  {id: 4, name: 'Hung'},
];

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/static', express.static('public'))
// http://localhost:3000/static/sea.jpg

app.get('/', (req, res) => {
  res.render('index', { title: 'Aloha', message: 'Hello ' });
});

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: users
  });
});

app.get('/users/search', (req, res) => {
  var q = req.query.q.toLowerCase();
  var matchedUsers = users.filter((user) => {
    return user.name.toLowerCase().indexOf(q) !== -1;
  }); 
  
  res.render('users/index', {
    users: matchedUsers,
    text: q
  });
});

app.listen(3000, (req, res) => {
  console.log('Server start on port 3000');
});