/******************************************************************************
Bracket-style property lookup with 'dot.delimited.strings.'

## Examples:

    $ var obj = { foo: { bar: 'baz' } };
    $ safe(obj, 'foo')
    # { bar: 'baz' }
    $ safe(obj, 'foo.bar')
    # 'baz'
    $ safe(obj, 'foo.x')
    # undefined
    $ safe(obj. 'foo.x', 'not found')
    # 'not found'
******************************************************************************/

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
