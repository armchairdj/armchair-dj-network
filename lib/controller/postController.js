



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
 * Methods: Index.
 */

function index(req, res) {
  var Post = mongoose.model('Post');
  var posts;

  findLatest();

  function findLatest() {
    var criteria = {};
    var fields   = null;
    var options  = { sort: { 'createdAt': -1 }, limit: 10 };

    Post.find(criteria, fields, options, handleFind);
  }

  function handleFind(err, results) {
    if (err) {
      return render.serverError(req, res);
    }

    posts = results;

    respond();
  }

  function respond() {
    render.page(req, res, 'page/post/index', {
      posts: posts
    });
  }
}

/**
 * Methods: Show.
 */

function show(req, res) {
  render.page(req, res, 'page/post/show');
}

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
  index:      index,
  show:       show,

  newPage:    newPage,
  create:     create,

  editPage:   editPage,
  update:     update,

  deletePage: deletePage,
  remove:     remove
};
