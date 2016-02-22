/**
 * External dependencies.
 */

var _                     = require('underscore');
var extend                = require('extend');
var passportLocalMongoose = require('passport-local-mongoose');

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var ObjectId              = Schema.ObjectId;

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
  },

  username: {
    type:     String,
    trim:     true,
    required: true
  }
});

/**
 * Statics.
 */

schema.statics = {

};

/**
 * Plugins.
 */

var passportLocalOpts = {
  saltlen:             64,
  digestAlgorithm:     'sha512',
  usernameField:       'email',
  saltField:           'passwordSalt',
  hashField:           'passwordHash',
  attemptsField:       'loginFailures',
  // passwordValidator: function () {},
  usernameQueryFields: ['email']
};

schema.plugin(metaData);
schema.plugin(passportLocalMongoose, passportLocalOpts);

/**
 * Methods.
 */


/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('User', schema);
