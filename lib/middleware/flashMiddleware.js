/**
 * External dependencies.
 */

var _           = require('underscore');

/**
 * Setup.
 */

var allowedKeys = ['success', 'error', 'info'];

/**
 * Methods.
 */

function flashMiddleware(req, res, next) {
  var msg = retrieve(req, res);

  if (msg) {
    res.locals({
      flashMessages: msg
    });
  }

  next();
}

/**
 * Helper functions.
 */

function retrieve(req, res) {
  var flashes   = req.flash();
  var allKeys   = _.keys(flashes);
  var validKeys = allKeys.filter(validate);
  var type      = validKeys[0];
  var items     = flashes[type] || [];

  if (allKeys.length > 1) {
    console.log('Too many flash types in request.');
  }

  if (allKeys.length !== validKeys.length) {
    console.log('Invalid flash type(s): %s', flashes);
  }

  if (!type || _.isEmpty(items)) {
    return;
  }

  return {
    type:  type,
    items: items
  };
}

function validate(type) {
  return _.contains(standardTypes, type);
}

/**
 * Exports.
 */

module.exports = flashMiddleware;
