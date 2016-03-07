/******************************************************************************
Script to plant seed data in Mongoose to use in developing the codebase.
******************************************************************************/

/**
 * External dependencies.
 */

var _           = require('underscore');
var async       = require('async');
var extend      = require('extend');
var mongoose    = require('mongoose');

/**
 * Internal dependencies.
 */

var settings    = require('../../lib/config/settings');

var environment = require('../../lib/util/environment');

var data        = require('../../script/db/seedDataPro.js');

/**
 * Safety first.
 */

/**
 * Database.
 */

mongoose.connect(settings.mongo.uri);

require('../../lib/model/index');

/**
 * Setup.
 */

var shouldLog  = environment.is('development');

var memo = {
  users:          [], 
  releases:       [],
  playlists:      [],
  playlistSeries: [],
  tags:           [],
  posts:          []
};

/**
 * Run.
 */

populateDb();

function populateDb() {
  // if (environment.is('production')) {
  //   return finish(new Error('This will blow up the production database! Bailing!'));
  // }

  var fns = [
    /** Remove existing data **/

    function usersClear(next) {
      mongoose.model('User').remove({}, next);
    },

    function tagsClear(next) {
      mongoose.model('Tag').remove({}, next);
    },

    function releasesClear(next) {
      mongoose.model('Release').remove({}, next);
    },

    function playlistSeriesClear(next) {
      mongoose.model('PlaylistSeries').remove({}, next);
    },

    function playlistsClear(next) {
      mongoose.model('Playlist').remove({}, next);
    },

    function postsClear(next) {
      mongoose.model('Post').remove({}, next);
    },

    /** Populate example data **/

    function users(next) {
      if (!data.users) {
        return next();
      }

      async.mapSeries(data.users, createUser, next);
    },

    function tags(next) {
      if (!data.tags) {
        return next();
      }

      var Tag = mongoose.model('Tag');

      logOperation(data.tags);

      Tag.createBatches(data.tags, handleTags);

      function handleTags(err, results) {
        memo.tags = results;

        next(err, results);
      }
    },

    function releases(next) {
      if (!data.releases) {
        return next();
      }

      async.mapSeries(data.releases, createRelease, next);
    },

    function playlistSeries(next) {
      if (!data.playlistSeries) {
        return next();
      }

      async.mapSeries(data.playlistSeries, createPlaylistSeries, next);
    },

    function playlists(next) {
      if (!data.playlists) {
        return next();
      }

      async.mapSeries(data.playlists, createPlaylist, next);
    },

    function posts(next) {
      if (!data.posts) {
        return next();
      }

      async.mapSeries(data.posts, createPost, next);
    },

    function publish(next) {
      async.mapSeries(memo.posts, publishPost, next);
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

function createPlaylistSeries(params, callback) {
  var PlaylistSeries = mongoose.model('PlaylistSeries');

  logOperation(params);

  PlaylistSeries.create(params, handlePlaylistSeries);

  function handlePlaylistSeries(err, playlistSeries) {
    if (playlistSeries) {
      memo.playlistSeries.push(playlistSeries);
    }

    callback(err, playlistSeries);
  }
}

function createPlaylist(params, callback) {
  var Playlist = mongoose.model('Playlist');

  params.series = memo.playlistSeries[params.series]._id;
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
  logResults(respond);

  function respond() {
    if (err) {
      console.log(err);

      process.exit(1);
    }

    console.log('Done!');

    process.exit(0);
  }
}

function logOperation(params) {
  if (!shouldLog) {
    return;
  }

  console.log(params);
}

function logResults(callback) {
  var results = _.reduce(memo, reducer, {});

  countTags();

  function countTags() {
    mongoose.model('Tag').count(respond);
  }

  function respond(err, tagCount) {
    results.tags = tagCount;

    console.log('Results:', results);

    callback();
  }

  function reducer(memo, item, key) {
    memo[key] = item.length;

    return memo;
  }
}
