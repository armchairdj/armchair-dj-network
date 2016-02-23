/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware = require('../../lib/middleware/authMiddleware');

var postController = require('../../lib/controller/postController');

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
