'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/fresh');
};

exports.create = function(req, res){
  var user = new User(req.body);
  user.register(function(){
    if(user._id){
      res.redirect('/');
    }else{
      res.render('users/fresh');
    }
  });
};
