/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');
var mongoose = require('mongoose');
var passport = require('passport');

/**
 * Internal dependencies.
 */

var render   = require('../../lib/util/render');

/**
 * Methods.
 */

function registration(req, res) {
  renderRegistration(undefined, req, res);
}

function renderRegistration(err, req, res) {
  render.page(req, res, 'page/auth/registration', {
    error: err
  });
}

function processRegistration(req, res) {
  var params   = req.body;
  var email    = params.email;
  var name     = params.name;
  var password = params.password;
  var username = params.username;
  var User     = mongoose.model('User');

  registerUser();

  function registerUser() {
    User.register({
      email:    email,
      name:     name,
      username: username
    }, password, handleRegistration);
  }

  function handleRegistration(err, result) {
    if (err) {
      return fail(err);
    }

    authenticate();
  }

  function authenticate() {
    passport.authenticate('local')(req, res, respond);
  }

  function respond() {
    res.redirect('/');
  }

  function fail(err) {
    console.log(err);

    renderRegistration(err, req, res);
  }
}

function login(req, res) {
  renderLogin(undefined, req, res);
}

function renderLogin(err, req, res) {
  render.page(req, res, 'page/auth/login', {
    error: err
  });
}

function processLogin(req, res) {
  respond();

  function respond() {
    res.redirect(req.session.redirect || '/');
  }
}

function logout(req, res) {
  res.redirect('/');
}

/**
 * Exports.
 */

module.exports = {
  registration:         registration,
  processRegistration:  processRegistration,
  login:                login,
  processLogin:         processLogin,
  logout:               logout
};
