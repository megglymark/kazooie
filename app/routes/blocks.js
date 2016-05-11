var Polygon = require('../models/polygon');
var Company = require('../models/company');
var Block = require('../models/block');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/blocks', function(req,res) {
  Block.find(function(err, blocks) {
    if (err)
      return res.status(400).json({ err: err });
    return res.json(blocks);
  });
});

router.get('/blocks/:id',function(req,res) {
  Block.findById(req.params.id, function(err,block) {
    if (err) {
      console.log(err);
      return res.status(400).json({ err: err });
    }
    else return res.json(block);
  });
});

router.post('/blocks', function(req,res) {
  Block.create({ 
    company: req.body.user.company,
    polygon: {
      paths: req.body.paths,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: 'FF0000',
      fillOpacity: 0.35
    },
  }, function(err, block) {
    if (err) { 
      console.log(err);
      return res.status(400).json({ err: err });
    }
    else return res.json({ block: block });
  });
});

module.exports = router;
