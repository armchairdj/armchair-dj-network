/******************************************************************************
Central string store, including simple template replacement or complex
template functions.
******************************************************************************/

/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var resolveMessage = require('../../lib/util/resolveMessage');

/**
 * Setup.
 */

var MESSAGES = {
  armchairdj:           require('../../lib/config/i18n/armchairdj'),
  askauiguy:            require('../../lib/config/i18n/askauiguy'),
  bcchsclassof1991:     require('../../lib/config/i18n/bcchsclassof1991'),
  briandillard:         require('../../lib/config/i18n/briandillard'),
  charlieandbrian:      require('../../lib/config/i18n/charlieandbrian'),
  nerdswithdaddyissues: require('../../lib/config/i18n/nerdswithdaddyissues'),
  plastikfan:           require('../../lib/config/i18n/plastikfan')
};

/**
 * Methods.
 */

function prepareMessages(site) {
  return resolveMessage.bind(MESSAGES[site]);
}

/**
 * Exports.
 */


module.exports = prepareMessages;
