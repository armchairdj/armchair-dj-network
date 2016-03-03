/******************************************************************************
Router for userController.
******************************************************************************/

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
  app.get('/u/:username',
    userController.show
  );

  app.get('/account',
    authMiddleware.requireLogin,
    userController.editPage
  );

  app.post('/account',
    authMiddleware.requireLogin,
    userController.update
  );
}

/**
 * Exports.
 */

module.exports = router;
