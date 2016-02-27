/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

/**
 * Plugin.
 */

function plugin(schema, options) {
  schema.add({
    createdAt: {
      type:     Date,
      default:  Date.now,
      readonly: true
    },
    updatedAt: {
      type:     Date,
      default:  Date.now,
      readonly: true
    }
  });

  schema.pre('save', function (next) {
    var instance = this;

    instance.set('updatedAt', Date.now());

    next();
  });
}

/**
 * Exports.
 */

module.exports = plugin;
