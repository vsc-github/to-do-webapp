var express = require('express');
var passport = require('passport');
var router = express.Router();

var Todo = require('../models/todos');

var nodemailer = require('../helpers/nodemailer');
var schedule = require('node-schedule');

router.post('/add', function(req, res, next) {
  var todo = new Todo();
  var title = req.body.title;

  todo.item.title = title;
  todo.item.userid = req.body.userid;
  todo.item.location = req.body.location;
  todo.item.date = req.body.date;
  todo.item.time = req.body.time;
  todo.save(function(err,addedObj) {
    if (err)
      throw err;
    var date = new Date(req.body.date);
    date.setMinutes(date.getMinutes() + 1);
    console.log("Mail remnder cron job set for",date);

    var j = schedule.scheduleJob(date, function(addedObj){
      nodemailer(addedObj);
    }.bind(null,addedObj));


    res.send({success:true});
  });
})

router.post('/all',function(req,res,next){
  Todo.find({ 'item.userid': req.body.userid }, function (err, person) {
    if (err) return handleError(err);
    res.send({items:person});
  })
})

router.get('/delete/:id',function(req,res,next){

  Todo.find({'_id': req.params.id}, function (err, old) {
    if (err) return handleError(err);

    Todo.findOneAndUpdate({'_id': req.params.id},{$set:{'item.active':!old[0].item.active}},{new: true},function (err) {
      if (err) return handleError(err);
      res.send({success:true,message:"Your todo item has been deleted!"});
    })

  })

});

router.get('/snooze/:id',function(req,res,next){

  Todo.find({'_id': req.params.id}, function (err, old) {
    if (err) return handleError(err);

    var reminderObj = old[0];

    var nextDay = old[0].item.date.setDate(old[0].item.date.getDate() + 1);
    var nextDayCron = new Date(nextDay);
    nextDayCron.setMinutes(nextDayCron.getMinutes() + 1);

    console.log("Mail remnder cron job set for",nextDayCron);

    var k = schedule.scheduleJob(nextDayCron, function(reminderObj){
      nodemailer(reminderObj);
    }.bind(null,reminderObj));

    Todo.findOneAndUpdate({'_id': req.params.id},{$set:{'item.date':nextDay}},{new: true},function (err) {
      if (err) return handleError(err);
      res.send({success:true,message:"The reminder has been snoozed for 24 hours."});
    })

  })

});

module.exports = router;
