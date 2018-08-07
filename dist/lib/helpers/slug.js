"use strict";

var _slug = _interopRequireDefault(require("slug"));

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function slug(stringToSlug) {
  const options = _config.default.templates.slugHelper;

  if (typeof options === 'function') {
    return options(stringToSlug);
  }

  if (options) {
    return (0, _slug.default)(stringToSlug, options);
  } else {
    return (0, _slug.default)(stringToSlug);
  }
};