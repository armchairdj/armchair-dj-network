/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware    = require('../../lib/middleware/authMiddleware');

var releaseController = require('../../lib/controller/releaseController');

/**
 * Router.
 */

function router(app) {

  app.get('/releases',
    authMiddleware.findCurrentUser,
    releaseController.releases
  );

  app.get('/release',
    authMiddleware.findCurrentUser,
    releaseController.release
  );
}

/**
 * Exports.
 */

module.exports = router;
