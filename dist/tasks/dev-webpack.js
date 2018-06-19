'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _pluginError = require('plugin-error');

var _pluginError2 = _interopRequireDefault(_pluginError);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _gulpColor = require('gulp-color');

var _gulpColor2 = _interopRequireDefault(_gulpColor);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('dev-webpack', callback => {
  if (!Object.keys(_config2.default.webpack.entry).length) {
    const entryPaths = [_config2.default.assets.scripts, _config2.default.assets.styles].map(v => ` - ${v}`).join('\n');
    const msg = `No entry files matched:\n${entryPaths}`;
    _fancyLog2.default.warn((0, _gulpColor2.default)(msg, 'YELLOW'));
    callback();
    return;
  }

  const compiler = (0, _webpack2.default)(_config2.default.webpack);
  const webpackDevServer = new _webpackDevServer2.default(compiler, {
    contentBase: _config2.default.paths.dst,
    publicPath: _config2.default.assets.publicPath,
    stats: {
      colors: true
    }
  });

  webpackDevServer.listen(_config2.default.dev.webpackPort, _config2.default.dev.host, err => {
    if (err) throw new _pluginError2.default('webpack-dev-server', err);
  });

  webpackDevServer.middleware.waitUntilValid(() => callback());
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kZXYtd2VicGFjay5qcyJdLCJuYW1lcyI6WyJndWxwIiwidGFzayIsImNhbGxiYWNrIiwiT2JqZWN0Iiwia2V5cyIsImNvbmZpZyIsIndlYnBhY2siLCJlbnRyeSIsImxlbmd0aCIsImVudHJ5UGF0aHMiLCJhc3NldHMiLCJzY3JpcHRzIiwic3R5bGVzIiwibWFwIiwidiIsImpvaW4iLCJtc2ciLCJsb2ciLCJ3YXJuIiwiY29tcGlsZXIiLCJ3ZWJwYWNrRGV2U2VydmVyIiwiV2VicGFja0RldlNlcnZlciIsImNvbnRlbnRCYXNlIiwicGF0aHMiLCJkc3QiLCJwdWJsaWNQYXRoIiwic3RhdHMiLCJjb2xvcnMiLCJsaXN0ZW4iLCJkZXYiLCJ3ZWJwYWNrUG9ydCIsImhvc3QiLCJlcnIiLCJQbHVnaW5FcnJvciIsIm1pZGRsZXdhcmUiLCJ3YWl0VW50aWxWYWxpZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLGVBQUtDLElBQUwsQ0FBVSxhQUFWLEVBQTBCQyxRQUFELElBQWM7QUFDckMsTUFBSSxDQUFDQyxPQUFPQyxJQUFQLENBQVlDLGlCQUFPQyxPQUFQLENBQWVDLEtBQTNCLEVBQWtDQyxNQUF2QyxFQUErQztBQUM3QyxVQUFNQyxhQUFhLENBQ2pCSixpQkFBT0ssTUFBUCxDQUFjQyxPQURHLEVBRWpCTixpQkFBT0ssTUFBUCxDQUFjRSxNQUZHLEVBR2pCQyxHQUhpQixDQUdiQyxLQUFNLE1BQUtBLENBQUUsRUFIQSxFQUdHQyxJQUhILENBR1EsSUFIUixDQUFuQjtBQUlBLFVBQU1DLE1BQU8sNEJBQTJCUCxVQUFXLEVBQW5EO0FBQ0FRLHVCQUFJQyxJQUFKLENBQVMseUJBQU1GLEdBQU4sRUFBVyxRQUFYLENBQVQ7QUFDQWQ7QUFDQTtBQUNEOztBQUVELFFBQU1pQixXQUFXLHVCQUFRZCxpQkFBT0MsT0FBZixDQUFqQjtBQUNBLFFBQU1jLG1CQUFtQixJQUFJQywwQkFBSixDQUFxQkYsUUFBckIsRUFBK0I7QUFDdERHLGlCQUFhakIsaUJBQU9rQixLQUFQLENBQWFDLEdBRDRCO0FBRXREQyxnQkFBWXBCLGlCQUFPSyxNQUFQLENBQWNlLFVBRjRCO0FBR3REQyxXQUFPO0FBQ0xDLGNBQVE7QUFESDtBQUgrQyxHQUEvQixDQUF6Qjs7QUFRQVAsbUJBQWlCUSxNQUFqQixDQUF3QnZCLGlCQUFPd0IsR0FBUCxDQUFXQyxXQUFuQyxFQUFnRHpCLGlCQUFPd0IsR0FBUCxDQUFXRSxJQUEzRCxFQUFrRUMsR0FBRCxJQUFTO0FBQ3hFLFFBQUlBLEdBQUosRUFBUyxNQUFNLElBQUlDLHFCQUFKLENBQWdCLG9CQUFoQixFQUFzQ0QsR0FBdEMsQ0FBTjtBQUNWLEdBRkQ7O0FBSUFaLG1CQUFpQmMsVUFBakIsQ0FBNEJDLGNBQTVCLENBQTJDLE1BQU1qQyxVQUFqRDtBQUNELENBMUJEIiwiZmlsZSI6ImRldi13ZWJwYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBQbHVnaW5FcnJvciBmcm9tICdwbHVnaW4tZXJyb3InXG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IFdlYnBhY2tEZXZTZXJ2ZXIgZnJvbSAnd2VicGFjay1kZXYtc2VydmVyJ1xuaW1wb3J0IGxvZyBmcm9tICdmYW5jeS1sb2cnXG5pbXBvcnQgY29sb3IgZnJvbSAnZ3VscC1jb2xvcidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG5ndWxwLnRhc2soJ2Rldi13ZWJwYWNrJywgKGNhbGxiYWNrKSA9PiB7XG4gIGlmICghT2JqZWN0LmtleXMoY29uZmlnLndlYnBhY2suZW50cnkpLmxlbmd0aCkge1xuICAgIGNvbnN0IGVudHJ5UGF0aHMgPSBbXG4gICAgICBjb25maWcuYXNzZXRzLnNjcmlwdHMsXG4gICAgICBjb25maWcuYXNzZXRzLnN0eWxlc1xuICAgIF0ubWFwKHYgPT4gYCAtICR7dn1gKS5qb2luKCdcXG4nKVxuICAgIGNvbnN0IG1zZyA9IGBObyBlbnRyeSBmaWxlcyBtYXRjaGVkOlxcbiR7ZW50cnlQYXRoc31gXG4gICAgbG9nLndhcm4oY29sb3IobXNnLCAnWUVMTE9XJykpXG4gICAgY2FsbGJhY2soKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgY29tcGlsZXIgPSB3ZWJwYWNrKGNvbmZpZy53ZWJwYWNrKVxuICBjb25zdCB3ZWJwYWNrRGV2U2VydmVyID0gbmV3IFdlYnBhY2tEZXZTZXJ2ZXIoY29tcGlsZXIsIHtcbiAgICBjb250ZW50QmFzZTogY29uZmlnLnBhdGhzLmRzdCxcbiAgICBwdWJsaWNQYXRoOiBjb25maWcuYXNzZXRzLnB1YmxpY1BhdGgsXG4gICAgc3RhdHM6IHtcbiAgICAgIGNvbG9yczogdHJ1ZVxuICAgIH1cbiAgfSlcblxuICB3ZWJwYWNrRGV2U2VydmVyLmxpc3Rlbihjb25maWcuZGV2LndlYnBhY2tQb3J0LCBjb25maWcuZGV2Lmhvc3QsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB0aHJvdyBuZXcgUGx1Z2luRXJyb3IoJ3dlYnBhY2stZGV2LXNlcnZlcicsIGVycilcbiAgfSlcblxuICB3ZWJwYWNrRGV2U2VydmVyLm1pZGRsZXdhcmUud2FpdFVudGlsVmFsaWQoKCkgPT4gY2FsbGJhY2soKSlcbn0pXG4iXX0=