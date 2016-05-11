var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var Company = require('../models/company');

router.post('/register', function (req, res) {
  Company.findOrCreate({name: req.body.company.name}, function(err,company, created) {
    company.save(function(err) {
      if (err) console.log(err);
    });
    var account = new Account({ username : req.body.username,
                                company: company._id }); 
    Account.register(account, req.body.password, function(err, account) {
      if (err)  return res.status(500).json({err: err});
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({status: 'Registration successful!'});
      });
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
      Account.findOne(
        {'_id': account._id},
        'username roles company',
        function (err, account) {
          if(err) res.status(400).json({err: err});
          else
            res.status(200).json({status: 'Login successful!',user: account});
        });
    });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

router.get('/status', function (req, res) {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  } 
  res.status(200).json({ status:true });
});

module.exports = router;
