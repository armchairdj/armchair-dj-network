/**
 * External dependencies.
 */

var _                     = require('underscore');
var extend                = require('extend');
var passportLocalMongoose = require('passport-local-mongoose');
var uniqueValidator       = require('mongoose-unique-validator');

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
    type:                  String,
    trim:                  true,
    required:              true,
    unique:                true,
    uniqueCaseInsensitive: true
  }
});

/**
 * Plugins.
 */

var passportLocalOpts = {
  saltlen:             64,
  digestAlgorithm:     'sha512',
  usernameField:       'email',
  usernameUnique:      true,
  saltField:           'passwordSalt',
  hashField:           'passwordHash',
  attemptsField:       'loginFailures',
  // passwordValidator: function () {},
  usernameQueryFields: ['email']
};

var uniqueValidatorOpts = {
  message: 'Please provide a unique value for {PATH}.'
};

schema.plugin(metaData);
schema.plugin(passportLocalMongoose, passportLocalOpts);
schema.plugin(uniqueValidator, uniqueValidatorOpts);

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
  canCreate: function () {
    var user = this;

    return user.isAdmin() || user.isAuthor();
  },

  isAdmin: function () {
    var user = this;

    return user.role === 'admin';
  },

  isAuthor: function () {
    var user = this;

    return this.role === 'author';
  },

  isReader: function () {
    var user = this;

    return this.role === 'reader';
  }
});

/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('User', schema);
