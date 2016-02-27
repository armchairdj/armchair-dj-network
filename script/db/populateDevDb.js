/*
  Stuff some basic data into mongo locally for testing/development.
*/

/**
 * External dependencies.
 */

var _        = require('underscore');
var async    = require('async');
var extend   = require('extend');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

var settings = require('../../lib/config/settings');
var data     = require('../../script/db/seedData.js');

/**
 * Database.
 */

mongoose.connect(settings.mongo.uri);

require('../../lib/model/index');

/**
 * Setup.
 */

var shouldLog  = process.argv[2] === '--log';

var memo = {
  users:     [], 
  releases:  [],
  playlists: [],
  tags:      [],
  posts:     []
};

/**
 * Run.
 */

populateDb();

function populateDb() {
  var fns = [
    /** Remove existing data **/

    function usersClear(next) {
      var User = mongoose.model('User');

      User.remove({}, next);
    },

    function tagsClear(next) {
      var Tag = mongoose.model('Tag');

      Tag.remove({}, next);
    },

    function releasesClear(next) {
      var Release = mongoose.model('Release');

      Release.remove({}, next);
    },

    function playlistsClear(next) {
      var Playlist = mongoose.model('Playlist');

      Playlist.remove({}, next);
    },

    function postsClear(next) {
      var Post = mongoose.model('Post');

      Post.remove({}, next);
    },

    /** Populate example data **/

    function users(next) {
      async.map(data.users, createUser, next);
    },

    function tags(next) {
      var Tag = mongoose.model('Tag');

      logOperation(data.tags);

      Tag.createBatches(data.tags, handleTags);

      function handleTags(err, results) {
        memo.tags = results;

        next(err, results);
      }
    },

    function releases(next) {
      async.map(data.releases, createRelease, next);
    },

    function playlists(next) {
      async.map(data.playlists, createPlaylist, next);
    },

    function posts(next) {
      async.map(data.posts, createPost, next);
    },

    function publish(next) {
      async.map(memo.posts, publishPost, next);
    }
  ];

  async.series(fns, finish);
}

/**
 * Function.
 */

function createUser(params, callback) {
  var User = mongoose.model('User');

  logOperation(params);

  User.register({
    email:    params.email,
    name:     params.name,
    username: params.username,
    role:     params.role
  }, 'password', handleUser);

  function handleUser(err, user) {
    if (user) {
      memo.users.push(user);
    }

    callback(err, user);
  }
}

function createRelease(params, callback) {
  var Release = mongoose.model('Release');

  logOperation(params);

  Release.createWithTags(params, handleRelease);

  function handleRelease(err, release) {
    if (release) {
      memo.releases.push(release);
    }

    callback(err, release);
  }
}

function createPlaylist(params, callback) {
  var Playlist = mongoose.model('Playlist');

  params.tracks = _.map(params.tracks, mapTrack);

  logOperation(params);

  Playlist.create(params, handlePlaylist);

  function mapTrack(trackIndex, index) {
    return memo.releases[trackIndex]._id;
  }

  function handlePlaylist(err, playlist) {
    if (playlist) {
      memo.playlists.push(playlist);
    }

    callback(err, playlist);
  }
}

function createPost(params, callback) {
  var Post = mongoose.model('Post');
  var post;

  if (params.release !== undefined) {
    params.release  = memo.releases[params.release  ]._id;
  } else if (params.playlist !== undefined) {
    params.playlist = memo.playlists[params.playlist]._id;
  }

  params.author = memo.users[params.author]._id;

  logOperation(params);

  Post.create(params, handlePost);

  function handlePost(err, result) {
    if (err) {
      return respond(err);
    }

    post = result;

    if (post) {
      memo.posts.push(post);
    }

    respond();
  }

  function respond(err) {
    callback(err, post);
  }
}

function publishPost(post, callback) {
  var Post = mongoose.model('Post');

  Post.byId(post._id, 'draft', handlePost);

  function handlePost(err, post) {
    if (err) {
      return callback(err);
    }

    if (post) {
      post.publish({}, callback);
    }
  }
}

function finish(err) {
  logResults();

  if (err) {
    console.log(err);

    process.exit(1);
  }

  console.log('Done!');

  process.exit(0);
}

function logOperation(params) {
  if (!shouldLog) {
    return;
  }

  console.log(params);
}

function logResults() {
  var results = _.reduce(memo, reducer, {});

  function reducer(memo, item, key) {
    memo[key] = item.length;

    return memo;
  }

  console.log('Results:', results);
}
