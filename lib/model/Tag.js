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

var metaData = require('../../lib/model/plugin/metaData');

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
  name: {
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
      var names = _s(commaSeparatedNames).clean().replace(/\s*,\s*/g, ',').split(',');

      async.map(_.uniq(names), createOrUpdateTag, handleBatch);
    }

    function createOrUpdateTag(name, next) {
      Tag.createOrUpdate({
        type: type,
        name: name
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

    createTag();

    function createTag() {
      var query = {
        name: params.name,
        type: params.type
      };

      var opts = {
        upsert:              true,
        new:                 true,
        setDefaultsOnInsert: true,
        runValidators:       true
      };

      Tag.findOneAndUpdate(query, params, opts, handleTag);
    }

    function handleTag(err, tag) {
      callback(err, tag);
    }
  }
});

/**
 * Methods.
 */

extend(schema.methods, {
  displayName: function () {
    return this.name.toLowerCase().replace(/\s+/g, '-');
  }
});

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Tag', schema);
