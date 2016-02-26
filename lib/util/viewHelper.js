/**
 * External dependencies.
 */

var _         = require('underscore');
var _s        = require('underscore.string');
var extend    = require('extend');
var marked    = require('marked');
var pluralize = require('pluralize');
var striptags = require('striptags');
/**
 * Internal dependencies.
 */

var settings  = require('../../lib/config/settings');

var pjson     = require('../../package.json');

/**
 * Methods.
 */

function assetUrl(fileName, fileType) {
  return '/asset/' + settings.asset.root + '/' + fileName + '.' + fileType + '?v=' + pjson.version;
}

function postArtworkAlt(post) {
  if (post.type() === 'playlist') {
    return post.playlist.title;
  }

  if (post.release.type.toLowerCase() === 'song') {
    return [post.release.artist, quote(post.release.title)].join(': ');
  }

  return [post.release.artist, post.release.title].join(': ');

  function quote(title) {
    return ['&ldquo;', title, '&rdquo;'].join('');
  }
}

function postArtworkUrl(post) {
  return '/image/post/' + folder(post) + '/' + filename(post) + '.jpg';

  function folder(post) {
    if (post.type() === 'playlist') {
      return 'playlist';
    }

    return snakify(post.release.type);
  }

  function filename(post) {
    if (post.type() === 'playlist') {
      return snakify(post.playlist.title);
    }

    return snakify([post.release.artist, post.release.title].join(' '));
  }
}

function postPreview(post) {
  var all = striptags(marked(post.content));

  return _s.prune(all, 200);
}

function snakify(title) {
  return title.toLowerCase().replace(/[^A-Za-z0-9_-\s]/g, '').replace(/[\s-]+/g, '_');
}

/**
 * Exports.
 */

module.exports = {
  /* Third-party methods */

  _:              _,
  _s:             _s,
  marked:         marked,
  pluralize:      pluralize,

  /* First-party methods */

  assetUrl:       assetUrl,
  postArtworkAlt: postArtworkAlt,
  postArtworkUrl: postArtworkUrl,
  postPreview: postPreview,
  snakify:        snakify
};
