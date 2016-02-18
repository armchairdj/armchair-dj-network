/**
 * External dependencies.
 */

var $    = require('jquery');
var _    = require('underscore');

/**
 * Internal dependencies.
 */

var safe = require('../../../../lib/util/safe');

/**
 * Module.
 */

/* Behavior layer */

var instances = {};

function bootstrap() {
  behaviorize();
}

function behaviorize() {
  $('[data-behavior]:not([data-behaviorized])').each(bindBehavior);
}

function bindBehavior(index, node) {
  var $node    = $(node);
  var behavior = $node.data('behavior');
  var method   = safe(adj.behavior, behavior);

  if (!method) {
    return;
  }

  $node.attr('data-behaviorized', true);

  /* Instaniate a class and save a reference */
  instantiateBehavior(behavior, method, $node);
}

function instantiateBehavior(behavior, Constructor, $node) {
  var instance = new Constructor($node);

  instances[behavior] = instances[behavior] || [];

  instances[behavior].push(instance);

  instance.init();
}

/* Global pub/sub */

function broadcast(evtName, extraData) {
  $(document).trigger(evtName, extraData);
}

function listen(evtName, callback) {
  $(document).on(evtName, callback);
}

/* Touch vs. desktop events */

var clickEvent = _.memoize(function () {
  return touch() ? 'touchend' : 'click';
});

function touch() {
  return $('html').hasClass('touch');
}

/**
 * Exports.
 */

module.exports = {
  behavior:    {},

  instances:   instances,
  bootstrap:   bootstrap,
  behaviorize: behaviorize,

  broadcast:   broadcast,
  listen:      listen,

  clickEvent:  clickEvent,
  touch:       touch
};
