var express = require('express');
var passport = require('passport');
var router = express.Router();

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
