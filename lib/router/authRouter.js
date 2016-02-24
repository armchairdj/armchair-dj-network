/**
 * External dependencies.
 */

var passport = require('passport');

/**
 * Internal dependencies.
 */

var authMiddleware = require('../../lib/middleware/authMiddleware');

var authController = require('../../lib/controller/authController');

/**
 * Router.
 */

function router(app) {
  app.get('/auth/registration',
    authMiddleware.denyIfLoggedIn,
    authController.registration
  );

  app.post('/auth/registration',
    authMiddleware.denyIfLoggedIn,
    authController.processRegistration
  );

  app.get('/auth/login',
    authMiddleware.denyIfLoggedIn,
    authController.login
  );

  app.post('/auth/login',
    authMiddleware.denyIfLoggedIn,
    authController.processLogin
  );

  app.get('/auth/logout',
    authController.logout
  );
}

/**
 * Exports.
 */

module.exports = router;
