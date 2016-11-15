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

router.post('/all',function(req,res,next){
  Todo.find({ 'item.userid': req.body.userid }, function (err, person) {
  if (err) return handleError(err);
  res.send({items:person});
})
})

router.post('/delete',function(req,res,next){

  Todo.find({'_id': req.body.id}, function (err, old) {
  if (err) return handleError(err);

    Todo.findOneAndUpdate({'_id': req.body.id},{$set:{'item.active':!old[0].item.active}},{new: true},function (err) {
      if (err) return handleError(err);
      res.send({success:true});
    })

  })

});

module.exports = router;
