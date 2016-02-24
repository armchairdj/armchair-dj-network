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

  app.get('/user/:user_id/edit',
    authMiddleware.requireLogin,
    userController.editPage
  );

  app.post('/user/:user_id/update',
    authMiddleware.requireLogin,
    userController.update
  );
}

/**
 * Exports.
 */

module.exports = router;
