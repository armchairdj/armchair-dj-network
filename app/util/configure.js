/**
 * External dependencies.
 */

var extend      = require('extend');

/**
 * Internal dependencies.
 */

var environment = require('../../app/util/environment');

/**
 * Methods.
 */

function configure(env, base, opts) {
  env  = env  || environment();
  base = base || require('../../app/config/environment/base');
  opts = opts || require('../../app/config/environment/' + env);

  return extend(true, {}, base, opts);
}

/**
 * Exports.
 */

module.exports = configure;
