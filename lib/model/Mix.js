/**
 * External dependencies.
 */

var _                     = require('underscore');
var extend                = require('extend');
var passportLocalMongoose = require('passport-local-mongoose');

var mongoose              = require('mongoose');

/**
 * Internal dependencies.
 */

var metaData = require('../../lib/model/plugin/metaData')

/**
 * Schema.
 */

var schema = new mongoose.Schema({
});

/**
 * Statics.
 */

schema.statics = {

};

/**
 * Methods.
 */

schema.methods = {

};

/**
 * Plugins.
 */

schema.plugin(metaData);

/**
 * Methods.
 */


/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('Mix', schema);
