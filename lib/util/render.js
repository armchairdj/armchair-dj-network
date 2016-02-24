/**
 * External dependencies.
 */

var _          = require('underscore');
var extend     = require('extend');

/**
 * Internal dependencies.
 */

var i18n       = require('../../lib/config/i18n');
var settings   = require('../../lib/config/settings');

var viewHelper = require('../../lib/util/viewHelper');

/**
 * Methods: Rendering.
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
 * Methods: Standard errors.
 */

function forbidden(req, res) {
  console.log('403 %s', req.originalUrl);

  res.status(403);

  if (req.xhr) {
    return res.json({ err: 'Forbidden' });
  }

  page(req, res, 'page/error/forbidden');
}

function notFound(req, res) {
  console.log('404 %s', req.originalUrl);

  res.status(404);

  if (req.xhr) {
    return res.json({ err: 'Not Found' });
  }

  page(req, res, 'page/error/notFound');
}

function serverError(req, res, err) {
  if (err && err.stack) {
    console.log(err.stack);
  }

  res.status(500);

  if (req.xhr) {
    return res.json({ err: 'Server Error' });
  }

  page(req, res, 'page/error/serverError');
}

/**
 * Helper functions.
 */

function standardLocals(req, res, data, extra) {
  data              = data || {};
  data.pageKeywords = mergeKeywords(data.pageKeywords);

  return extend({}, viewDefaults(req, res), data, extra);
}

function viewDefaults(req, res) {
  return {
    settings:        settings,
    currentUser:     req.currentUser || null,
    currentYear:     (new Date()).getFullYear(),
    i18n:            i18n,
    pageDescription: null,
    viewHelper:      viewHelper
  };
}

function mergeKeywords(pageKeywords) {
  return _.chain([settings.meta.keywords, pageKeywords]).flatten().compact().sort().value();
}

/**
 * Exports.
 */

module.exports = {
  page:        page,
  partial:     partial,

  forbidden:   forbidden,
  notFound:    notFound,
  serverError: serverError
};
