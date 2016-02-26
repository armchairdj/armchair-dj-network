/**
 * External dependencies.
 */

var _                     = require('underscore');
var extend                = require('extend');
var passportLocalMongoose = require('passport-local-mongoose');

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var ObjectId              = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var metaData = require('../../lib/model/plugin/metaData');

/**
 * Constants.
 */

var TYPES = [
  'admin',
  'author',
  'reader'
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

  role: {
    type:     String,
    default:  'reader'
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
 * Methods.
 */

schema.methods = {
  isAdmin: function () {
    return this.role === 'admin';
  }
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
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('User', schema);
