/******************************************************************************
Wrapper for common HTML rendering scenarios:
  * Full Jade pages.
  * Layout-free Jade partials.
  * Common error pages.

Sets up common response locals for the view to chew on.
******************************************************************************/

/**
 * External dependencies.
 */

var _              = require('underscore');
var extend         = require('extend');

/**
 * Internal dependencies.
 */

var i18n           = require('../../lib/config/i18n');
var settings       = require('../../lib/config/settings');

var resolveAssets = require('../../lib/util/resolveAssets');
var environment    = require('../../lib/util/environment');
var viewHelper     = require('../../lib/util/viewHelper');


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
  if (err) {
    console.log(err);
  }

  res.status(500);

  if (req.xhr) {
    return res.json({ err: 'Server Error' });
  }

  page(req, res, 'page/error/serverError');
}

/**
 * Local functions.
 */

function standardLocals(req, res, data, extra) {
  data              = data || {};
  data.pageKeywords = mergeKeywords(data.pageKeywords);

  var locals = extend({}, viewDefaults(req, res), data, extra);

  if (!locals && !req.xhr && !locals.isHomepage) {
    console.log('Missing HTML title tag on ' + req.url + '.');
  }

  return locals;
}

// TODO BJD Make some of these app.locals over req.locals.
function viewDefaults(req, res) {
  return {
    assetFiles:      req.app.locals.resolveAssets,
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
