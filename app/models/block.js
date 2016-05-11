var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Company = require('./company');
var Task = require('./task');

var Block = new Schema({
  name: String,
  tasks: [Task],
  polygon: { 
    _id: { type: mongoose.Schema.Types.ObjectId,
           auto: true },
    paths: [],
    strokeColor: String,
    strokeOpacity: Number,
    strokeWeight: Number,
    fillColor: String,
    fillOpacity: Number
  },
  company: { type: mongoose.Schema.Types.ObjectId,
             ref: 'Company' }
});


module.exports = mongoose.model('Block', Block);
