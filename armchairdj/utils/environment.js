/**
 * External dependencies.
 */

var _ = require('underscore');

/**
 * Internal dependencies.
 */

/**
 * Methods.
 */

function env() {
  return processEnv() || 'development';
}

function is() {
  return _.contains(_.toArray(arguments), env());
}

env.is = is;

/**
 * Helper functions.
 */

function processEnv() {
  return process.env['NODE_ENV'];
}

/**
 * Exports.
 */

module.exports = env;
