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

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('dev-webpack', callback => {
  if (!Object.keys(_config2.default.webpack.entry).length) {
    _fancyLog2.default.warn('[webpack] nothing to compile yet...');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kZXYtd2VicGFjay5qcyJdLCJuYW1lcyI6WyJndWxwIiwidGFzayIsImNhbGxiYWNrIiwiT2JqZWN0Iiwia2V5cyIsImNvbmZpZyIsIndlYnBhY2siLCJlbnRyeSIsImxlbmd0aCIsImxvZyIsIndhcm4iLCJjb21waWxlciIsIndlYnBhY2tEZXZTZXJ2ZXIiLCJXZWJwYWNrRGV2U2VydmVyIiwiY29udGVudEJhc2UiLCJwYXRocyIsImRzdCIsInB1YmxpY1BhdGgiLCJhc3NldHMiLCJzdGF0cyIsImNvbG9ycyIsImxpc3RlbiIsImRldiIsIndlYnBhY2tQb3J0IiwiaG9zdCIsImVyciIsIlBsdWdpbkVycm9yIiwibWlkZGxld2FyZSIsIndhaXRVbnRpbFZhbGlkIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLGVBQUtDLElBQUwsQ0FBVSxhQUFWLEVBQTBCQyxRQUFELElBQWM7QUFDckMsTUFBSSxDQUFDQyxPQUFPQyxJQUFQLENBQVlDLGlCQUFPQyxPQUFQLENBQWVDLEtBQTNCLEVBQWtDQyxNQUF2QyxFQUErQztBQUM3Q0MsdUJBQUlDLElBQUosQ0FBUyxxQ0FBVDtBQUNBUjtBQUNBO0FBQ0Q7O0FBRUQsUUFBTVMsV0FBVyx1QkFBUU4saUJBQU9DLE9BQWYsQ0FBakI7QUFDQSxRQUFNTSxtQkFBbUIsSUFBSUMsMEJBQUosQ0FBcUJGLFFBQXJCLEVBQStCO0FBQ3RERyxpQkFBYVQsaUJBQU9VLEtBQVAsQ0FBYUMsR0FENEI7QUFFdERDLGdCQUFZWixpQkFBT2EsTUFBUCxDQUFjRCxVQUY0QjtBQUd0REUsV0FBTztBQUNMQyxjQUFRO0FBREg7QUFIK0MsR0FBL0IsQ0FBekI7O0FBUUFSLG1CQUFpQlMsTUFBakIsQ0FBd0JoQixpQkFBT2lCLEdBQVAsQ0FBV0MsV0FBbkMsRUFBZ0RsQixpQkFBT2lCLEdBQVAsQ0FBV0UsSUFBM0QsRUFBa0VDLEdBQUQsSUFBUztBQUN4RSxRQUFJQSxHQUFKLEVBQVMsTUFBTSxJQUFJQyxxQkFBSixDQUFnQixvQkFBaEIsRUFBc0NELEdBQXRDLENBQU47QUFDVixHQUZEOztBQUlBYixtQkFBaUJlLFVBQWpCLENBQTRCQyxjQUE1QixDQUEyQyxNQUFNMUIsVUFBakQ7QUFDRCxDQXJCRCIsImZpbGUiOiJkZXYtd2VicGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgUGx1Z2luRXJyb3IgZnJvbSAncGx1Z2luLWVycm9yJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBXZWJwYWNrRGV2U2VydmVyIGZyb20gJ3dlYnBhY2stZGV2LXNlcnZlcidcbmltcG9ydCBsb2cgZnJvbSAnZmFuY3ktbG9nJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmd1bHAudGFzaygnZGV2LXdlYnBhY2snLCAoY2FsbGJhY2spID0+IHtcbiAgaWYgKCFPYmplY3Qua2V5cyhjb25maWcud2VicGFjay5lbnRyeSkubGVuZ3RoKSB7XG4gICAgbG9nLndhcm4oJ1t3ZWJwYWNrXSBub3RoaW5nIHRvIGNvbXBpbGUgeWV0Li4uJylcbiAgICBjYWxsYmFjaygpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBjb21waWxlciA9IHdlYnBhY2soY29uZmlnLndlYnBhY2spXG4gIGNvbnN0IHdlYnBhY2tEZXZTZXJ2ZXIgPSBuZXcgV2VicGFja0RldlNlcnZlcihjb21waWxlciwge1xuICAgIGNvbnRlbnRCYXNlOiBjb25maWcucGF0aHMuZHN0LFxuICAgIHB1YmxpY1BhdGg6IGNvbmZpZy5hc3NldHMucHVibGljUGF0aCxcbiAgICBzdGF0czoge1xuICAgICAgY29sb3JzOiB0cnVlXG4gICAgfVxuICB9KVxuXG4gIHdlYnBhY2tEZXZTZXJ2ZXIubGlzdGVuKGNvbmZpZy5kZXYud2VicGFja1BvcnQsIGNvbmZpZy5kZXYuaG9zdCwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHRocm93IG5ldyBQbHVnaW5FcnJvcignd2VicGFjay1kZXYtc2VydmVyJywgZXJyKVxuICB9KVxuXG4gIHdlYnBhY2tEZXZTZXJ2ZXIubWlkZGxld2FyZS53YWl0VW50aWxWYWxpZCgoKSA9PiBjYWxsYmFjaygpKVxufSlcbiJdfQ==