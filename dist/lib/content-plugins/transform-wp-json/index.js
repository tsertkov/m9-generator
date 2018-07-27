"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _normalize = _interopRequireDefault(require("./normalize"));

var _resolveReferences = _interopRequireDefault(require("./resolve-references"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return function transformWpJsonPlugin(content, done) {
    (0, _normalize.default)((0, _resolveReferences.default)(content));
    done();
  };
}