/******************************************************************************
Controller for posts. This is the big one.
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
 * Methods: Index.
 */

function homepage(req, res) {
  var criteria = {};

  var locals   = {
    isHomepage:  true,
    description: i18n('site.tagline')
  };

  findPostsAndRenderIndex(req, res, criteria, locals);
}

function playlists(req, res) {
  var criteria = {
    playlist: { $exists: true }
  };

  var locals   = {
    headline:    i18n('headline.posts.playlist'),
    description: i18n('meta.posts.playlist')
  };

  findPostsAndRenderIndex(req, res, criteria, locals);
}

function releases(req, res) {
  var criteria = {
    release: { $exists: true }
  };

  var locals   = {
    headline:    i18n('headline.posts.release'),
    description: i18n('meta.posts.release')
  };

  findPostsAndRenderIndex(req, res, criteria, locals);
}

function byTag(req, res) {
  var Post   = mongoose.model('Post');
  var locals = {
    headline:    i18n('headline.posts.tag'),
    description: i18n('meta.posts.tag', req.tag.type, req.tag.title)
  };

  findPosts();

  function findPosts() {
    Post.byTag(req.tagId, handlePosts);
  }

  function handlePosts(err, results) {
    if (err) {
      return render.serverError(req, res, err);
    }

    locals.posts = results;

    renderIndex(req, res, locals);
  }
}

function findPostsAndRenderIndex(req, res, criteria, locals) {
  findPosts();

  function findPosts() {
    var Post = mongoose.model('Post');

    Post.byCriteria(criteria, 'published', handleFind);
  }

  function handleFind(err, results) {
    if (err) {
      return render.serverError(req, res, err);
    }

    locals.posts = results;

    renderIndex(req, res, locals);
  }
}

function renderIndex(req, res, locals) {
  render.page(req, res, 'page/post/posts', locals);
}

/**
 * Methods: Show.
 */

function show(req, res) {
  var post = req.post;

  render.page(req, res, 'page/post/post', {
    headline:    post.subject().htmlTitle(),
    description: post.subject().metaDescription(),
    post:        post
  });
}

/**
 * Methods: Create.
 */

function newPage(req, res) {
  renderEditPage(req, res);
}

function renderNewPage(req, res) {
  render.page(req, res, 'page/post/new', {
    headline: i18n('headline.post.create')
  });
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
  render.page(req, res, 'page/post/edit', {
    headline: i18n('headline.post.edit')
  });
}

function update(req, res) {
  
}

/**
 * Methods: Remove.
 */

function deletePage(req, res) {
  render.page(req, res, 'page/post/delete', {
    headline: i18n('headline.post.remove')
  });
}

function remove(req, res) {
  
}

/**
 * Exports.
 */

module.exports = {
  homepage:   homepage,
  playlists:  playlists,
  releases:   releases,
  byTag:      byTag,

  show:       show,

  newPage:    newPage,
  create:     create,

  editPage:   editPage,
  update:     update,

  deletePage: deletePage,
  remove:     remove
};
