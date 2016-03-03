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
 * Methods: Create.
 */

function newPage(req, res) {
  renderEditPage(req, res);
}

function renderNewPage(req, res) {
  render.page(req, res, 'page/playlist/new');
}

function create(req, res) {
  
}

/**
 * Methods: Update.
 */

function editPage(req, res) {
  renderEditPage(req, res);
}

function renderEditPage(req, res) {
  render.page(req, res, 'page/playlist/edit');
}

function update(req, res) {
  
}

/**
 * Methods: Remove.
 */

function deletePage(req, res) {
  render.page(req, res, 'page/playlist/delete');
}

function remove(req, res) {
  
}

/**
 * Exports.
 */

module.exports = {
  newPage:    newPage,
  create:     create,

  editPage:   editPage,
  update:     update,

  deletePage: deletePage,
  remove:     remove
};
