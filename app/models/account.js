var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Company = require('./company');

var Account = new Schema({
  username: String,
  password: String,
  roles: [String],
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
