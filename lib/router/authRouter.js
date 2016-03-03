/******************************************************************************
Router for authController.
******************************************************************************/

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
  app.get('/register',
    authMiddleware.denyIfLoggedIn,
    authController.registerPage
  );

  app.post('/register',
    authMiddleware.denyIfLoggedIn,
    authController.register
  );

  app.get('/login',
    authMiddleware.denyIfLoggedIn,
    authController.loginPage
  );

  app.post('/login',
    authMiddleware.denyIfLoggedIn,
    authController.login
  );

  app.get('/logout',
    authController.logout
  );
}

/**
 * Exports.
 */

module.exports = router;
