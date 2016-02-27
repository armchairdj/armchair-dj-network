/**
 * External dependencies.
 */

var _            = require('underscore');
var _s           = require('underscore.string');
var extend       = require('extend');
var marked       = require('marked');
var moment       = require('moment');
var striptags    = require('striptags');

var mongoose     = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema       = mongoose.Schema;
var ObjectId     = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var settings     = require('../../lib/config/settings');

var metaData     = require('../../lib/model/plugin/metaData')

/**
 * Constants.
 */

var DISPLAY_POPULATE_PATHS = 'author playlist playlist.tags release release.tags';

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
  }
});

/**
 * Plugins.
 */

schema.plugin(metaData);
schema.plugin(deepPopulate, {});


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
  createWithRelease: function () {
    
  },

  createWithPlaylist: function () {
    
  },

  displayOne: function (id, callback) {
    var Post = this;

    Post.findOne({
      _id:         id,
      publishedAt: { $exists: true }
    }).deepPopulate(DISPLAY_POPULATE_PATHS).exec(callback);
  },


  displayMany: function (query, opts, callback) {
    var Post = this;

    query.publishedAt = { $exists: true };

    Post.find(query, null, opts).deepPopulate(DISPLAY_POPULATE_PATHS).exec(callback);
  }
});

/**
 * Methods.
 */

extend(schema.methods, {
  artworkAltText: function () {
    var post = this;

    return post.subject().artworkAltText();
  },

  artworkUrl: function () {
    var post = this;

    return post.subject().artworkUrl();
  },

  publishedDateString: function () {
    var post = this;

    if (post.publishedAt) {
      return ' on ' + moment(post.publishedAt).format(settings.format.date);
    }
  },

  renderedContent: function () {
    var post = this;

    return marked(post.content);
  },

  renderedPreview: function (post) {
    var post     = this;
    var stripped = striptags(post.renderedContent());

    return _s.prune(stripped, 100);
  },

  subject: function () {
    return this.release || this.playlist || null;
  },

  tagList: function () {
    var post    = this;
    var subject = this.subject();
    var tags    = subject.tags || [];

    return _.map(tags, getDisplayName);

    function getDisplayName(tag) {
      return tag.displayName();
    }
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
});

/**
 * Local functions.
 */

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Post', schema);
