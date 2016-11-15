var express = require('express');
var router = express.Router();

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

module.exports = router;
