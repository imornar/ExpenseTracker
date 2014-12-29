'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
  userId: Schema.Types.ObjectId,
  dateTime: {type:Date, required: true},
  description: {type:String, required: true},
  amount: {type:Number, required: true},
  comment: {type:String, default:'No comment...'}
});

/*
 *
    Validations, mandatory fields
 *
 */

var validatePresenceOf= function (value) {
  return value? true: false;
};

ExpenseSchema
  .path('dateTime')
  .validate(function (date) {
    return validatePresenceOf(date);
  }, 'New expense cannot be saved without date');

ExpenseSchema
  .path('description')
  .validate(function (description) {
    return validatePresenceOf(description);
  }, 'New expense cannot be saved without description');

ExpenseSchema
  .path('userId')
  .validate(function (userId) {
    return validatePresenceOf(userId);
  }, 'New expense cannot be saved if not attacked to user');

ExpenseSchema
  .path('amount')
  .validate(function (amount) {
    return validatePresenceOf(amount);
  }, 'New expense cannot be saved without amount');

module.exports = mongoose.model('Expense', ExpenseSchema);
