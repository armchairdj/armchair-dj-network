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

var metaData              = require('../../lib/model/plugin/metaData')

/**
 * Constants.
 */

/**
 * Schema.
 */

var schema = new Schema({
  author: {
    type:     ObjectId,
    ref:      'User',
    required: true
  },

  publishedAt: {
    type: Date
  },

  release: {
    type: ObjectId,
    ref:  'Release'
  },

  playlist: {
    type: ObjectId,
    ref:  'Playlist'
  },

  content: {
    type: String,
    trim: true
  },

  tags: {
    type: [ObjectId],
    ref:  'Tag'
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
