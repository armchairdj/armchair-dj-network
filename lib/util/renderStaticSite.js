/**
 * External dependencies.
 */

var _          = require('underscore');
var dir        = require('node-dir');
var extend     = require('extend');
var jade       = require('jade');
var path       = require('path');

/**
 * Internal dependencies.
 */

var i18n       = require('../../lib/config/i18n');
var settings   = require('../../lib/config/settings');

var viewHelper = require('../../lib/util/viewHelper');

/**
 * Methods.
 */

function renderStaticSite(site, callback) {
  var basedir  = path.join(__dirname, '../../lib/view');
  var filePath = path.join(__dirname, '../../lib/view/' + site + '/page');

  readFiles(site, basedir, filePath, callback);
}

function readFiles(site, basedir, filePath, callback) {
  var opts = {
    match: /.jade$/
  };

  dir.readFiles(filePath, opts, handleFile, respond);

  function handleFile(err, content, filename, next) {
    if (err) {
      console.log(err);
    }

    console.log('filename', filename);
    console.log('content', content);

    compileTemplate(content, site, basedir, filename, next);
  }

  function respond(err, files) {
    console.log('files', files);

    callback(err);
  }
}

function compileTemplate(content, site, basedir, filename, callback) {
  var jadeOpts = {
    basedir:  basedir,
    filename: filename,
    pretty:   true
  };

  var html = jade.compile(content, jadeOpts)(jadeLocals(site));

  console.log('html', html);

  callback(null, html);
}

function jadeLocals(site) {
  return {
    settings:    settings,
    i18n:        i18n(site),
    viewHelper:  viewHelper,
    currentYear: (new Date()).getFullYear(),
    headline:    'TODO',
    meta:        {}
  };
}

/**
 * Exports.
 */

module.exports = renderStaticSite;
