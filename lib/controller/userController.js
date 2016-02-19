/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

var render   = require('../../lib/util/render');

/**
 * Methods.
 */

function account(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'page/user/account', {
      pageDescription: 'TODO'
    });
  }
}

function profile(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'page/user/profile', {
      pageDescription: 'TODO'
    });
  }
}

/**
 * Exports.
 */

module.exports = {
  account: account,
  profile: profile
};
