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
  renderRegistration(req, res);
}

function renderRegistration(req, res, params, err) {
  params = params || {};

  render.page(req, res, 'page/auth/registration', {
    params: params,
    error:  err || null
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

    renderRegistration(req, res, params, err);
  }
}

function login(req, res) {
  renderLogin(req, res);
}

function renderLogin(req, res, params, err) {
  params = params || {};

  render.page(req, res, 'page/auth/login', {
    params: params,
    error:  err || null
  });
}

function processLogin(req, res, next) {
  var params = req.body;
  var user;

  authenticate();

  function authenticate() {
    passport.authenticate('local', handleAuthentication)(req, res, next);
  }

  function handleAuthentication(err, result, info) {
    if (err) {
      return next(err);
    }

    user = result;

    if (!user) {
      return fail(new Error('Authentication failed.'));
    }

    establishSession();
  }

  function establishSession() {
    req.login(user, handleSession);
  }

  function handleSession(err) {
    if (err) {
      return next(err);
    }

    respond();
  }

  function respond() {
    req.flash('success', 'You are now logged in as ' + user.username + '.');

    res.redirect(req.session.redirect || '/');
  }

  function fail(err) {
    console.log(err);

    renderLogin(req, res, params, err);
  }
}

function logout(req, res) {
  req.logout();
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
