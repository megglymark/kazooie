var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.post('/register', function (req, res) {
  Account.register(new Account({ username : req.body.username}), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function(err, account, info){
    if(err) {
      return res.status(500).json({err: err});
    }
    if(!account) {
      return res.status(400).json({err: info});
    }
    req.logIn(account, function(err) {
      if(err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;
