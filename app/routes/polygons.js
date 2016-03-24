var Polygon = require('../models/polygon');
var express = require('express');
var router = express.Router();

router.get('/polygons', function(req,res) {

  Polygon.find(function(err, polygons) {
    if (err)
      res.send(err);
    res.json(polygons);
  });

});

router.post('/polygons', function(req,res) {
  
  Polygon.create({
    paths: req.body,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: 'FF0000',
    fillOpacity: 0.35
  }, function(err, polygon) {
    if (err)
      res.send(err);

    Polygon.find(function(err,polygons) {
      if(err)
        res.send(err);
      res.json(polygons);
    });

  });

});

module.exports = router;
