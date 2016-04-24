/******************************************************************************
Base settings that will can overridden by each environment.
******************************************************************************/

module.exports = {
  asset: {
    root: '/asset/d/'
  },

  defaults: {
    author: 'Brian J. Dillard'
  },

  format: {
    date: 'YYYY-MM-DD'
  },

  mongo: {
    uri:     'mongodb://127.0.0.1:27017/armchairdj',
    options: {
      server: {
        socketOptions: {
          keepAlive:        300000,
          connectTimeoutMS: 30000
        }
      },
      replset: {
        socketOptions: {
          keepAlive:        300000,
          connectTimeoutMS: 30000
        }
      }
    }
  },

  pagination: {
    perPage: 100
  }
};