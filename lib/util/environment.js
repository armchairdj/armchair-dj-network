/******************************************************************************
Syntactic sugar for figuring out which NODE_ENV we're running in.

Examples:

    $ env()
    # 'development'
    $ NODE_ENV = 'production'
    $ env()
    # 'production'
    $ env.is('development')
    # false
    $ env.is('development', 'production')
    # true
******************************************************************************/

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
 * Local functions.
 */

function processEnv() {
  return process.env['NODE_ENV'];
}

/**
 * Exports.
 */

module.exports = env;
