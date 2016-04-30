/******************************************************************************
Controller for registration, login and logout.
******************************************************************************/

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

var i18n     = require('../../lib/config/i18n');

var render   = require('../../lib/util/render');

/**
 * Methods: Registration.
 */

function registerPage(req, res) {
  renderRegisterPage(req, res);
}

function renderRegisterPage(req, res, params, err) {
  params = params || {};

  render.page(req, res, 'site/armchairdj/page/auth/register', {
    headline:    i18n('armchairdj.headline.auth.register'),
    description: i18n('armchairdj.description.auth.register'),
    params:      params,
    error:       err || null
  });
}

function register(req, res) {
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

    renderRegisterPage(req, res, params, err);
  }
}

/**
 * Methods: Login.
 */

function loginPage(req, res) {
  renderLoginPage(req, res);
}

function renderLoginPage(req, res, params, err) {
  params = params || {};

  render.page(req, res, 'site/armchairdj/page/auth/login', {
    headline:    i18n('armchairdj.headline.auth.login'),
    description: i18n('armchairdj.description.auth.login'),
    params:      params,
    error:       err || null
  });
}

function login(req, res, next) {
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

    renderLoginPage(req, res, params, err);
  }
}

/**
 * Methods: Logout.
 */

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * Exports.
 */

module.exports = {
  registerPage: registerPage,
  register:     register,

  loginPage:    loginPage,
  login:        login,

  logout:       logout
};
