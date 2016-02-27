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
 * Params.
 */

function playlistIdParam(req, res, next, playlistId) {
  var Playlist = mongoose.model('Playlist');

  Playlist.findById(
    playlistId
  ).populate(
    'tags'
  ).exec(handlePlaylist);

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

function postIdParam(req, res, next, postId) {
  var Post = mongoose.model('Post');

  Post.displayOne(postId, handlePost);

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

function releaseIdParam(req, res, next, releaseId) {
  var Release = mongoose.model('Release');

  Release.findById(
    releaseId
  ).populate(
    'tags'
  ).exec(handleRelease);

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

function tagIdParam(req, res, next, tagId) {
  var Tag = mongoose.model('Tag');

  Tag.findById(tagId, handleTag);

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

function userIdParam(req, res, next, userId) {
  var User = mongoose.model('User');

  User.findById(userId, handleUser);

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

  User.findOne({ username: username }, {}, handleUser);

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
 * Exports.
 */

module.exports = function (app) {
  app.param('playlist_id', playlistIdParam);
  app.param('post_id',     postIdParam    );
  app.param('release_id',  releaseIdParam );
  app.param('tag_id',      tagIdParam     );
  app.param('user_id',     userIdParam    );
  app.param('username',    usernameParam  );
};
