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

var metaData              = require('../../lib/model/plugin/metaData')

/**
 * Schema.
 */

var schema = new Schema({
  author: {
    type:     ObjectId,
    required: true
  },

  publishedAt: {
    type: Date
  },

  release: {
    type: ObjectId
  },

  mix: {
    type: ObjectId
  },

  content: {
    type: String,
    trim: true
  },

  tags: {
    type: [ObjectId]
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

module.exports = require('../../lib/model/util/findOrCreate')('Post', schema);
