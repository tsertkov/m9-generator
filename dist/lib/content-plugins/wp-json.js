"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fetchWp = require("../fetch-wp");

function _default(options) {
  return async function updateContentPlugin(content, next) {
    Object.assign(content, (await (0, _fetchWp.fetchWpContent)(options)));
    next();
  };
}