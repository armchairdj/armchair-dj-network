/**
 * External dependencies.
 */

var $         = require('jquery');
var _         = require('underscore');

/**
 * Internal dependencies.
 */

var safe      = require('../../../../../lib/util/safe');

var behaviors = require('../../../../../lib/asset/js/site/behavior/index');

/**
 * Setup.
 */

var instances = {};

/**
 * Method.
 */

function behaviorize() {
  $('[data-behavior]:not([data-behaviorized])').each(instantiate);
}

behaviorize.instances = instances;
behaviorize.behaviors = behaviors;

/**
 * Local functions.
 */

function instantiate(index, node) {
  var $node           = $(node);
  var constructorName = $node.data('behavior');
  var Constructor     = safe(behaviors, constructorName);

  if (!Constructor) {
    return;
  }

  $node.attr('data-behaviorized', true);

  init(constructorName, Constructor, $node);
}

function init(constructorName, Constructor, $node) {
  var instance               = new Constructor($node);

  instances[constructorName] = instances[constructorName] || [];

  instances[constructorName].push(instance);

  instance.init();
}

/**
 * Exports.
 */

module.exports = behaviorize;