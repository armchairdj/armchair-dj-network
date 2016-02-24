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
  app.get('/about',
    staticController.about
  );
}

/**
 * Exports.
 */

module.exports = router;
