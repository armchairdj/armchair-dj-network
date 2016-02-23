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
  if (!req.isAuthenticated()) {
    return next();
  }

  findUser();

  function findUser() {
    var User  = mongoose.model('User');
    var email = req.session.passport.user;

    User.findOne({email: email}, handleUser);
  }

  function handleUser(err, user) {
    if (err) {
      console.log(err);
    }

    if (user) {
      req.currentUser   = user;
      req.currentUserId = user.id;
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
