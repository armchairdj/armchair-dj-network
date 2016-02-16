/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');
var crypto   = require('crypto');
var CryptoJS = require("crypto-js");

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
  },

  username: {
    type:     String,
    trim:     true,
    required: true
  },

  email: {
    type:     String,
    trim:     true,
    required: true
  },

  password: {
    type:     String,
    required: true
  },

  salt: {
    type:     String,
    required: true
  }
});

/**
 * Plugins.
 */

schema.plugin(metaData);

/**
 * Statics.
 */

schema.statics = {
  hashPassword: function (password, salt) {
    return CryptoJS.SHA512(password + salt).toString(CryptoJS.enc.Hex);
  },

  salt: function(callback) {
    crypto.randomBytes(256, respond);

    function respond(err, buf) {
      if (err) {
        return callback(err);
      }

      callback(undefined, buf.toString('hex'));
    }
  },

  login: function (email, password, callback) {
    var User = this;
    var salt;
    var authenticatedUser;

    findSalt();

    function findSalt() {
      var criteria = {
        email: email
      };

      User.findOne(criteria, handleSalt);
    }

    function handleSalt(err, result) {
      if (err || !result || !result.salt) {
        return fail(err || new Error('Authentication failed.'));
      }

      salt = result.salt;

      findAuthenticatedUser();
    }

    function findAuthenticatedUser() {
      var criteria = {
        email:    email,
        password: User.hashPassword(password, salt)
      };

      User.findOne(criteria, handleAuthenticatedUser);
    }

    function handleAuthenticatedUser(err, result) {
      if (err || !result) {
        return fail(err || new Error('Authentication failed.'));
      }

      authenticatedUser = result;

      respond();
    }

    function respond() {
      callback(undefined, authenticatedUser);
    }

    function fail(err) {
      callback(err);
    }
  },

  register: function (params, callback) {
    var User = this;
    var user;

    generateSalt();

    function generateSalt() {
      User.salt(handleSalt);
    }

    function handleSalt(err, result) {
      if (err) {
        return fail(err);
      }

      params.salt     = result;
      params.password = User.hashPassword(params.password, params.salt);

      createUser();
    }

    function createUser() {
      User.create(params, handleUser);
    }

    function handleUser(err, result) {
      if (err) {
        return fail(err);
      }

      user = result;

      respond();
    }

    function respond() {
      callback(undefined, user);
    }

    function fail(err) {
      callback(err);
    }
  }
};

/**
 * Methods.
 */


/**
 * Exports.
 */

module.exports = require('../../lib/model/util/findOrCreate')('User', schema);
