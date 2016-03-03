/******************************************************************************
Wrapper for underscore.string#slugify:
  * Removes certain special characters instead of turning them into dashes.
  * Joins its arguments into a dash-delimited string before slugifying.

## Example

    $ slugify("salt & pepa's", 'girl DJ is', '_spinderella_')
    // yields 'salt-and-pepas-girl-dj-is-spinderella'
******************************************************************************/

/**
 * External dependencies.
 */

var _  = require('underscore');
var _s = require('underscore.string');

/**
 * Internal dependencies.
 */

/**
 * Methods.
 */

function slugify() {
  var str = _.toArray(arguments).join('-').replace(/'/g, '').replace(/&/g, 'and');

  return _s.slugify(str);
}

/**
 * Exports.
 */

module.exports = slugify;
