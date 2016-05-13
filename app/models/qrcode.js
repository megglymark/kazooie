var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Box = require('./box');

var QRcode = new Schema({
  Prefix: String,
  box: { type: mongoose.Schema.Types.ObjectId, ref: 'Box' }
});



module.exports = mongoose.model('QRcode', QRcode);
