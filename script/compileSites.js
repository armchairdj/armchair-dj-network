/**
 * External dependencies.
 */

var _ = require('underscore');

/**
 * Internal dependencies.
 */

var renderStaticSite = require('../lib/util/renderStaticSite');

/**
 * Execute.
 */

compileSites();

/**
 * Methods.
 */

function compileSites() {
  renderStaticSite('askauiguy', finish);
}

function finish(err) {
  if (err) {
    console.log(err);

    process.exit(1);
  }

  console.log('Done!');

  process.exit(0);
}
