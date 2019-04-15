/******************************************************************************
Controller for site administration.
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

function index(req, res) {
  var criteria = {};

  var postType = 'all';

  var locals   = {
    headline: i18n('headline.admin.index')
  };

  findPostsAndRenderList(req, res, criteria, postType, locals);
}

function findPostsAndRenderList(req, res, criteria, postType, locals) {
  findPosts();

  function findPosts() {
    var Post = mongoose.model('Post');

    Post.byCriteria(criteria, postType, handleFind);
  }

  function handleFind(err, results) {
    if (err) {
      return render.serverError(req, res, err);
    }

    locals.posts = results;

    renderList(req, res, locals);
  }
}

function renderList(req, res, locals) {
  render.page(req, res, 'armchairdj/page/admin/list', locals);
}

/**
 * Exports.
 */

module.exports = {
  index: index
};
