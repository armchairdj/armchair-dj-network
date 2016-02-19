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

function mixes(req, res) {
  render.page(req, res, 'page/mix/mixes');
}

function mix(req, res) {
  render.page(req, res, 'page/mix/mix');
}

/**
 * Exports.
 */

module.exports = {
  mixes: mixes,
  mix:   mix
};
