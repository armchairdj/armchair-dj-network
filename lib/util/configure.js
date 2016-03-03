/******************************************************************************
[DESCRIPTION]
******************************************************************************/

/**
 * External dependencies.
 */

var extend      = require('extend');

/**
 * Internal dependencies.
 */

var environment = require('../../lib/util/environment');

/**
 * Methods.
 */

function configure(env, base, opts) {
  env  = env  || environment();
  base = base || require('../../lib/config/settings/base');
  opts = opts || require('../../lib/config/settings/' + env);

  return extend(true, {}, base, opts);
}

/**
 * Exports.
 */

module.exports = configure;
