var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var todoSchema = mongoose.Schema({
  item: {
  	userid: String,
    title: String,
    location: String,
    date: Date,
    time: String,
    active: {type:Boolean,default:1},
  }
});

module.exports = mongoose.model('Todo', todoSchema);
