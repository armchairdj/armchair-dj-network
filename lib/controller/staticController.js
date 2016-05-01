/******************************************************************************
Controller for static pages.
******************************************************************************/

/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

var i18n     = require('../../lib/config/i18n')('armchairdj');

var render   = require('../../lib/util/render');

/**
 * Methods.
 */

function about(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'armchairdj/page/static/about', {
      headline:    i18n('headline.static.about'),
      description: i18n('description.static.about')
    });
  }
}

/**
 * Exports.
 */

module.exports = {
  about: about
};
