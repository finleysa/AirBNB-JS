/* jshint expr:true */

'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
//var fs = require('fs');
var User;

describe('User', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err,result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new User object', function(){
      var u1 = new User({email:'bob@nomail.com', password:'1234', role:'host'});
      expect(u1.email).to.equal('bob@nomail.com');
      expect(u1.role).to.equal('host');
      expect(u1.password).to.equal('1234');
    });
  });

});
