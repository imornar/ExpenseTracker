/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Expense = require('../api/expense/expense.model');
var User = require('../api/user/user.model');

Expense.find({}).remove(function() {
  Expense.create({
    date : new Date(),
    time : new Date(),
    description: 'Expense 1',
    amount: 100,
    comment: 'very cheap expense'
  }, {
    date : new Date(),
    time : new Date(),
    description: 'Expense 2',
    amount: 200,
    comment: 'very tasty'
  }, {
    date : new Date(),
    time : new Date(),
    description: 'Expense 3',
    amount: 300,
    comment: 'So Big plasma tv'
  },  {
    date : new Date(),
    time : new Date(),
    description: 'Expense 4',
    amount: 400,
    comment: 'gaming computer'
  },  {
    date : new Date(),
    time : new Date(),
    description: 'Expense 5',
    amount: 500,
    comment: 'new shoes'
  },{
    date : new Date(),
    time : new Date(),
    description: 'Expense 6',
    amount: 600,
    comment: 'something to eat'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    role:'user'
  }, {
    provider: 'local',
    name: 'Guest',
    email: 'guest@guest.com',
    password: 'guest',
    role:'guest'
    },{
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
