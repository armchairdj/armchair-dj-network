/*
  Stuff some basic data into mongo locally for testing/development.
*/

/**
 * External dependencies.
 */

var _            = require('underscore');
var async        = require('async');
var extend       = require('extend');
var mongoose     = require('mongoose');

/**
 * Internal dependencies.
 */

var config      = require('../../lib/util/configure')();
var mongoUri    = config.mongo.uri;
var db          = require('monk')(mongoUri);
var data        = require('../../script/db/seedData.js');

/**
 * Steps
 */

var fns = {
  users:    function (next) {
    console.log('users', data.users);
    next();
  },

  releases: function (next) {
    console.log('releases', data.releases);
    next();
  },

  mixes:    function (next) {
    console.log('mixes', data.mixes);
    next();
  },

  tags:     function (next) {
    console.log('tags', data.tags);
    next();
  },

  posts:    function (next) {
    console.log('posts', data.posts);
    next();
  }
};

/**
 * Run.
 */

bootstrapDatabase();

function bootstrapDatabase() {
  async.series(fns, finish);
}

function finish(err) {
  if (err) {
    console.log(err);

    process.exit(1);
  }

  console.log('Done!');

  process.exit(0);
}
