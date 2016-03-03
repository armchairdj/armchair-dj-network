/******************************************************************************
Mongoose plugin to allow the generation of 'slugs' from existing string fields.
This allows human- and SEO-friendly taxonomy-style URL structures to be derived
automatically from existing instance data.

This plug doesn't automatically persist slug fields. Instead, it adds fields to
the schema and provides methods for generating and setting them. It's up to the
individual model to decide when in its lifecycle to call those methods. This
keeps slug generation code DRY while allowing flexibility without overloading
the plugin with esoteric options.
******************************************************************************/

/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Internal dependencies.
 */

var resolve  = require('../../../lib/util/resolve');
var slugify  = require('../../../lib/util/slugify');

/**
 * Setup.
 */

var DEFAULT_OPTIONS = {
  includeImages:    true,
  slugContext:      null,
  pathFields:       ['type' ],
  slugFields:       ['title'],
  altTextFields:    ['title'],
  altTextSeparator: ': '
};

/**
 * Plugin.
 */

function plugin(schema, options) {
  var opts = extend({}, DEFAULT_OPTIONS, options);

  var paths = {
    path: {
      type: String,
      trim: true
    },

    slug: {
      type: String,
      trim: true
    }
  };

  var methods = {
    slugContext: function () {
      if (opts.slugContext) {
        return resolve.key(this, slugContext);
      }

      return this;
    },

    generateSlugs: function () {
      var instance = this;
      var slugs    = {
        path: instance.generatePath(),
        slug: instance.generateSlug()
      };

      if (opts.includeImages) {
        extend(slugs, {
          altText: instance.generateAltText(),
          image:   instance.generateImageUrl()
        });
      }

      return slugs;
    },

    generatePath: function () {
      var tokens = resolve.keys(this.slugContext(), opts.pathFields);

      return slugify.apply(null, tokens);
    },

    generateSlug: function () {
      var tokens = resolve.keys(this.slugContext(), opts.slugFields);

      return slugify.apply(null, tokens);
    },

    setSlugs: function (callback) {
      var instance = this;

      extend(instance, instance.generateSlugs());

      if (typeof callback === 'function') {
        callback();
      }
    },

    urlPath: function () {
      var path = this.path || this.generatePath();
      var slug = this.slug || this.generateSlug();

      return [path, slug].join('/');
    }
  };

  if (opts.includeImages) {
    extend(paths, {
      image: {
        type: String,
        trim: true
      },

      altText: {
        type: String,
        trim: true
      }
    });

    extend(methods, {
      generateAltText: function () {
        var tokens = resolve.keys(this.slugContext(), opts.altTextFields);

        return _.compact(tokens).join(opts.altTextSeparator);
      },

      generateImageUrl: function () {
        return '/image/post/' + this.urlPath() + '.jpg';
      }
    });
  }

  schema.add(paths);

  extend(schema.methods, methods);
}

/**
 * Exports.
 */

module.exports = plugin;
