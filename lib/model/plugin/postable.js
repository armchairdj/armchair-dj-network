/******************************************************************************
Mongoose plugin to keep heterogeneous models DRY while giving them all a
unified interface for publishing posts about them. This includes:

  - common fields, including a tag field
  - common methods for generating image URLs and alt text.
  - common validation.
  - common pre-save hooks.
******************************************************************************/

/**
 * External dependencies.
 */

var _             = require('underscore');
var extend        = require('extend');

var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;
var ObjectId      = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

/**
 * Setup.
 */

var DEFAULT_OPTIONS = {
  allowedTypes: []
};

/**
 * Plugin.
 */

function plugin(schema, options) {
  var opts = extend({}, DEFAULT_OPTIONS, options);

  if (!opts.allowedTypes.length) {
    throw new Error('Options for postable plugin must include an allowedTypes array.');
  }

  schema.add({
    tags: [{
      type: ObjectId,
      ref:  'Tag'
    }],

    type: {
      type:     String,
      required: true,
      default:  opts.allowedTypes[0]
    },

    url: {
      type: String,
      trim: true
    }
  });

  extend(schema.methods, {
    /*
      This method doesn't save the instance, it just adds a tag if it
      doesn't exist already and leaves it up to the caller to save.
    */
    ensureTag: function (tag) {
      this.tags.push(tag.id);

      this.tags = _.uniq(this.tags);
    }
  });
}

/**
 * Exports.
 */

module.exports = plugin;
