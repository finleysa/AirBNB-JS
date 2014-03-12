'use strict';

process.env.DBNAME = 'users-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
// var fs = require('fs');
// var exec = require('child_process').exec;
var User, sue;

describe('users', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      sue = new User({email:'testsue@aol.com', password:'abcd'});
      sue.register(function(){
        done();
      });
    });
  });

  describe('GET /register', function(){
    it('should display the register page', function(done){
      request(app)
      .get('/')
      .expect(200, done);
    });
  });

  describe('POST /register', function(){
    it('should register user', function(done){
      request(app)
      .post('/register')
      .field('email', 'test@aol.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
    it('should register user', function(done){
      request(app)
      .post('/register')
      .field('email', 'testsue@aol.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});

