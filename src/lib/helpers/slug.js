import dodoSlug from 'slug'
import config from '../../config'

module.exports = function slug (stringToSlug) {
  const options = config.templates.slugHelper
  if (typeof options === 'function') {
    return options(stringToSlug)
  }

  if (options) {
    return dodoSlug(stringToSlug, options)
  } else {
    return dodoSlug(stringToSlug)
  }
}
