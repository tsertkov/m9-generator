"use strict";

var _path = _interopRequireDefault(require("path"));

var _gulp = _interopRequireDefault(require("gulp"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clearRequireCaches(callback) {
  Object.keys(require.cache).filter(modulePath => modulePath.includes(_config.default.paths.srcContent) || modulePath.includes(_config.default.inplace.engineOptions.helpers)).forEach(modulePath => {
    delete require.cache[modulePath];
  });
  callback();
}

_gulp.default.task('dev-watch', () => {
  _gulp.default.watch(_config.default.copy.src, _gulp.default.parallel('build-copy'));

  _gulp.default.watch([_path.default.join(_config.default.contentDir.directory, '**/*'), _path.default.join(_config.default.pages.directory, '**/*'), _path.default.join(_config.default.layouts.directory, '**/*'), _path.default.join(_config.default.layouts.partials, '**/*'), _path.default.join(_config.default.helpers.directory, '**/*.js')], _gulp.default.series(clearRequireCaches, 'build-metalsmith'));
});