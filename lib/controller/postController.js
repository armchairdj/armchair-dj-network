/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

var settings = require('../../lib/config/settings');

var render   = require('../../lib/util/render');

/**
 * Methods: Index.
 */

function homepage(req, res) {
  var criteria = {};

  var locals   = {
    isHomepage:       true,
    pageDescription: 'A monologue about music, with occasional mixtapes.'
  };

  findPostsAndRenderIndex(req, res, criteria, locals);
}

function playlists(req, res) {
  var criteria = {
    playlist: { $exists: true }
  };

  var locals   = {
    headline:        'Playlists',
    pageDescription: 'Latest obsessively curated playlists.'
  };

  findPostsAndRenderIndex(req, res, criteria, locals);
}

function releases(req, res) {
  var criteria = {
    release: { $exists: true }
  };

  var locals   = {
    headline:        'Reviews',
    pageDescription: 'Latest song, album and mix reviews.'
  };

  findPostsAndRenderIndex(req, res, criteria, locals);
}

function byTag(req, res) {
  var Post   = mongoose.model('Tag');

  var locals = {
    headline:        [req.tagType, req.tag.name].join(': '),
    pageDescription: 'Posts tagged with the ' + req.tag.type + ' ' + req.tag.name + '.',
  };

  function findPosts() {
    Post.byTag(req.tag, handlePosts);
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

    Post.byType(criteria, 'published', handleFind);
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
  render.page(req, res, 'page/post/index', locals);
}

/**
 * Methods: Show.
 */

function show(req, res) {
  render.page(req, res, 'page/post/show', {
    post: req.post
  });
}

/**
 * Methods: Create.
 */

function newPage(req, res) {
  renderEditPage(req, res);
}

function renderNewPage(req, res) {
  render.page(req, res, 'page/post/new');
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
  render.page(req, res, 'page/post/edit');
}

function update(req, res) {
  
}

/**
 * Methods: Remove.
 */

function deletePage(req, res) {
  render.page(req, res, 'page/post/delete');
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
