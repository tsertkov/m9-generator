const dodoSlug = require('slug')
module.exports = function slug (stringToSlug) {
  const options = {}
  return dodoSlug(stringToSlug, options)
}
