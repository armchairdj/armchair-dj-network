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

function about(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'page/site/about', {
      pageDescription: 'A personal music site.'
    });
  }
}

function homepage(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'page/site/homepage', {
      pageDescription: 'A personal music site.'
    });
  }
}

/**
 * Exports.
 */

module.exports = {
  about:    about,
  homepage: homepage
};
