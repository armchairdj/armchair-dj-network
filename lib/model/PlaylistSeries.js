/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var metaData = require('../../lib/model/plugin/metaData');
var postable = require('../../lib/model/plugin/postable');

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

  description: {
    type: String,
    trim: true
  }
});

/**
 * Plugins.
 */

var postableOpts = {
  allowedTypes: ['Playlist Series']
};

schema.plugin(metaData);
schema.plugin(postable, postableOpts);

/**
 * Validation.
 */

/**
 * Hooks.
 */

/**
 * Statics.
 */

extend(schema.statics, {

});

/**
 * Methods.
 */

extend(schema.methods, {

});

/**
 * Local functions.
 */

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('PlaylistSeries', schema);
