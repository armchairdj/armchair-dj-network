/******************************************************************************
[DESCRIPTION]
******************************************************************************/

/**
 * External dependencies.
 */

var _        = require('underscore');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

var render   = require('../../lib/util/render');

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

    return res.redirect('/login');
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

function permitOnly() {
  return _.partial(permitOnlyRoles, _.toArray(arguments));
}

function permitOnlyRoles(roles, req, res, next) {
  console.log(roles);
  console.log(req.currentUser.role);

  if (!_.contains(roles, req.currentUser.role)) {
    return render.forbidden(req, res);
  }

  next();
}

/**
 * Exports.
 */

module.exports = {
  findCurrentUser: findCurrentUser,
  requireLogin:    requireLogin,
  denyIfLoggedIn:  denyIfLoggedIn,
  permitOnly:      permitOnly
};
