"use strict";

var _normalize = _interopRequireDefault(require("./normalize"));

var _resolveReferences = _interopRequireDefault(require("./resolve-references"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = wordpress;

function wordpress(content) {
  (0, _normalize.default)((0, _resolveReferences.default)(content));
}