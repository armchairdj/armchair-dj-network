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

  playlist: {
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
  type: function() {
    var post = this;

    if (post.release) {
      return 'release';
    }

    if (post.playlist) {
      return 'playlist';
    }
  }
};

/**
 * Helper functions.
 */



/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Post', schema);
