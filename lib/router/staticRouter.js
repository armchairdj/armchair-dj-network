/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware = require('../../lib/middleware/authMiddleware');

var staticController = require('../../lib/controller/staticController');

/**
 * Router.
 */

function router(app) {
  app.get('/',
    authMiddleware.findCurrentUser,
    staticController.homepage
  );

  app.get('/about',
    authMiddleware.findCurrentUser,
    staticController.about
  );
}

/**
 * Exports.
 */

module.exports = router;
