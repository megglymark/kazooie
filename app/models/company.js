var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;
var Block = require('./block');

var Company = new Schema({
  name: String,
  customers: [String]
});

Company.plugin(findOrCreate);
module.exports = mongoose.model('Company', Company);
