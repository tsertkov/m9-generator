"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _path = _interopRequireDefault(require("path"));

var _requireDir = _interopRequireDefault(require("require-dir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _requireDir.default)(_path.default.join(__dirname, '/tasks'));

_gulp.default.task('build', _gulp.default.series('build-clean', 'build-copy', 'build-webpack', 'build-metalsmith'));

_gulp.default.task('dev', _gulp.default.series('build-clean', 'build-copy', 'dev-browsersync', 'build-metalsmith', 'dev-watch'));

_gulp.default.task('deploy', _gulp.default.series('build', 'deploy-aws'));

_gulp.default.task('test', _gulp.default.series('test-standard'));

_gulp.default.task('default', _gulp.default.series('dev'));