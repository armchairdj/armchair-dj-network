/**
 * Method.
 */

function safe(obj, pathString, defaultVal) {
  var paths = pathString.split('.');

  while (obj && paths[0]) {
    obj = obj[paths.shift()];

    if (obj === undefined) {
      obj = defaultVal;
    }
  }

  return obj;
}

/**
 * Exports.
 */

module.exports = safe;
