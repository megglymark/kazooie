var Company = require('../models/company');
var Block = require('../models/block');
var Task = require('../models/task');
var Box = require('../models/box');
var QRcode = require('../models/qrcode');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/boxes', function(req,res) {
  Box.find(function(err, boxes) {
    if(err)
      return res.status(400).json({ err: err });
    return res.json(boxes);
  });
});

router.post('/boxes', function(req,res) {
  console.log(req);
  Box.create({
    /*
    produce: ,
    amount: ,
    */
  } , function(err, box) {
    if(err) {
      console.log(err);
      return res.status(400).json({ err: err });
    }
    else return res.json({ box: box });
  });
});

module.exports = router;
