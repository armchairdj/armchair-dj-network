/**
 * External dependencies.
 */

var ghost = require('ghost');

/**
 * Startup.
 */

ghost().then(function (ghostServer) {
  ghostServer.start();
});