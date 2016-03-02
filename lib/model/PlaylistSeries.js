/**
 * External dependencies.
 */

var _          = require('underscore');
var extend     = require('extend');

var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var ObjectId   = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var postable   = require('../../lib/model/plugin/postable');
var sluggable  = require('../../lib/model/plugin/sluggable');
var updateable = require('../../lib/model/plugin/updateable');

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

var sluggableOpts = {
  generateOnEvents: ['save'],
  includeImages:    false
};

schema.plugin(postable, postableOpts);
schema.plugin(sluggable, sluggableOpts);
schema.plugin(updateable);

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
