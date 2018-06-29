"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _pluginError = _interopRequireDefault(require("plugin-error"));

var _webpack = _interopRequireDefault(require("webpack"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('build-webpack', done => {
  if (!_config.default.webpack) {
    _fancyLog.default.warn(['webpack] nothing to compile yet...']);

    done();
    return;
  }

  (0, _webpack.default)(_config.default.webpack, (err, stats) => {
    if (err) throw new _pluginError.default('webpack', err);

    _fancyLog.default.info('[webpack]', '\n' + stats.toString());

    done();
  });
});