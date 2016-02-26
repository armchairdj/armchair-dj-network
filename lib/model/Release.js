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
};

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
