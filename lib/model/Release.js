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
  }
});

/**
 * Plugins.
 */

var postableOpts = {
  allowedTypes:     TYPES,
  titleSlugFields:  ['artist', 'title', 'version'],
  altTextFields:    ['artist', 'displayTitle']
};

schema.plugin(metaData);
schema.plugin(postable, postableOpts);

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
    type: 'artist',
    name: release.artist
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
