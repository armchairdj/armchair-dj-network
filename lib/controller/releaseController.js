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

function releases(req, res) {
  render.page(req, res, 'page/release/releases');
}

function release(req, res) {
  render.page(req, res, 'page/release/release');
}

/**
 * Exports.
 */

module.exports = {
  releases: releases,
  release:  release
};
