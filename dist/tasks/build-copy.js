"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpDebug = _interopRequireDefault(require("gulp-debug"));

var _gulpIf = _interopRequireDefault(require("gulp-if"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('build-copy', () => _gulp.default.src(_config.default.copy.src, {}).pipe((0, _gulpIf.default)(_config.default.isGulpDebug, (0, _gulpDebug.default)({
  title: 'Files copied:'
}))).pipe(_gulp.default.dest(_config.default.paths.dst)));