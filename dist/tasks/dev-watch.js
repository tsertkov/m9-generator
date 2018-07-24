"use strict";

var _path = _interopRequireDefault(require("path"));

var _gulp = _interopRequireDefault(require("gulp"));

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clearRequireCaches(done) {
  Object.keys(require.cache).filter(modulePath => modulePath.includes(_config.default.content.contentPath) || modulePath.includes(_config.default.templates.helpersPath)).forEach(modulePath => {
    delete require.cache[modulePath];
  });
  done();
}

function reloadBrowsers(done) {
  _browserSync.default.reload('*.html');

  done();
}

_gulp.default.task('dev-watch', () => {
  _gulp.default.watch(_config.default.templates.publicPath, _gulp.default.parallel('build-copy'));

  _gulp.default.watch([_path.default.join(_config.default.content.contentPath, '**/*'), _path.default.join(_config.default.templates.pagesPath, '**/*'), _path.default.join(_config.default.templates.helpersPath, '**/*'), _path.default.join(_config.default.templates.partialsPath, '**/*'), _path.default.join(_config.default.paths.src, 'config.js'), _path.default.join(_config.default.paths.src, 'config.json'), _path.default.join(_config.default.paths.src, 'config.*.json')], _gulp.default.series(clearRequireCaches, 'build-metalsmith', reloadBrowsers));
});