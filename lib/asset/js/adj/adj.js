/**
 * External dependencies.
 */

var $ = require('jquery');

/**
 * Internal dependencies.
 */

var behaviorize = require('../../../../lib/asset/js/adj/util/behaviorize');

/**
 * Methods.
 */

function bootstrap() {
  behaviorize();
}

/**
 * Exports.
 */

module.exports = global.adj = (function () {

  $(document).ready(bootstrap);

  return {
    behaviorize: behaviorize
  };

})();
