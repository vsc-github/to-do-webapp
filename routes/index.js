var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {

      if (err) { return next(err); }

      if (!user) {
       res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success:false, message:info }));
      }else { 
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success:true, user: user }));
      }

  })(req, res, next);
});

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {

      if (err) { return next(err); }

      if (!user) {
          res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success:false, message:info }));
       }
      else { 
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ user: user }));
      }

  })(req, res, next);
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

module.exports = router;
