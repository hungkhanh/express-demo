const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);


db.defaults({ 
  users: []
}).write();

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/static', express.static('public'))
// http://localhost:3000/static/sea.jpg

app.get('/', (req, res) => {
  res.render('index', { title: 'Aloha', message: 'Hello ' });
});

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value()
  });
});

app.get('/users/search', (req, res) => {
  var q = req.query.q.toLowerCase();
  var users = db.get('users').value();
  var matchedUsers = users.filter((user) => {
    return user.name.toLowerCase().indexOf(q) !== -1;
  }); 
  
  res.render('users/index', {
    users: matchedUsers,
    text: q
  });
});

app.get('/users/create', (req, res) => {
  res.render('users/create');
});

app.get('/users/:id', (req, res) => {
  var id = req.params.id;

  var user = db.get('users').find({ id: id}).value();

  res.render('users/view', {
    user: user
  });
});

app.post('/users/create', (req, res) => {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

app.listen(3000, (req, res) => {
  console.log('Server start on port 3000');
});