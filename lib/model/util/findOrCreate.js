/******************************************************************************
Wrapper for mongoose#model.
******************************************************************************/

/**
 * External dependencies.
 */

var _        = require('underscore');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

/**
 * Methods.
 */

function findOrCreate(modelName, schema) {
  var Model;

  try {
    Model = mongoose.model(modelName, schema);
  } catch(err) {
    Model = mongoose.model(modelName);
  }

  return Model;
}

/**
 * Exports.
 */

module.exports = findOrCreate;
