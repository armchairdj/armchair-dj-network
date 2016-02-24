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

/**
 * Schema.
 */

var schema = new Schema({
  title: {
    type:     String,
    required: true,
    trim:     true
  },

  tracks: {
    type: [ObjectId],
    ref:  'Release'
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

module.exports = require('../../lib/model/util/findOrCreate')('Playlist', schema);
