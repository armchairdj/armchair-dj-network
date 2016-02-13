/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * Internal dependencies.
 */

var metaData = require('../../lib/model/plugin/metaData')

/**
 * Schema.
 */

var schema = new Schema({
  name: {
    type:     String,
    trim:     true,
    required: true
  }
});

/**
 * Plugins.
 */

schema.plugin(metaData);

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('User', schema);
