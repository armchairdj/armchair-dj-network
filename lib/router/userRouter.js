/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware = require('../../lib/middleware/authMiddleware');

var userController = require('../../lib/controller/userController');

/**
 * Router.
 */

function router(app) {
  app.get('/account',
    authMiddleware.findCurrentUser,
    authMiddleware.requireLogin,
    userController.account
  );

  app.get('/profile',
    authMiddleware.findCurrentUser,
    userController.profile
  );
}

/**
 * Exports.
 */

module.exports = router;
