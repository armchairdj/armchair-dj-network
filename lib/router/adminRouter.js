/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware  = require('../../lib/middleware/authMiddleware');

var adminController = require('../../lib/controller/adminController');

/**
 * Router.
 */

function router(app) {

  app.get('/admin',
    authMiddleware.requireLogin,
    adminController.index
  );

}

/**
 * Exports.
 */

module.exports = router;
