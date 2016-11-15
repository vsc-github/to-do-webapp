var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var todoSchema = mongoose.Schema({
  item: {
  	userid: String,
    title: String,
    location: String,
    date: String,
    time: String,
    active: Boolean,
  }
});

module.exports = mongoose.model('Todo', todoSchema);
