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

/**
 * Schema.
 */

var schema = new Schema({
  title: {
    type:     String,
    required: true,
    trim:     true
  },

  description: {
    type: String,
    trim: true
  }
});

/**
 * Plugins.
 */

var postableOpts = {
  allowedTypes: ['Playlist Series']
};

schema.plugin(metaData);
schema.plugin(postable, postableOpts);

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
  ensureTag: function (callback) {
    var Tag    = mongoose.model('Tag');
    var tag;
    var series = this;
    var params  = {
      type: 'playlist series',
      name: series.title
    };

    ensureTag();

    function ensureTag() {
      Tag.createOrUpdate(params, handleTag);
    }

    function handleTag(err, result) {
      if (err) {
        return resond(err);
      }

      tag = result;

      respond();
    }

    function respond(err) {
      callback(err, tag);
    }
  }
});

/**
 * Local functions.
 */

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('PlaylistSeries', schema);
