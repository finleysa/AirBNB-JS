'use strict';

module.exports = User;
var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var email = require('../lib/email');

function User(user){
  this.email = user.email;
  this.password = user.password;
  // role = host or guest
  this.role = user.role;
}

function insert(user, fn){
  users.findOne({email:user.email}, function(err, userFound){
    if (!userFound){
      users.insert(user, function(err, record){
        fn(err);
      });
    }else{
      fn();
    }
  });
}

User.prototype.register = function(fn){
  var self = this;

  hashPassword(self.password, function(hashedPassword){
    self.password = hashedPassword;
    insert(self, function(err){
      if(self._id){
        email.sendWelcome({to:self.email}, function(error, body){
          fn(error, body);
        });
      }else{
        fn();
      }
    });
  });
};

function hashPassword(password, fn){
  bcrypt.hash(password, 8, function(err, hash){
    fn(hash);
  });
}
