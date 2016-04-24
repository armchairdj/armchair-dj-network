/**
 * External dependencies.
 */

var _      = require('underscore');
var async  = require('async');
var extend = require('extend');
var jade   = require('jade');
var path   = require('path');

/**
 * Internal dependencies.
 */



/**
 * Methods.
 */

function fetchContent(templateName, fileName, callback) {
  var basedir    = path.join(__dirname, '../../lib/views/emails');
  var template   = path.resolve(basedir + '/' + fileName);

  var jadeOpts   = {
    basedir: basedir,
    pretty:  true
  };

  var jadeLocals = {
    i18n:              i18n,
    view:              view,
    buildTrackableUrl: _.partial(trackableUrl.build, templateName)
  };

  var html = jade.compileFile(template, jadeOpts)(jadeLocals);

  callback(null, html);
}

/**
 * Exports.
 */

