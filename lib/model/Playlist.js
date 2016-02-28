/**
 * External dependencies.
 */

var _        = require('underscore');
var _s       = require('underscore.string');
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

var POPULATE_ALL = 'series tracks tracks.tags';

/**
 * Schema.
 */

var schema = new Schema({
  series: {
    type: ObjectId,
    ref:  'PlaylistSeries'
  },

  seriesIndex: {
    type: Number
  },

  title: {
    type:     String,
    required: true,
    trim:     true
  },

  tracks: [{
    type: ObjectId,
    ref:  'Release'
  }]
});

/**
 * Plugins.
 */

var postableOpts = {
  allowedTypes:     ['Playlist'],
  titleSlugFields:  ['displayPrefix', 'title'],
  altTextFields:    ['displayPrefix', 'title']
};

schema.plugin(metaData);
schema.plugin(postable, postableOpts);

/**
 * Validation.
 */

/**
 * Hooks.
 */

schema.pre('save', buildTagSuperset);

function buildTagSuperset(next) {
  var playlist = this;

  populate();

  function populate() {
    playlist.populate('series tracks', handlePopulate);
  }

  function handlePopulate(err) {
    if (err) {
      return next(err);
    }

    ensureSeriesTag();
  }

  function ensureSeriesTag() {
    var Tag     = mongoose.model('Tag');
    var params  = {
      type: 'playlist series',
      name: playlist.series.title
    };

    Tag.createOrUpdate(params, handleSeriesTag);
  }

  function handleSeriesTag(err, seriesTag) {
    if (err) {
      return next(err);
    }

    playlist.tags = combineTagsUniquely(playlist.tracks, seriesTag);

    next();
  }

  function combineTagsUniquely(tracks, seriesTag) {
    return _.chain(tracks)
      .reduce(mergeTagIds, [seriesTag._id])
      .flatten()
      .compact()
      .uniq()
      .value()
    ;

    function mergeTagIds(memo, track, trackIndex) {
      memo.push(track.tags);

      return memo;
    }
  }
}

/**
 * Statics.
 */

extend(schema.statics, {

});

/**
 * Methods.
 */

extend(schema.methods, {
  paddedSeriesIndex: function () {
    if (this.seriesIndex) {
      return _s.pad(this.seriesIndex.toString(), 2, '0');
    }
  },

  displayPrefix: function () {
    return _.compact([this.series.title, this.paddedSeriesIndex()]).join(' ');
  }
});

/**
 * Local functions.
 */

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Playlist', schema);
