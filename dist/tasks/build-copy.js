"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('build-copy', () => {
  return _gulp.default.src(`${_config.default.templates.publicPath}/**/*`).pipe(_gulp.default.dest(_config.default.templates.destinationPath));
});