/**
 * External dependencies.
 */

var $         = require('jquery');
var _         = require('underscore');

/**
 * Internal dependencies.
 */

var findInObject = require('../../../../../lib/util/findInObject');

var behaviors    = require('../../../../../lib/asset/js/adj/behavior/index');

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
  var Constructor     = findInObject(constructorName, behaviors);

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