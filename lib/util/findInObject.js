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

function findInObject(dotDelimitedKey, obj, defaultVal) {
  var levels = dotDelimitedKey.split('.');

  while (obj && levels[0]) {
    obj = obj[levels.shift()];

    if (obj === undefined) {
      obj = defaultVal;
    }
  }

  return obj;
}

/**
 * Exports.
 */

module.exports = findInObject;
