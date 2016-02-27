function slugify(str) {
  return str.toLowerCase().replace(/[^A-Za-z0-9_-\s]/g, '').replace(/[\s_]+/g, '-');
}

module.exports = slugify;
