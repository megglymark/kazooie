var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Company = require('./company');
var Block = require('./block');
var Task = require('.task');

var Box = new Schema({
  produce: String,
  amount: Number, //weight or number of produce
  qrCode: String,
  block: { type: mongoose.Schema.Types.ObjectId, ref: 'Block' },
  sold: Boolean,
  soldTo: String,
  date: {
    harvested: { type: Date, default: Date.now },
    ofPickup: Date,
    sold: Date
  }
});
