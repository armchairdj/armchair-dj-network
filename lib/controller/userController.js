/******************************************************************************
[DESCRIPTION]
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

var render   = require('../../lib/util/render');

/**
 * Methods: Show.
 */

function show(req, res) {
  respond();

  function respond() {
    render.page(req, res, 'page/user/show', {
      profile:         req.user,
      pageDescription: 'TODO'
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
      account:         req.user,
      pageDescription: 'TODO'
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
