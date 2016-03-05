/******************************************************************************
Retrieve a message from a hash and apply optional replacement params.
  * If the message is a string, do simple template replacement on it.
  * If the message is a function, pass the replacements are arguments and
    return the results.

Examples:

    var messageMap = {
      simpleString: 'value',
      template:     {
        templateString: 'I was passsed the argument "%s".',
        templateMethod: function (str) {
          return str.toLowercase();
        }
      }
    };

    $ resolveMessage.apply(messageMap, 'namespace.simpleString')
    //'value'

    $ resolveMessage.apply(messageMap, 'namespace.templateString', 'templateParam');
    //'I was passed the argument "templateParam".'

    $ resolveMessage.apply(messageMap, 'namespace.templateMethod', 'METHODPARAM');
    //'methodparam'
******************************************************************************/

/**
 * External dependencies.
 */

var _            = require('underscore');

/**
 * Internal dependencies.
 */

var findInObject = require('../../lib/util/findInObject');

/**
 * Setup.
 */

var TOKEN = '%s';

/**
 * Methods.
 */

function resolveMessage() {
  var messageMap   = this;
  var args        = _.toArray(arguments);
  var params      = _.clone(args);
  var templateKey = params.shift();
  var template    = findInObject(templateKey, messageMap, null);

  if (template === null) {
    warn();

    return '';
  }

  if (typeof template === 'function') {
    return applyTemplateFunction();
  }

  return applyTemplateString();

  function applyTemplateFunction() {
    if (params.length !== template.prototype.length) {
      warn();
    }

    return template.apply(null, params);
  }

  function applyTemplateString() {
    while (params.length && template.indexOf(TOKEN) !== -1) {
      template = template.replace(TOKEN, params.shift());
    }

    /* Too many or too few replacement params. */
    if (params.length || template.indexOf(TOKEN) !== -1) {
      console.log(params);
      return warn();
    }

    return template;
  }

  function warn() {
    /* Failed lookup, too many params, or too few params. */
    console.log('Invalid or mismatched message lookup.', args);
  }
}

/**
 * Exports.
 */

module.exports = resolveMessage;
