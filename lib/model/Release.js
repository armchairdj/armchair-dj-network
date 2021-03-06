/******************************************************************************
Release model for storing a taxonomy of musical works.
******************************************************************************/

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

var i18n       = require('../../lib/config/i18n');

var postable   = require('../../lib/model/plugin/postable');
var sluggable  = require('../../lib/model/plugin/sluggable');
var updateable = require('../../lib/model/plugin/updateable');

/**
 * Constants.
 */

var TYPES = [
  'Album',
  'Track',
  'Compilation',
  'DJ Mix'
];

/**
 * Schema.
 */

var schema = new Schema({
  artist: {
    type:     String,
    trim:     true,
    required: true
  },

  title: {
    type:     String,
    trim:     true,
    required: true
  },

  version: {
    type:     String,
    trim:     true
  },

  year: {
    type:     String,
    trim:     true,
    required: true
  },

  label: {
    type:     String,
    trim:     true
  }
});

/**
 * Plugins.
 */

var postableOpts = {
  allowedTypes: TYPES
};

var sluggableOpts = {
  slugFields:     ['artist', 'title', 'version'],
  altTextFields:  ['artist', 'displayTitle']
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

schema.pre('save', ensureTagForArtist);

function ensureTagForArtist(next) {
  var Tag     = mongoose.model('Tag');
  var release = this;
  var params  = {
    type: 'Artist',
    title: release.artist
  };

  ensureTag();

  function ensureTag() {
    Tag.createOrUpdate(params, handleTag);
  }

  function handleTag(err, tag) {
    if (err) {
      return next(err);
    }

    release.ensureTag(tag);

    next();
  }
}

/**
 * Statics.
 */

extend(schema.statics, {
  createWithTags: function (params, callback) {
    var Tag     = mongoose.model('Tag');
    var Release = this;
    var release;

    createTags();

    function createTags() {
      Tag.createBatches(params.tags, handleTags, { idOnly: true} );
    }

    function handleTags(err, tags) {
      if (err) {
        return respond(err);
      }

      params.tags = tags;

      createRelease();
    }

    function createRelease() {
      Release.create(params, handleRelease);
    }

    function handleRelease(err, result) {
      if (err) {
        return respond(err);
      }

      release = result;

      respond();
    }

    function respond(err) {
      callback(err, release);
    }
  }
});

/**
 * Methods.
 */

extend(schema.methods, {
  htmlTitle: function () {
    return i18n('headline.post.playlist', this.artist, this.displayTitle());
  },

  metaDescription: function () {
    return i18n('meta.post.release', this.type, this.displayTitle(), this.artist);
  },

  displayTitle: function () {
    if (this.isTrack()) {
      return wrapInSmartQuotes(this.versionedTitle());
    }

    return this.title;
  },

  versionedTitle: function () {
    var tokens = [this.title, this.version];

    return _.compact(tokens).join(' - ');
  },

  isTrack: function () {
    return this.type === 'Track';
  }
});

/**
 * Local functions.
 */

function wrapInSmartQuotes(trackTitle) {
  return ['&ldquo;', trackTitle, '&rdquo;'].join('');
}

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Release', schema);
