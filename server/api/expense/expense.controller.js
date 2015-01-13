/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /expenses              ->  index
 * POST    /expenses              ->  create
 * GET     /expenses/:id          ->  show
 * PUT     /expenses/:id          ->  update
 * DELETE  /expenses/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Expense = require('./expense.model');

var isUserOwner = function(content, user) {
  if(content.userId == user.id)
    return true;
  return false;
};

// Get list of expenses
exports.index = function(req, res) {
  if (req.user.role === 'admin'){
    Expense.find({},function (err, expenses) {
      if (err) return handleError(res, err);
      return res.json(200, expenses);
    })}
      else{
      Expense.find({userId:req.user._id},function (err, expenses) {
       if(err) return handleError(res, err);
       return res.json(200, expenses);
      })}
};


// Get a single expense
exports.show = function(req, res) {
  Expense.findById(req.params.id, function (err, expense) {
    if(err) { return handleError(res, err);}
    if(!expense) { return res.send(404);}
    if(isUserOwner(expense, req.user) || req.user.role==='admin'){
    return res.json(expense);} else {res.send(403)}
  });
};



// Creates a new expense in the DB.
exports.create = function(req, res) {
  var newExpense = new Expense(req.body);
  newExpense.userId=req.user._id;
  Expense.create(newExpense, function(err, expense) {
    if(err) {
      console.log(err); return handleError(res, err); }
    return res.json(201, expense);
  });
};

// Updates an existing expense in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Expense.findById(req.params.id, function (err, expense) {
    if (err) { return handleError(res, err);}
    if(!expense) { return res.send(404);}
    if(!isUserOwner(expense, req.user) &&  req.user.role!=='admin') {res.send(403)}
    if(isUserOwner(expense, req.user) || req.user.role==='admin'){
    var updated = _.merge(expense, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, expense);
    });}
    else res.send(403)
  });
};

// Deletes a expense from the DB.
exports.destroy = function(req, res) {
  Expense.findById(req.params.id, function (err, expense) {
    if(err) { return handleError(res, err); }
    if(!expense) { return res.send(404); }
    if(req.user.role === "admin" || isUserOwner(expense, req.user)){
    expense.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });}else{ res.send(403)}
  });
};


function handleError(res, err) {
  return res.send(500, err);
}
