/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware = require('../../lib/middleware/authMiddleware');

var siteController = require('../../lib/controller/siteController');

/**
 * Router.
 */

function router(app) {
  app.get('/',
    authMiddleware.findCurrentUser,
    siteController.homepage
  );
}

/**
 * Exports.
 */

module.exports = router;
