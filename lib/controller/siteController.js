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
  respond();

  function respond() {
    render.page(req, res, 'page/site/homepage');
  }
}

/**
 * Exports.
 */

module.exports = {
  homepage: homepage
};
