/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware  = require('../../lib/middleware/authMiddleware');

var mixController = require('../../lib/controller/mixController');

/**
 * Router.
 */

function router(app) {

  app.get('/mixes',
    authMiddleware.findCurrentUser,
    mixController.mixes
  );

  app.get('/mix',
    authMiddleware.findCurrentUser,
    mixController.mix
  );

}

/**
 * Exports.
 */

module.exports = router;
