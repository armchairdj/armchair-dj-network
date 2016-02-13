/**
 * External dependencies.
 */

var _          = require('underscore');
var extend     = require('extend');

/**
 * Internal dependencies.
 */

var config     = require('../../app/util/configure')();
var viewHelper = require('../../app/util/viewHelper');

/**
 * Methods.
 */

function page(req, res, template, data) {
  var locals = standardLocals(req, res, data);

  res.render(template, locals);
}

function partial(req, res, template, data) {
  var locals = standardLocals(req, res, data, {
    layout: false
  });

  res.render(template, locals);
}

/**
 * Helper functions.
 */

function standardLocals(req, res, data, extra) {
  return extend({}, viewDefaults(req, res), data, extra);
}

function viewDefaults(req, res) {
  return {
    config:      config,
    currentYear: (new Date()).getFullYear(),
    viewHelper:  viewHelper
  };
}

/**
 * Exports.
 */

module.exports = {
  page:         page,
  partial:      partial
};
