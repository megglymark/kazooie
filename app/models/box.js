var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Company = require('./company');
var Block = require('./block');
var Task = require('./task');
var QRcode = require('./qrcode.js');

var Box = new Schema({
  produce: String,
  amount: Number, //weight or number of produce
  qrCode: { type: mongoose.Schema.Types.ObjectId, ref: 'QRcode' },
  block: { type: mongoose.Schema.Types.ObjectId, ref: 'Block' },
  sold: Boolean,
  soldTo: String,
  picker: String,
  date: {
    harvested: { type: Date, default: Date.now },
    ofPickup: Date,
    sold: Date
  }
});

module.exports = mongoose.model('Box', Box);
