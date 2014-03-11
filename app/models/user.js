'use strict';

module.exports = User;

function User(user){
  this.email = user.email;
  this.password = user.password;
  // role = host or guest
  this.role = user.role;
}
