/**
 * External dependencies.
 */

var _         = require('underscore');
var _s        = require('underscore.string');
var extend    = require('extend');
var moment    = require('moment');
var pluralize = require('pluralize');

/**
 * Internal dependencies.
 */

var settings  = require('../../lib/config/settings');

var slugify   = require('../../lib/util/slugify');

/**
 * Setup.
 */

/**
 * Methods.
 */

/**
 * Exports.
 */

module.exports = {
  /* Third-party methods */

  moment:         moment,
  pluralize:      pluralize,

  /* First-party methods */

  slugify:        slugify
};
