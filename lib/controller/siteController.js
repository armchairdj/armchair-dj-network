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

function homepage(req, res) {
  var User = mongoose.model('User');
  var user;

  findUser();

  function findUser() {
    User.findOne(null, handleUser);
  }

  function handleUser(err, result) {
    if (err) {
      console.log(err);
    }

    user = result;

    respond();
  }

  function respond() {
    render.page(req, res, 'page/site/homepage', {
      foo: 'bar',
      user: user || {}
    });
  }
}

/**
 * Exports.
 */

module.exports = {
  homepage: homepage
};
