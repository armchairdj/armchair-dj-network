/******************************************************************************
Base settings that will can overridden by each environment.
******************************************************************************/

module.exports = {
  asset: {
    subdirectory: 'd'
  },

  format: {
    date: 'YYYY-MM-DD'
  },

  meta: {
    keywords: ['music', 'reviews', 'Brian Dillard', 'Brian J. Dillard', 'DJ']
  },

  mongo: {
    uri:  'mongodb://127.0.0.1:27017/armchairdj'
  },

  pagination: {
    perPage: 100
  }
};