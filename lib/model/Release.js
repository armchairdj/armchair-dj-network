/**
 * External dependencies.
 */

var _                     = require('underscore');
var extend                = require('extend');
var passportLocalMongoose = require('passport-local-mongoose');

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var ObjectId              = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var metaData = require('../../lib/model/plugin/metaData')

/**
 * Constants.
 */

var TYPES = [
  'Album',
  'Song',
  'Compilation',
  'DJ Mix'
];

/**
 * Schema.
 */

var schema = new Schema({
  type: {
    type:     String,
    required: true
  },

  artist: {
    type:     String,
    trim:     true,
    required: true
  },

  title: {
    type:     String,
    trim:     true,
    required: true
  },

  version: {
    type:     String,
    trim:     true
  },

  year: {
    type:     String,
    trim:     true,
    required: true
  },

  url: {
    type:     String,
    trim:     true
  }
});

/**
 * Plugins.
 */

schema.plugin(metaData);

/**
 * Statics.
 */

schema.statics = {

};

/**
 * Methods.
 */

schema.methods = {

};

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Release', schema);
