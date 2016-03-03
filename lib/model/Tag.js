/******************************************************************************
[DESCRIPTION]
******************************************************************************/

/**
 * External dependencies.
 */

var _        = require('underscore');
var _s       = require('underscore.string');
var async    = require('async');
var extend   = require('extend');

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var sluggable  = require('../../lib/model/plugin/sluggable');
var updateable = require('../../lib/model/plugin/updateable');

/**
 * Constants.
 */

var TYPES = [
  'artist',
  'genre',
  'mood',
  'keyword',
  'playlist series'
];

/**
 * Schema.
 */

var schema = new Schema({
  title: {
    type:     String,
    trim:     true,
    required: true
  },

  type: {
    type:     String,
    required: true
  }
});

/**
 * Plugins.
 */

var sluggableOpts = {
  includeImages: false
};

schema.plugin(sluggable, sluggableOpts);
schema.plugin(updateable);

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
  /* Create one batch of tags for each tag type. */
  createBatches: function (params, callback, options) {
    var Tag = this;
    var tags;

    async.map(TYPES, createBatch, handleBatches);

    function createBatch(type, next) {
      var commaSeparatedNames = params[type];

      if (!commaSeparatedNames) {
        return next();
      }

      Tag.createBatch(type, commaSeparatedNames, next, options);
    }

    function handleBatches(err, results) {
      if (err) {
        return respond(err);
      }

      tags = _.chain(results).flatten().compact().value();

      respond();
    }

    function respond(err) {
      callback(err, tags);
    }
  },

  /* Create one batch of tags for a single tag type. */
  createBatch: function (type, commaSeparatedNames, callback, options) {
    var Tag    = this;
    var opts   = options || {};
    var idOnly = !!opts.idOnly;
    var tags;

    createOrUpdateBatch();

    function createOrUpdateBatch() {
      var titles = _s(commaSeparatedNames).clean().replace(/\s*,\s*/g, ',').split(',');

      async.map(_.uniq(titles), createOrUpdateTag, handleBatch);
    }

    function createOrUpdateTag(title, next) {
      Tag.createOrUpdate({
        type:  type,
        title: title
      }, next);
    }

    function handleBatch(err, results) {
      if (err) {
        return respond(err);
      }

      tags = results || [];

      if (idOnly) {
        tags = _.pluck(tags || [], '_id');
      }

      respond();
    }

    function respond(err) {
      callback(err, tags);
    }
  },

  createOrUpdate: function (params, callback) {
    var Tag = this;
    var tag;

    guaranteeTag();

    function guaranteeTag() {
      var query = {
        title: params.title,
        type:  params.type
      };

      var opts = {
        upsert:              true,
        new:                 true,
        setDefaultsOnInsert: true,
        runValidators:       true
      };

      Tag.findOneAndUpdate(query, params, opts, handleTag);
    }

    function handleTag(err, result) {
      tag = result;

      if (err) {
        return respond(err);
      }

      if (result.slug) {
        return respond();
      }

      setSlugs();
    }

    function setSlugs() {
      tag.setSlugs();

      tag.save(respond);
    }

    function respond(err) {
      callback(err, tag);
    }
  }
});

/**
 * Methods.
 */

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Tag', schema);
