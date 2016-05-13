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
    _blockId: { type: mongoose.Schema.Types.ObjectId,
                ref: 'Block' },
    center: mongoose.Schema.Types.Mixed,
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

// Assign polygon the block.id
Block.pre('save', function(next) {
  this.polygon._blockId = this._id;
  this.name = this.id.substr(this.id.length - 5);
  next();
});

module.exports = mongoose.model('Block', Block);
