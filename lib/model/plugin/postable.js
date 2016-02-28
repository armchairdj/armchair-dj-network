/**
 * External dependencies.
 */

var _        = require('underscore');
var _s       = require('underscore.string');
var extend   = require('extend');

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var slugify  = require('../../../lib/util/slugify');

/**
 * Setup.
 */

var DEFAULT_OPTIONS = {
  typeSlugFields:    ['type'],
  titleSlugFields:   ['title'],
  altTextFields:     ['title'],
  altTextSeparator:  ': '
};

/**
 * Plugin.
 */

function plugin(schema, options) {
  var opts = extend({}, DEFAULT_OPTIONS, options);

  if (!opts.allowedTypes.length) {
    throw new Error('The postable plugin requires an allowedTypes option.');
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
    addTag: function (tag) {
      this.tags.push(tag.id);

      this.tags = _.uniq(this.tags);
    },

    generateAltText: function () {
      var tokens = resolveFields(opts.altTextFields, this);

      return _.compact(tokens).join(opts.altTextSeparator);
    },

    generateImageUrl: function () {
      var folder   = this.generateTypeSlug();
      var filename = this.generateTitleSlug();

      return '/image/post/' + folder + '/' + filename + '.jpg';
    },

    generateTitleSlug: function () {
      var tokens = resolveFields(opts.titleSlugFields, this);

      return slugify.apply(null, tokens);
    },

    generateTypeSlug: function () {
      var tokens = resolveFields(opts.typeSlugFields, this);

      return slugify.apply(null, tokens);
    }
  });
}

/**
 * Local functions.
 */

/*
  Return a value from an object:
    If the key is a property, return the value directly.
    If the key is a method, return the value of invoking it.
*/
function resolveField(key) {
  var val = this[key];

  return (typeof val === 'function' ? val.apply(this) : val);
}

function resolveFields(keys, context) {
  return _.map(keys, resolveField, context);
}

/**
 * Exports.
 */

module.exports = plugin;
