module.exports = {
  asset: {
    root: 'd'
  },

  cookie: {
    path:     '/',
    httpOnly: true,
    maxAge:   1000 * 60 * 60 * 24 * 365 * 1 /* 1 year */
  },

  mongo: {
    uri:  'mongodb://127.0.0.1:27017/armchairdj'
  }
};