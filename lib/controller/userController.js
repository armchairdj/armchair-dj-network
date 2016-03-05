/******************************************************************************
Controller for users.
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

var i18n     = require('../../lib/config/i18n');

var render   = require('../../lib/util/render');

/**
 * Methods: Show.
 */

function show(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'page/user/profile', {
      headline:    i18n('headline.user.profile', req.user.username),
      description: i18n('meta.user.profile', req.user.username),
      profile:     req.user
    });
  }
}

/**
 * Methods: Update.
 */

function editPage(req, res) {
  renderEditPage(req, res);
}

function renderEditPage(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'page/user/edit', {
      headline: i18n('headline.user.account'),
      account:  req.user
    });
  }
}

function update(req, res) {
  
}

/**
 * Exports.
 */

module.exports = {
  show:     show,

  editPage: editPage,
  update:   update
};
