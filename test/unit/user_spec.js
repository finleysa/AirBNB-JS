/* jshint expr:true */

'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
//var User = require ('../app/models/user');
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
      var u1 = new User({email:'steve@nomail.com', password:'1234', role:'host'});
      u1.register(function(){
        done();
      });
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


  describe('register', function(){
    it('should register a new User', function(done){
      var u1 = new User({email:'split227@hotmail.com', password:'1234', role:'host'});
      u1.register(function(err, body){
        expect(err).to.be.null;
        expect(u1.password).to.have.length(60);
        body = JSON.parse(body);
        //expect(body.id).to.be.ok;
        expect(u1._id).to.be.instanceof(Mongo.ObjectID);
        
        done();
      });
    });
    it('should not register a duplicate User', function(done){
      var u1 = new User({email:'steve@nomail.com', password:'1234', role:'host'});
      u1.register(function(user){
        expect(u1._id).to.be.undefined;
        done();
      });
    });
  });
});
