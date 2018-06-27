"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bsServer = _browserSync.default.create();

const webpackHMRSnippet = '<script async src="/assets/webpack-hot-middleware-client.js"></script>';

_gulp.default.task('dev-browsersync', callback => {
  const noWebpack = !Object.keys(_config.default.webpack.entry).length;
  const bsConfig = {
    open: false,
    notify: false,
    server: {
      https: true,
      baseDir: _config.default.paths.dst
    }
  };

  if (noWebpack) {
    launchBrowserSync(bsConfig, callback);
    return;
  }

  const compiler = (0, _webpack.default)(_config.default.webpack);
  bsConfig.snippetOptions = {
    rule: {
      match: /<body[^>]*>/i,
      fn: (snippet, match) => match + snippet + webpackHMRSnippet
    }
  };
  const devMiddleware = (0, _webpackDevMiddleware.default)(compiler, {
    publicPath: _config.default.assets.publicPath,
    stats: {
      colors: true,
      context: _config.default.paths.src
    }
  });
  bsConfig.server.middleware = [devMiddleware, (0, _webpackHotMiddleware.default)(compiler)];
  devMiddleware.waitUntilValid(() => {
    launchBrowserSync(bsConfig, callback) // FIME remove following line when HMR works again
    .watch(_path.default.join(_config.default.assets.dst, _config.default.assets.manifest)).on('change', bsServer.reload);
  });
});

function launchBrowserSync(options, callback) {
  // return early from task
  // and start browserSync in background
  callback();
  bsServer.init(options, () => {
    bsServer.watch(_path.default.join(_config.default.paths.dst, '**/*.html')).on('change', bsServer.reload);
  });
  return bsServer;
}