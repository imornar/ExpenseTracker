'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Expense = require('./expense.model');
var jwt = require('jsonwebtoken');
var config = require('../../config/environment');

var currentDayTime = new Date();
var tokens =[]; //[0]user token, [1]new user token, [2]admin token
var userIds = []; //[0]user id, [1]new user id, [2]admin id
var createdExpensesIds = [];
var userId = '';

var createToken= function (userId) {
  return jwt.sign({_id: userId }, config.secrets.session, { expiresInMinutes: 60*5 });
};


describe('GET /api/expenses', function() {


  before(function (done) {
    User.remove().exec().then(function () {
      Expense.remove().exec().then(function () {
        done();
      })
    })
  });

  //create user[0] with 2 expenses, create user[1] with one expense, create admin
  before(function (done) {
    new User({provider:'local', name:'John', email:'John@john.com', password:'john', role:'user'}).save(function (err, user) {
      if(err)done(err);
      userIds[0] = user.id;
      tokens[0] = createToken(user.id);
        new Expense({userId:userIds[0], dateTime:currentDayTime, description:'johns fake expense', amount:'111', comment:'johns fake comment'}).save(function (err,expense) {
          if(err)done(err);
          createdExpensesIds[0] = expense.id;
          new Expense({userId:userIds[0], dateTime:currentDayTime, description:'johns fake expense2', amount:'222', comment:'johns fake comment2'}).save(function (err,expense) {
            if (err)done(err);
            createdExpensesIds[1] = expense.id;
            new User({provider: 'local', name: 'Bob', email: 'Bob@bob.com', password: 'bob', role: 'user'}).save(function (err, user) {
              if (err)done(err);
              userIds[1] = user.id;
              tokens[1] = createToken(user.id);
              new Expense({userId: userIds[1], dateTime: currentDayTime, description: 'bobs fake expense2', amount: '333', comment: 'bobs fake comment2'}).save(function (err, expense) {
                if (err)done(err);
                createdExpensesIds[2] = expense.id;
                new User({provider: 'local', name: 'admin1', email: 'admin1@admin.com', password: 'admin1', role: 'admin'}).save(function (err, user) {
                    if (err)done(err);
                    userIds[2] = user.id;
                    tokens[2] = createToken(user.id);
                    done();
                  })
              })
            })
          })
        })
    })
  });

  after(function(done) {
    User.remove().exec().then(function() {
      Expense.remove().exec().then(function() {
        done();
      });
    });
  });

  /*
  REGISTRATION + LOG N TESTING
  *
  * ADMIN PERMISSIONS TESTING
  *
  * */


  it('guest should be able to register', function(done){
    request(app)
      .post('/api/users')
      .send({email:'newUser@newUser.com', name:'newUser', password:'newUser'})
      .expect(200)
      .end(function (err, res) {
        if(err)return done(err);
        res.body.should.have.property('token');
        done();
      })
  });

  it('registered user should be able to log in', function(done){
    request(app)
      .post('/auth/local')
      .send({email:'newUser@newUser.com', password:'newUser'})
      .expect(200)
      .end(function (err, res) {
        if(err)return done(err);
        res.body.should.have.property('token');
        done();
      })
  });

  it('admin shuld be able to get list of all users', function(done){
    request(app)
      .get('/api/users')
      .set('Authorization','Bearer ' + tokens[2])
      .expect(200)
      .end(function (err, res) {
        if(err)return done(err);
        res.body.should.have.length(4);
        done();
      })
  });

  it('admin should be able to delete any user', function(done){
    request(app)
      .delete('/api/users/'+userIds[1])
      .set('Authorization','Bearer ' + tokens[2])
      .expect(204)
      .end(function (err, res) {
        if(err)return done(err);
        done();
      })
  });

  it('admin should be able to get list of all expenses created by any user', function(done){
    request(app)
      .get('/api/expenses')
      .set('Authorization','Bearer ' + tokens[2])
      .expect(200)
      .end(function (err, res) {
        res.body.should.have.length(3);
        done();
      })
  });

  it('admin should be able to get specific expense created by any user', function(done){
    request(app)
      .get('/api/expenses/'+createdExpensesIds[0])
      .set('Authorization','Bearer ' + tokens[2])
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('description','johns fake expense');
        res.body.should.have.property('amount','111');
        res.body.should.have.property('comment','johns fake comment');
        done();
      })
  });

  it('admin should be able to get specific expense created by any user', function(done){
    request(app)
      .get('/api/expenses/'+createdExpensesIds[0])
      .set('Authorization','Bearer ' + tokens[2])
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('description','johns fake expense');
        res.body.should.have.property('amount','111');
        res.body.should.have.property('comment','johns fake comment');
        done();
      })
  });

  it('admin should be able to update specific expense created by any user', function(done){
    request(app)
      .put('/api/expenses/'+createdExpensesIds[0])
      .send({description : 'Admin can update', comment : 'Admin can update comment', amount: 666, dateTime: currentDayTime})
      .set('Authorization','Bearer ' + tokens[2])
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('description','Admin can update');
        res.body.should.have.property('amount','666');
        res.body.should.have.property('comment','Admin can update comment');
        done();
      })
  });

  it('admin should be able to delete specific expense created by any user', function(done){
    request(app)
      .delete('/api/expenses/'+createdExpensesIds[0])
      .set('Authorization','Bearer ' + tokens[2])
      .expect(204)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      })
  });





  /*
   API/EXPENSES testing
   *
   * */

  it('app should response with status 401 if user is not logged in', function (done) {
    request(app)
      .get('/api/expenses')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      })
  });

  it('user should be able to create new expense', function (done) {
    request(app)
      .post('/api/expenses')
      .send({description : 'new created expense', comment : 'new created expense', amount: 200, dateTime: currentDayTime})
      .set('Authorization','Bearer ' + tokens[0])
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('description','new created expense');
        res.body.should.have.property('amount','200');
        res.body.should.have.property('comment','new created expense');
        done();
      })
  });

  it('user should be able to get list of his expenses', function (done) {
    request(app)
      .get('/api/expenses')
      .set('Authorization','Bearer ' + tokens[0])
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.length(2);
        done();
      })
  });

  it('user should be able to update his expense', function (done) {
    request(app)
      .put('/api/expenses/'+createdExpensesIds[1])
      .send({description : 'updated expense', comment : 'updated expense', amount: 555, dateTime: currentDayTime})
      .set('Authorization','Bearer ' + tokens[0])
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.property('description','updated expense');
        res.body.should.have.property('amount','555');
        res.body.should.have.property('comment','updated expense');
        done();
      })
  });

  it('user should be able to delete his expense', function (done) {
    request(app)
      .delete('/api/expenses/'+createdExpensesIds[1])
      .set('Authorization','Bearer ' + tokens[0])
      .expect(204)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      })
  });

  it('user should be able to get list oh his expenses', function (done) {
    request(app)
      .get('/api/expenses')
      .set('Authorization','Bearer ' + tokens[0])
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.length(1);
        done();
      })
  });

  it('user should NOT be able to get expense created by other user', function (done) {
    request(app)
      .get('/api/expenses/'+createdExpensesIds[2])
      .set('Authorization','Bearer ' + tokens[0])
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      })
  });

  it('user should NOT be able to update expense created by other user', function (done) {
    request(app)
      .put('/api/expenses/'+createdExpensesIds[2])
      .send({description : 'trying to update', comment : 'trying to update', amount: 666, dateTime: currentDayTime})
      .set('Authorization','Bearer ' + tokens[0])
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      })
  });

  it('user should NOT be able to delete expense created by other user', function (done) {
    request(app)
      .delete('/api/expenses/'+createdExpensesIds[2])
      .set('Authorization','Bearer ' + tokens[0])
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      })
  });

});
