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
    render.page(req, res, 'page/static/about', {
      pageDescription: 'About this site.'
    });
  }
}

function homepage(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'page/static/homepage', {
      isHomepage:       true,
      pageDescription: 'A monologue about music, with occasional mixtapes.'
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
