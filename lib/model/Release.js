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

var snakify  = require('../../lib/util/snakify');

/**
 * Constants.
 */

var TYPES = [
  'Album',
  'Song',
  'Compilation',
  'DJ Mix'
];

/**
 * Schema.
 */

var schema = new Schema({
  type: {
    type:     String,
    required: true
  },

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

  url: {
    type:     String,
    trim:     true
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
 * Validation.
 */

/**
 * Hooks.
 */

schema.pre('save', function (next) {
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

    release.addTag(tag);

    next();
  }
});

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
  /*
    This method doesn't save the instance, it just adds a tag if it
    doesn't exist already and leaves it up to the caller to save.
  */
  addTag: function (tag) {
    var release = this;

    release.tags.push(tag.id);

    release.tags = _.uniq(release.tags);
  },

  artworkAltText: function () {
    var release = this;

    return [release.artist, release.displayTitle()].join(': ');
  },

  artworkUrl: function () {
    var release  = this;
    var folder   = snakify(release.type);
    var filename = snakify([release.artist, release.title].join(' '));

    return '/image/post/' + folder + '/' + filename + '.jpg';
  },

  displayTitle: function () {
    var release = this;

    if (release.isSong()) {
      return wrapInSmartQuotes(release.title);
    }

    return release.title;
  },

  isSong: function () {
    var release = this;

    return release.type === 'Song';
  }
});

/**
 * Local functions.
 */

function wrapInSmartQuotes(songTitle) {
  return ['&ldquo;', songTitle, '&rdquo;'].join('');
}

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Release', schema);
