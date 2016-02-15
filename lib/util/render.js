/**
 * External dependencies.
 */

var _          = require('underscore');
var extend     = require('extend');

/**
 * Internal dependencies.
 */

var config     = require('../../lib/util/configure')();
var viewHelper = require('../../lib/util/viewHelper');

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

function notFound(req, res) {
  console.log('404 %s', req.originalUrl);

  res.status(404);

  if (req.xhr) {
    return res.json({ err: 'Not Found' });
  }

  page(req, res, 'error/404');
}

function serverError(req, res, err) {
  if (err && err.stack) {
    console.log(err.stack);
  }

  res.status(500);

  if (req.xhr) {
    return res.json({ err: 'Server Error' });
  }

  page(req, res, 'error/500');
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
  page:        page,
  partial:     partial,
  notFound:    notFound,
  serverError: serverError
};
