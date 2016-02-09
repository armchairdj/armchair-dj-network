/**
 * Methods.
 */

function homepage(req, res) {
  res.status(200).json({ message: 'hello world'});
}

/**
 * Exports.
 */

module.exports = {
  homepage: homepage
};
