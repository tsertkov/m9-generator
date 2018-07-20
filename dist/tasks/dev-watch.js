"use strict";

var _path = _interopRequireDefault(require("path"));

var _gulp = _interopRequireDefault(require("gulp"));

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clearRequireCaches(done) {
  Object.keys(require.cache).filter(modulePath => modulePath.includes(_config.default.paths.srcContent) || modulePath.includes(_config.default.inplace.engineOptions.helpers)).forEach(modulePath => {
    delete require.cache[modulePath];
  });
  done();
}

function reloadBrowsers(done) {
  _browserSync.default.reload('*.html');

  done();
}

_gulp.default.task('dev-watch', () => {
  _gulp.default.watch(_config.default.copy.src, _gulp.default.parallel('build-copy'));

  _gulp.default.watch([_path.default.join(_config.default.paths.srcContent, '**/*'), _path.default.join(_config.default.paths.srcPages, '**/*'), _path.default.join(_config.default.paths.srcHelpers, '**/*'), _path.default.join(_config.default.paths.srcPartials, '**/*.js')], _gulp.default.series(clearRequireCaches, 'build-metalsmith', reloadBrowsers));
});