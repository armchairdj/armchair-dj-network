/**
 * External dependencies.
 */

var _        = require('underscore');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

/**
 * Public method.
 */

function strategy(options) {
  options = options || {};

  return {
    name:         options.name || 'form',
    authenticate: authenticate
  };
}

/**
 * Functions.
 */

function authenticate(req, res, callback) {
  var connect = this;

  if (!validateForm(req)) {
    return callback(new Error('Please provide a username and a password.'));
  }

  validateCredentials(connect, req, res, callback);
}

function validateForm(req) {
  var body = req.body || {};

  return !!(body.username && body.password);
}

function validateCredentials(connect, req, res, callback) {
  var body      = req.body || {};
  var email     = body.username.toLowerCase();
  var password  = body.password;
  var User      = mongoose.model('User');
  var user;

  findUser();

  function findUser() {
    User.login(email, password, handleLogin);
  }

  function handleLogin(err, result) {
    if (err) {
      console.log(err);
    }

    user = result;

    if (!user) {
      return fail();
    }

    respond();
  }

  function respond() {
    req.currentUser = user;

    connect.success({ id: user._id }, callback);
  }

  function fail() {
    connect.fail(callback);
  }
}

/**
 * Exports.
 */

module.exports = strategy;
