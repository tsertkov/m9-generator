"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _del = _interopRequireDefault(require("del"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  dst
} = _config.default.paths;

_gulp.default.task('build-clean', () => (0, _del.default)([dst], {
  force: true
}));