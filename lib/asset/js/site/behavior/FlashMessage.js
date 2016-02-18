/**
 * External dependencies.
 */

var $ = require('jquery');
var _ = require('underscore');

/**
 * Internal dependencies.
 */

var clickEvent = require('../../../../../lib/asset/js/site/util/clickEvent');

/**
 * Constructor.
 */

function FlashMessage($node) {
  this.$node = $node;
}

/**
 * Prototype.
 */

FlashMessage.prototype = {
  init: function () {
    this.gatherNodes();
    this.bindHandlers();
  },

  gatherNodes: function () {
    this.$trigger = this.$node.find('[data-dismiss-flash]');
  },

  bindHandlers: function () {
    this.$trigger.on(clickEvent(), _.bind(this.handleTriggerClick, this));
  },

  handleTriggerClick: function (evt) {
    evt.preventDefault();

    this.$node.remove();
  }
};

/**
 * Exports.
 */

module.exports = FlashMessage;