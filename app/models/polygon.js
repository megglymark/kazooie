var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Polygon = new Schema({
  paths: [ { lat: Number , lng: Number } ],
  strokeColor: String,
  strokeOpacity: Number,
  strokeWeight: Number,
  fillColor: String,
  fillOpacity: Number,
});

module.exports = mongoose.model('Polygon', Polygon);
