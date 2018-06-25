'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bsServer = _browserSync2.default.create();
const compiler = (0, _webpack2.default)(_config2.default.webpack);
const webpackSnippet = '<script async src="/assets/webpack-hot-middleware-client.js"></script>';

_gulp2.default.task('dev-browsersync', callback => {
  const hotMiddleware = (0, _webpackHotMiddleware2.default)(compiler);
  const devMiddleware = (0, _webpackDevMiddleware2.default)(compiler, {
    publicPath: _config2.default.assets.publicPath,
    stats: {
      colors: true,
      context: _config2.default.paths.src
    }
  });

  devMiddleware.waitUntilValid(() => {
    // return early from task
    callback();
    // and start browserSync in background
    bsServer.init({
      open: false,
      notify: false,
      snippetOptions: {
        rule: {
          match: /<body[^>]*>/i,
          fn: (snippet, match) => match + snippet + webpackSnippet
        }
      },
      server: {
        https: true,
        baseDir: _config2.default.paths.dst,
        middleware: [devMiddleware, hotMiddleware]
      }
    });

    bsServer.watch(_path2.default.join(_config2.default.paths.dst, '**/*.html')).on('change', bsServer.reload);

    // FIME remove following line when HMR works again
    bsServer.watch(_path2.default.join(_config2.default.assets.dst, _config2.default.assets.manifest)).on('change', bsServer.reload);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kZXYtYnJvd3NlcnN5bmMuanMiXSwibmFtZXMiOlsiYnNTZXJ2ZXIiLCJicm93c2VyU3luYyIsImNyZWF0ZSIsImNvbXBpbGVyIiwiY29uZmlnIiwid2VicGFjayIsIndlYnBhY2tTbmlwcGV0IiwiZ3VscCIsInRhc2siLCJjYWxsYmFjayIsImhvdE1pZGRsZXdhcmUiLCJkZXZNaWRkbGV3YXJlIiwicHVibGljUGF0aCIsImFzc2V0cyIsInN0YXRzIiwiY29sb3JzIiwiY29udGV4dCIsInBhdGhzIiwic3JjIiwid2FpdFVudGlsVmFsaWQiLCJpbml0Iiwib3BlbiIsIm5vdGlmeSIsInNuaXBwZXRPcHRpb25zIiwicnVsZSIsIm1hdGNoIiwiZm4iLCJzbmlwcGV0Iiwic2VydmVyIiwiaHR0cHMiLCJiYXNlRGlyIiwiZHN0IiwibWlkZGxld2FyZSIsIndhdGNoIiwicGF0aCIsImpvaW4iLCJvbiIsInJlbG9hZCIsIm1hbmlmZXN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxXQUFXQyxzQkFBWUMsTUFBWixFQUFqQjtBQUNBLE1BQU1DLFdBQVcsdUJBQVFDLGlCQUFPQyxPQUFmLENBQWpCO0FBQ0EsTUFBTUMsaUJBQWlCLHdFQUF2Qjs7QUFFQUMsZUFBS0MsSUFBTCxDQUFVLGlCQUFWLEVBQThCQyxRQUFELElBQWM7QUFDekMsUUFBTUMsZ0JBQWdCLG9DQUFxQlAsUUFBckIsQ0FBdEI7QUFDQSxRQUFNUSxnQkFBZ0Isb0NBQXFCUixRQUFyQixFQUErQjtBQUNuRFMsZ0JBQVlSLGlCQUFPUyxNQUFQLENBQWNELFVBRHlCO0FBRW5ERSxXQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxlQUFTWixpQkFBT2EsS0FBUCxDQUFhQztBQUZqQjtBQUY0QyxHQUEvQixDQUF0Qjs7QUFRQVAsZ0JBQWNRLGNBQWQsQ0FBNkIsTUFBTTtBQUNqQztBQUNBVjtBQUNBO0FBQ0FULGFBQVNvQixJQUFULENBQWM7QUFDWkMsWUFBTSxLQURNO0FBRVpDLGNBQVEsS0FGSTtBQUdaQyxzQkFBZ0I7QUFDZEMsY0FBTTtBQUNKQyxpQkFBTyxjQURIO0FBRUpDLGNBQUksQ0FBQ0MsT0FBRCxFQUFVRixLQUFWLEtBQXFCQSxRQUFRRSxPQUFSLEdBQWtCckI7QUFGdkM7QUFEUSxPQUhKO0FBU1pzQixjQUFRO0FBQ05DLGVBQU8sSUFERDtBQUVOQyxpQkFBUzFCLGlCQUFPYSxLQUFQLENBQWFjLEdBRmhCO0FBR05DLG9CQUFZLENBQ1ZyQixhQURVLEVBRVZELGFBRlU7QUFITjtBQVRJLEtBQWQ7O0FBbUJBVixhQUNHaUMsS0FESCxDQUNTQyxlQUFLQyxJQUFMLENBQVUvQixpQkFBT2EsS0FBUCxDQUFhYyxHQUF2QixFQUE0QixXQUE1QixDQURULEVBRUdLLEVBRkgsQ0FFTSxRQUZOLEVBRWdCcEMsU0FBU3FDLE1BRnpCOztBQUlBO0FBQ0FyQyxhQUNHaUMsS0FESCxDQUNTQyxlQUFLQyxJQUFMLENBQVUvQixpQkFBT1MsTUFBUCxDQUFja0IsR0FBeEIsRUFBNkIzQixpQkFBT1MsTUFBUCxDQUFjeUIsUUFBM0MsQ0FEVCxFQUVHRixFQUZILENBRU0sUUFGTixFQUVnQnBDLFNBQVNxQyxNQUZ6QjtBQUdELEdBL0JEO0FBZ0NELENBMUNEIiwiZmlsZSI6ImRldi1icm93c2Vyc3luYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgYnJvd3NlclN5bmMgZnJvbSAnYnJvd3Nlci1zeW5jJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCB3ZWJwYWNrRGV2TWlkZGxld2FyZSBmcm9tICd3ZWJwYWNrLWRldi1taWRkbGV3YXJlJ1xuaW1wb3J0IHdlYnBhY2tIb3RNaWRkbGV3YXJlIGZyb20gJ3dlYnBhY2staG90LW1pZGRsZXdhcmUnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IGJzU2VydmVyID0gYnJvd3NlclN5bmMuY3JlYXRlKClcbmNvbnN0IGNvbXBpbGVyID0gd2VicGFjayhjb25maWcud2VicGFjaylcbmNvbnN0IHdlYnBhY2tTbmlwcGV0ID0gJzxzY3JpcHQgYXN5bmMgc3JjPVwiL2Fzc2V0cy93ZWJwYWNrLWhvdC1taWRkbGV3YXJlLWNsaWVudC5qc1wiPjwvc2NyaXB0PidcblxuZ3VscC50YXNrKCdkZXYtYnJvd3NlcnN5bmMnLCAoY2FsbGJhY2spID0+IHtcbiAgY29uc3QgaG90TWlkZGxld2FyZSA9IHdlYnBhY2tIb3RNaWRkbGV3YXJlKGNvbXBpbGVyKVxuICBjb25zdCBkZXZNaWRkbGV3YXJlID0gd2VicGFja0Rldk1pZGRsZXdhcmUoY29tcGlsZXIsIHtcbiAgICBwdWJsaWNQYXRoOiBjb25maWcuYXNzZXRzLnB1YmxpY1BhdGgsXG4gICAgc3RhdHM6IHtcbiAgICAgIGNvbG9yczogdHJ1ZSxcbiAgICAgIGNvbnRleHQ6IGNvbmZpZy5wYXRocy5zcmNcbiAgICB9XG4gIH0pXG5cbiAgZGV2TWlkZGxld2FyZS53YWl0VW50aWxWYWxpZCgoKSA9PiB7XG4gICAgLy8gcmV0dXJuIGVhcmx5IGZyb20gdGFza1xuICAgIGNhbGxiYWNrKClcbiAgICAvLyBhbmQgc3RhcnQgYnJvd3NlclN5bmMgaW4gYmFja2dyb3VuZFxuICAgIGJzU2VydmVyLmluaXQoe1xuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBub3RpZnk6IGZhbHNlLFxuICAgICAgc25pcHBldE9wdGlvbnM6IHtcbiAgICAgICAgcnVsZToge1xuICAgICAgICAgIG1hdGNoOiAvPGJvZHlbXj5dKj4vaSxcbiAgICAgICAgICBmbjogKHNuaXBwZXQsIG1hdGNoKSA9PiAobWF0Y2ggKyBzbmlwcGV0ICsgd2VicGFja1NuaXBwZXQpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgaHR0cHM6IHRydWUsXG4gICAgICAgIGJhc2VEaXI6IGNvbmZpZy5wYXRocy5kc3QsXG4gICAgICAgIG1pZGRsZXdhcmU6IFtcbiAgICAgICAgICBkZXZNaWRkbGV3YXJlLFxuICAgICAgICAgIGhvdE1pZGRsZXdhcmVcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBic1NlcnZlclxuICAgICAgLndhdGNoKHBhdGguam9pbihjb25maWcucGF0aHMuZHN0LCAnKiovKi5odG1sJykpXG4gICAgICAub24oJ2NoYW5nZScsIGJzU2VydmVyLnJlbG9hZClcblxuICAgIC8vIEZJTUUgcmVtb3ZlIGZvbGxvd2luZyBsaW5lIHdoZW4gSE1SIHdvcmtzIGFnYWluXG4gICAgYnNTZXJ2ZXJcbiAgICAgIC53YXRjaChwYXRoLmpvaW4oY29uZmlnLmFzc2V0cy5kc3QsIGNvbmZpZy5hc3NldHMubWFuaWZlc3QpKVxuICAgICAgLm9uKCdjaGFuZ2UnLCBic1NlcnZlci5yZWxvYWQpXG4gIH0pXG59KVxuIl19