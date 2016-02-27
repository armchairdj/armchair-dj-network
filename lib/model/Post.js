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

var POPULATE_ALL = 'author playlist playlist.tags release release.tags';

var QUERY_OPTS = {
  published: {
    limit: settings.pagination.perPage,
    sort:  {
      publishedAt: -1
    }
  },
  draft: {
    limit: settings.pagination.perPage,
    sort:  {
      createdAt: -1
    }
  },
  all: {
    limit: settings.pagination.perPage,
    sort:  {
      publishedAt: -1,
      createdAt:   -1
    }
  }
};

/**
 * Schema.
 */

var schema = new Schema({
  author: {
    type:     ObjectId,
    ref:      'User',
    required: true
  },

  slug: {
    type: String,
    trim: true
  }

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
  byId: function (id, queryType, callback) {
    var Post  = this;
    var query = wrangleQuery({ _id: id }, queryType);

    Post.findOne(query).deepPopulate(POPULATE_ALL).exec(callback);
  },

  bySlug: function (slug, callback) {
    var Post  = this;
    var query = wrangleQuery({ slug: slug }, 'published');

    Post.findOne(query).deepPopulate(POPULATE_ALL).exec(callback);
  },

  byTag: function (tagId, callback) {
    
    
  },

  byType: function (criteria, queryType, callback) {
    var Post      = this;
    var query     = wrangleQuery(criteria, queryType);
    var queryOpts = wrangleQueryOpts(queryType);

    Post.find(query, null, queryOpts).deepPopulate(POPULATE_ALL).exec(callback);
  },

  createWithRelease: function (params, callback) {


  },

  createWithPlaylist: function (params, callback) {


  }
});

/**
 * Local functions: Queries.
 */

function wrangleQuery(criteria, queryType) {
  var query = criteria || {};

  if (queryType === 'published') {
    query.publishedAt = { $exists: true };
  }

  return query;
}

function wrangleQueryOpts(queryType) {
  return QUERY_OPTS[queryType];
}

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
