/******************************************************************************
Central string store, including simple template replacement or complex
template functions.
******************************************************************************/

/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var resolveMessage = require('../../lib/util/resolveMessage');

/**
 * Setup.
 */

var MESSAGES = {
  brian: {
    hireMe: "Hi there! I'm Brian Dillard, and I built this site from scratch. Interested in hiring me? Check me out on LinkedIn: https://www.linkedin.com/in/briandillard."
  },

  headline: {
    admin: {
      index: 'Admin'
    },

    auth: {
      register: 'Register',
      login:    'Log in'
    },

    playlist: {
      create:   'Create playlist',
      edit:     'Edit playlist',
      remove:   'Remove playlist'
    },

    post: {
      playlist: '%s: %s',
      release:  '%s: %s',
      create:   'Create post',
      edit:     'Edit post',
      remove:   'Remove post'
    },

    posts: {
      playlist: 'Playlists',
      release:  '%s',
      tag:      '%s: %s'
    },

    release: {
      create:   'Create release',
      edit:     'Edit release',
      remove:   'Remove release'
    },

    'static': {
      about: 'About'
    },

    user: {
      account: 'Account',
      profile: '%s'
    }
  },

  meta: {
    auth: {
      register: 'Register to be a friend of the Armchair DJ.',
      login:    'Log into your Armchair DJ account.'
    },

    post: {
      playlist: 'A playlist of songs by %s and other artists.',
      release:  'An appreciation of the %s %s by %s'
    },

    posts: {
      playlist: 'Latest obsessively curated playlists.',
      release:  'Latest track, album and mix reviews.',
      tag:      'Posts tagged with the %s %s.'
    },

    'static': {
      about: 'About Armchair DJ.'
    },

    user: {
      profile: 'Posts by Armchair DJ contributor %s.'
    }
  },

  site: {
    name:    'Armchair DJ',
    tagline: 'A monologue about music, with occasional mixtapes.',
    url:     'http://www.armchair-dj.com'
  }
};

/**
 * Exports.
 */


module.exports = resolveMessage.bind(MESSAGES);
