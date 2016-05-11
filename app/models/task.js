var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Account = require('./account');

var Task = new Schema({
  taskType: String,
  assigned: {type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  product: String,
  amount: Number,
  comments: [{
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    comment: String
  }],
  complete: Boolean,
  date: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    completed: Date
  }
});

module.exports = mongoose.model('Task', Task);
