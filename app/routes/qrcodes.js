var Company = require('../models/company');
var QRcode = require('../models/qrcode');
var Box = require('../models/box');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// POST api/qrcodes/:id
// :id = number of qrcodes to create
router.get('/qrcodes/:id', function(req,res) {
  var qrcodes = [];
  for(i = 0; i < req.params.id; i++) {
    qrcodes.push(new QRcode({
      company: "https://localhost:3000/#/box/"
    }));
  }
  console.log(qrcodes);
  QRcode.create(qrcodes, function(err,qrcodes) {
    if(err){
      console.log(err);
      return res.status(400).json({err: err});
    }
    else
      return res.json(qrcodes);
  });
});

module.exports = router;
