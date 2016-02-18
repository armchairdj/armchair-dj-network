/**
 * External dependencies.
 */

var $ = require('jquery');

/**
 * Module.
 */

function broadcast(evtName, extraData) {
  $(document).trigger(evtName, extraData);
}

function listen(evtName, callback) {
  $(document).on(evtName, callback);
}

/**
 * Exports.
 */

module.exports = {
  broadcast: broadcast,
  listen:    listen
};
