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
var Schema       = mongoose.Schema;
var ObjectId     = Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

/**
 * Internal dependencies.
 */

var settings     = require('../../lib/config/settings');

var metaData     = require('../../lib/model/plugin/metaData')

/**
 * Constants.
 */

var POPULATE_MULTI  = 'author playlist playlist.series release';
var POPULATE_SINGLE = 'author playlist playlist.tags playlist.tracks playlist.series release release.tags';

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

  path: {
    type: String,
    trim: true
  },

  slug: {
    type: String,
    trim: true
  },

  image: {
    type: String,
    trim: true
  },

  altText: {
    type: String,
    trim: true
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
  byId: function (id, queryType, callback) {
    var Post  = this;
    var query = wrangleQuery({ _id: id }, queryType);

    Post.findOne(query).deepPopulate(POPULATE_SINGLE).exec(callback);
  },

  bySlug: function (params, callback) {
    var Post  = this;
    var query = wrangleQuery(params, 'published');

    Post.findOne(query).deepPopulate(POPULATE_SINGLE).exec(callback);
  },

  byTag: function (tagId, callback) {
    var Playlist = mongoose.model('Playlist');
    var Release  = mongoose.model('Release');
    var Post     = this;
    var playlistIds;
    var releaseIds;
    var posts;

    findSubjects();

    function findSubjects() {
      async.parallel({
        playlists: findPlaylists,
        releases:  findReleases
      }, handleSubjects);
    }

    function findPlaylists(next) {
      Playlist.find({ tags: { $include: tagId }});
    }

    function findReleases(next) {
      Release.find( { tags: { $include: tagId }});
    }

    function handleSubjects(err, results) {
      if (err) {
        return respond(err);
      }

      playlistIds = _.pluck(results.playlists, '_id');
      releaseIds  = _.pluck(results.releases,  '_id');

      findPosts();
    }

    function findPosts() {
      var criteria = {
        $or: {
          playlist: { $in: playlistIds },
          release:  { $in: releaseIds  }
        }
      };

      Post.byCriteria(criteria, 'published', handlePosts);
    }

    function handlePosts(err, results) {
      if (err) {
        return respond(err);
      }

      posts = results;

      respond();
    }

    function respond(err) {
      callback(err, posts);
    }
  },

  byCriteria: function (criteria, queryType, callback) {
    var Post      = this;
    var query     = wrangleQuery(criteria, queryType);
    var queryOpts = wrangleQueryOpts(queryType);

    Post.find(query, null, queryOpts).deepPopulate(POPULATE_MULTI).exec(callback);
  },

  createWithRelease: function (params, callback) {


  },

  updateWithRelease: function (params, callback) {


  },

  createWithPlaylist: function (params, callback) {


  },

  updateWithPlaylist: function (params, callback) {


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
  publish: function (params, callback) {
    var subject = this.subject();

    this.image   = params.image   || subject.generateImageUrl();
    this.altText = params.altText || subject.generateAltText();
    this.path    = params.path    || subject.generateTypeSlug();
    this.slug    = params.slug    || subject.generateTitleSlug();

    if (!this.publishedAt || params.republish) {
      this.publishedAt = new Date();
    }

    this.save(callback);
  },

  publishedDateString: function () {
    if (this.publishedAt) {
      return ' on ' + moment(this.publishedAt).format(settings.format.date);
    }
  },

  renderedContent: function () {
    return marked(this.content);
  },

  renderedPreview: function () {
    var stripped = striptags(this.renderedContent());

    return _s.prune(stripped, 100);
  },

  subject: function () {
    return this.release || this.playlist || null;
  },

  tagList: function () {
    var subject = this.subject();
    var tags    = subject.tags || [];

    return _.map(tags, getDisplayName);

    function getDisplayName(tag) {
      return tag.displayName();
    }
  },

  type: function() {
    if (this.release) {
      return 'release';
    }

    if (this.playlist) {
      return 'playlist';
    }

    console.log('Post %s does not have a valid release OR playlist', this.id);
  }
});

/**
 * Local functions.
 */

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Post', schema);
