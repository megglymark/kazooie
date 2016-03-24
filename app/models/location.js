var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = new Schema({
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('Location', Location);
