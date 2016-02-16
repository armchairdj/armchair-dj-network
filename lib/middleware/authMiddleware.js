/**
 * External dependencies.
 */

var _            = require('underscore');
var mongoose     = require('mongoose');

/**
 * Internal dependencies.
 */

/**
 * Methods
 */

function findCurrentUser(req, res, next) {
  console.log('isAuthenticated', req.isAuthenticated());

  if (!req.isAuthenticated()) {
    return next();
  }

  findUser();

  function findUser() {
    console.log('finding user');

    var User = mongoose.model('User');

    User.findById(req.session.auth.user.id, handleUser);
  }

  function handleUser(err, user) {
    console.log('handling user');

    if (err) {
      console.log(err);
    }

    if (user) {
      req.currentUser        = user;
      res.locals.currentUser = user;
      req.userId             = user.id;
    }

    next();
  }
}

function requireLogin(req, res, next) {
  if (!req.isAuthenticated() || !req.currentUser) {
    req.session.redirect = req.url;

    return res.redirect('/auth/login');
  }

  delete req.session.redirect;

  next();
}

function denyIfLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.currentUser) {
    return res.redirect('/');
  }

  next();
}

/**
 * Exports.
 */

module.exports = {
  findCurrentUser: findCurrentUser,
  requireLogin:    requireLogin,
  denyIfLoggedIn:  denyIfLoggedIn
};
