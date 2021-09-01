const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value()
  });
});

router.get('/search', (req, res) => {
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

router.get('/create', (req, res) => {
  res.render('users/create');
});

router.get('/:id', (req, res) => {
  var id = req.params.id;

  var user = db.get('users').find({ id: id}).value();

  res.render('users/view', {
    user: user
  });
});

router.post('/create', (req, res) => {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

module.exports = router;