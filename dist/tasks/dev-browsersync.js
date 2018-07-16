"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('dev-browsersync', done => {
  const bsConfig = {
    open: false,
    notify: false,
    server: {
      https: true,
      baseDir: _config.default.paths.dst
    }
  };

  if (!_config.default.webpack) {
    done();

    _browserSync.default.init(bsConfig);

    return;
  }

  const compiler = (0, _webpack.default)(_config.default.webpack);
  const devMiddleware = (0, _webpackDevMiddleware.default)(compiler, {
    publicPath: _config.default.assets.publicPath,
    stats: {
      colors: true,
      context: _config.default.paths.src
    }
  });
  devMiddleware.waitUntilValid(() => {
    done();

    _browserSync.default.init(bsConfig).watch(_path.default.join(_config.default.assets.dst, _config.default.assets.manifest)).on('change', () => {
      // Could not find out which bundle was actually updated here
      // since devMiddleware.context.webpackStats contains details
      // of all bundles. Trying our best and reloading css files with
      // browserSync on all webpack re-compilations including js-only
      _browserSync.default.reload(['*.css']);
    });
  });
  bsConfig.server.middleware = [devMiddleware];
});