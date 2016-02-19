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
  var Release = mongoose.model('Release');
  var releases;

  findLatest();

  function findLatest() {
    var criteria = {};
    var fields   = null;
    var options  = { sort: { 'createdAt': -1 }, limit: 10 };

    Release.find(criteria, fields, options, handleFind);
  }

  function handleFind(err, results) {
    if (err) {
      console.log(err);
    }

    releases = results;

    respond();
  }

  function respond() {
    render.page(req, res, 'page/release/releases', {
      releases: releases
    });
  }
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
