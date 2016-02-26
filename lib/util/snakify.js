function snakify(title) {
  return title.toLowerCase().replace(/[^A-Za-z0-9_-\s]/g, '').replace(/[\s-]+/g, '_');
}

module.exports = snakify;
