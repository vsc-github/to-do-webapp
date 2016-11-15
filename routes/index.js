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
          todo.item.title = req.body.title;
          todo.item.userid = req.body.userid;
          todo.item.location = req.body.location;
          todo.item.date = req.body.date;
          todo.item.time = req.body.time;
          todo.save(function(err) {
            if (err)
              throw err;
            console.log("New todo item created!");
            res.send({success:true});
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
