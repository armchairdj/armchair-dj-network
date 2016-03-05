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

var i18n     = require('../../lib/config/i18n');

var render   = require('../../lib/util/render');

/**
 * Methods.
 */

function index(req, res) {
  render.page(req, res, 'page/admin/admin', {
    headline: i18n('headline.admin.index')
  });
}

/**
 * Exports.
 */

module.exports = {
  index: index
};
