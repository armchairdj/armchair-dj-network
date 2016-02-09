/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var siteController = require('../../app/controller/siteController');

/**
 * Router.
 */

function router(app) {

  app.get('/', siteController.homepage);

}

/**
 * Exports.
 */

module.exports = router;
