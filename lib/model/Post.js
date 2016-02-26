/**
 * External dependencies.
 */

var _         = require('underscore');
var _s        = require('underscore.string');
var extend    = require('extend');
var marked    = require('marked');
var striptags = require('striptags');

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var metaData  = require('../../lib/model/plugin/metaData')

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

  tags: [{
    type: ObjectId,
    ref:  'Tag'
  }]
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
  artworkAltText: function () {
    var post = this;

    return post.subject().artworkAltText();
  },

  artworkUrl: function () {
    var post = this;

    return post.subject().artworkUrl();
  },

  publishedDate: function () {
    var post = this;

    if (post.publishedAt) {
      return ' on ' + moment(post.publishedAt).format(config.format.date);
    }
  },

  renderedContent: function () {
    var post = this;

    return marked(post.content);
  },

  renderedPreview: function (post) {
    var post     = this;
    var stripped = striptags(post.renderedContent());

    return _s.prune(stripped, 200);
  },

  subject: function () {
    return this.release || this.playlist || null;
  },

  type: function() {
    var post = this;

    if (post.release) {
      return 'release';
    }

    if (post.playlist) {
      return 'playlist';
    }

    console.log('Post %s does not have a valid release OR playlist', post.id);
  }
};

/**
 * Local functions.
 */

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Post', schema);
