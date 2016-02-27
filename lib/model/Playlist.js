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

var slugify  = require('../../lib/util/slugify');

/**
 * Constants.
 */

/**
 * Schema.
 */

var schema = new Schema({
  title: {
    type:     String,
    required: true,
    trim:     true
  },

  tracks: {
    type: [ObjectId],
    ref:  'Release'
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

/**
 * Statics.
 */

extend(schema.statics, {

});

/**
 * Methods.
 */

extend(schema.methods, {
  artworkAltText: function () {
    var playlist = this;

    return playlist.title;
  },

  artworkUrl: function () {
    var playlist = this;
    var folder   = 'playlist';
    var filename = slugify(playlist.title);

    return '/image/post/' + folder + '/' + filename + '.jpg';
  },
});

/**
 * Local functions.
 */

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Playlist', schema);
