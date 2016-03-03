/******************************************************************************
[DESCRIPTION]
******************************************************************************/

/**
 * External dependencies.
 */

var _        = require('underscore');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

var render   = require('../../lib/util/render');

/**
 * Params: Post.
 */

function postIdParam(req, res, next, postId) {
  var Post = mongoose.model('Post');

  findPost();

  function findPost() {
    Post.byId(postId, 'all', handlePost);
  }

  function handlePost(err, post) {
    if (err) {
      return next(err);
    }

    if (!post) {
      return render.notFound(req, res);
    }

    req.post   = post;
    req.postId = post.id;

    respond();
  }

  function respond() {
    next();
  }
}

function postSlugParam(req, res, next, postSlug) {
  var Post = mongoose.model('Post');

  findPost();

  function findPost() {
    Post.bySlug({
      slug: postSlug,
      path: req.postPath
    }, handlePost);
  }

  function handlePost(err, post) {
    if (err) {
      return next(err);
    }

    if (!post) {
      return render.notFound(req, res);
    }

    req.post   = post;
    req.postId = post.id;

    respond();
  }

  function respond() {
    next();
  }
}

function postPathParam(req, res, next, postPath) {
  req.postPath = postPath;

  next();
}

/**
 * Params: Tag.
 */

function tagIdParam(req, res, next, tagId) {
  var Tag = mongoose.model('Tag');

  findTag();

  function findTag() {
    Tag.findById(tagId, handleTag);
  }

  function handleTag(err, tag) {
    if (err) {
      return next(err);
    }

    if (!tag) {
      return render.notFound(req, res);
    }

    req.tag   = tag;
    req.tagId = tag.id;

    next();
  }
}

function tagSlugParam(req, res, next, tagSlug) {
  var Tag = mongoose.model('Tag');

  findTag();

  function findTag() {
    Tag.findOne({
      slug: tagSlug,
      path: req.tagPath
    }, handleTag);
  }

  function handleTag(err, tag) {
    if (err) {
      return next(err);
    }

    if (!tag) {
      return render.notFound(req, res);
    }

    req.tag   = tag;
    req.tagId = tag.id;

    next();
  }
}

function tagPathParam(req, res, next, tagPath) {
  req.tagPath = tagPath;

  next();
}

/**
 * Params: User.
 */

function userIdParam(req, res, next, userId) {
  var User = mongoose.model('User');

  findUser();

  function findUser() {
    User.findById(userId, handleUser);
  }

  function handleUser(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return render.notFound(req, res);
    }

    req.user   = user;
    req.userId = user.id;

    next();
  }
}

function usernameParam(req, res, next, username) {
  var User = mongoose.model('User');

  findUser();

  function findUser() {
    User.findOne({ username: username }, {}, handleUser);
  }

  function handleUser(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return render.notFound(req, res);
    }

    req.user   = user;
    req.userId = user.id;

    next();
  }
}

/**
 * Params: Release.
 */

function releaseIdParam(req, res, next, releaseId) {
  var Release = mongoose.model('Release');

  findRelease();

  function findRelease() {
    Release.findById(releaseId).populate('tags').exec(handleRelease);
  }

  function handleRelease(err, release) {
    if (err) {
      return next(err);
    }

    if (!release) {
      return render.notFound(req, res);
    }

    req.release   = release;
    req.releaseId = release.id;

    next();
  }
}

/**
 * Params: Playlist.
 */

function playlistIdParam(req, res, next, playlistId) {
  var Playlist = mongoose.model('Playlist');

  findPlaylist();

  function findPlaylist() {
    Playlist.findById(playlistId).populate('tags').exec(handlePlaylist);
  }

  function handlePlaylist(err, playlist) {
    if (err) {
      return next(err);
    }

    if (!playlist) {
      return render.notFound(req, res);
    }

    req.playlist   = playlist;
    req.playlistId = playlist.id;

    next();
  }
}

/**
 * Exports.
 */

module.exports = function (app) {
  app.param('post_id',     postIdParam    );
  app.param('post_slug',   postSlugParam  );
  app.param('post_path',   postPathParam  );

  app.param('tag_id',      tagIdParam     );
  app.param('tag_slug',    tagSlugParam   );
  app.param('tag_path',    tagPathParam   );

  app.param('user_id',     userIdParam    );
  app.param('username',    usernameParam  );

  app.param('release_id',  releaseIdParam );

  app.param('playlist_id', playlistIdParam);
};
