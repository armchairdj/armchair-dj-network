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

var config      = require('../lib/util/configure')();
var mongoUri    = config.mongo.uri;
var db          = require('monk')(mongoUri);

/**
 * Steps
 */

var fns = {
  users:    function (next) {
    
  },

  releases: function (next) {
    
  },

  mixes:    function (next) {
    
  },

  tags:     function (next) {
    
  },

  posts:    function (next) {
    
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
