/******************************************************************************
Controller for site administration.
******************************************************************************/

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

function index(req, res) {
  render.page(req, res, 'page/admin/admin');
}

/**
 * Exports.
 */

module.exports = {
  index: index
};
