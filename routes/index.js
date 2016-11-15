var express = require('express');
var passport = require('passport');
var router = express.Router();

var Todo = require('../models/todos');

router.get('/', function(req, res, next) {
  res.send({ status: 'working!' });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/reminders',
  failureRedirect: '/',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/reminders',
  failureRedirect: '/',
  failureFlash: true,
}));

router.post('/add', function(req, res, next) {
  var todo = new Todo();
          todo.item.title = "Hi this is the title";
          todo.item.userid = "batty.wayn3@gmail.com";
          todo.item.location = "CP";
          todo.item.date = "14-11-2016";
          todo.item.time = "12:00 PM";
          todo.save(function(err) {
            if (err)
              throw err;
            console.log("New todo item created!");
            return done(null, todo);
          });
  //res.send({ status: 'working!' });
})

router.get('/reminders', isLoggedIn, function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ user: req.user }));
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

module.exports = router;
