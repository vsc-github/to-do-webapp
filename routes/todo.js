var express = require('express');
var passport = require('passport');
var router = express.Router();

var Todo = require('../models/todos');

router.post('/add', function(req, res, next) {
  var todo = new Todo();
          todo.item.title = req.body.title;
          todo.item.userid = req.body.userid;
          todo.item.location = req.body.location;
          todo.item.date = req.body.date;
          todo.item.time = req.body.time;
          todo.save(function(err) {
            if (err)
              throw err;
            console.log("New todo item created!");
            res.send({success:true});
          });
})

router.get('/all',function(req,res,next){
  console.log("/all",req);
  Todo.find({ 'item.userid': 'batty.wayn3@gmail.com' }, function (err, person) {
  if (err) return handleError(err);
  res.send({items:person});
})
})

module.exports = router;
