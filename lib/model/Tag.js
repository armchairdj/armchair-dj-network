/**
 * External dependencies.
 */

var _                     = require('underscore');
var extend                = require('extend');
var passportLocalMongoose = require('passport-local-mongoose');

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var ObjectId              = Schema.ObjectId;

/**
 * Internal dependencies.
 */

var metaData = require('../../lib/model/plugin/metaData')

/**
 * Constants.
 */

var TYPES = [
  'artist',
  'genre',
  'mood'
];

/**
 * Schema.
 */

var schema = new Schema({
  name: {
    type:     String,
    trim:     true,
    required: true
  },
  type: {
    type:     String,
    required: true
  }
});

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
 * Plugins.
 */

schema.plugin(metaData);

/**
 * Methods.
 */


/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Tag', schema);
