/******************************************************************************
Mongoose plugin to allow the generation of 'slugs' from existing string fields.
This allows human- and SEO-friendly taxonomy-style URL structures to be derived
automatically from existing instance data.
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
  lookupContext:    null,
  generateOnEvents: [],
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
    lookupContext: function () {
      if (opts.lookupContext) {
        return resolve.key(this, lookupContext);
      }

      return this;
    },

    generatePath: function () {
      var tokens = resolve.keys(this.lookupContext(), opts.pathFields);

      return slugify.apply(null, tokens);
    },

    generateSlug: function () {
      var tokens = resolve.keys(this.lookupContext(), opts.slugFields);

      return slugify.apply(null, tokens);
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
        var tokens = resolve.keys(this.lookupContext(), opts.altTextFields);

        return _.compact(tokens).join(opts.altTextSeparator);
      },

      generateImageUrl: function () {
        return '/image/post/' + this.urlPath() + '.jpg';
      }
    });
  }

  schema.add(paths);

  extend(schema.methods, methods);

  _.each(opts.generateOnEvents, function (eventName) {
    if (eventName === 'save') {
      schema.pre('save', generateSlugsBeforeSave);
    }
  });

  function generateSlugsBeforeSave(next) {
    var instance = this;

    instance.set('path', instance.generatePath());
    instance.set('slug', instance.generateSlug());

    if (opts.includeImages) {
      instance.set('altText', instance.generateAltText() );
      instance.set('image',   instance.generateImageUrl());
    }

    next();
  }
}

/**
 * Exports.
 */

module.exports = plugin;
