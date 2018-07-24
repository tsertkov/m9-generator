"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _requireDir = _interopRequireDefault(require("require-dir"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(dirPath) {
  return function jsonDir(content, next) {
    if (!(0, _fs.existsSync)(dirPath)) return next();
    Object.assign(content, (0, _requireDir.default)(dirPath));
    next();
  };
}