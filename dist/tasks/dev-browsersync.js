'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const webpackSnippet = '<script async src="/webpack-dev-server.js"></script>';

_gulp2.default.task('dev-browsersync', () => {
  _browserSync2.default.init({
    open: false,
    notify: false,
    https: true,
    proxy: {
      target: `${_config2.default.dev.host}:${_config2.default.dev.webpackPort}`,
      ws: true
    },
    snippetOptions: {
      rule: {
        match: /<body[^>]*>/i,
        fn: (snippet, match) => match + snippet + webpackSnippet
      }
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kZXYtYnJvd3NlcnN5bmMuanMiXSwibmFtZXMiOlsid2VicGFja1NuaXBwZXQiLCJndWxwIiwidGFzayIsImJyb3dzZXJTeW5jIiwiaW5pdCIsIm9wZW4iLCJub3RpZnkiLCJodHRwcyIsInByb3h5IiwidGFyZ2V0IiwiY29uZmlnIiwiZGV2IiwiaG9zdCIsIndlYnBhY2tQb3J0Iiwid3MiLCJzbmlwcGV0T3B0aW9ucyIsInJ1bGUiLCJtYXRjaCIsImZuIiwic25pcHBldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLGlCQUFpQixzREFBdkI7O0FBRUFDLGVBQUtDLElBQUwsQ0FBVSxpQkFBVixFQUE2QixNQUFNO0FBQ2pDQyx3QkFBWUMsSUFBWixDQUFpQjtBQUNmQyxVQUFNLEtBRFM7QUFFZkMsWUFBUSxLQUZPO0FBR2ZDLFdBQU8sSUFIUTtBQUlmQyxXQUFPO0FBQ0xDLGNBQVMsR0FBRUMsaUJBQU9DLEdBQVAsQ0FBV0MsSUFBSyxJQUFHRixpQkFBT0MsR0FBUCxDQUFXRSxXQUFZLEVBRGhEO0FBRUxDLFVBQUk7QUFGQyxLQUpRO0FBUWZDLG9CQUFnQjtBQUNkQyxZQUFNO0FBQ0pDLGVBQU8sY0FESDtBQUVKQyxZQUFJLENBQUNDLE9BQUQsRUFBVUYsS0FBVixLQUFxQkEsUUFBUUUsT0FBUixHQUFrQm5CO0FBRnZDO0FBRFE7QUFSRCxHQUFqQjtBQWVELENBaEJEIiwiZmlsZSI6ImRldi1icm93c2Vyc3luYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgYnJvd3NlclN5bmMgZnJvbSAnYnJvd3Nlci1zeW5jJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IHdlYnBhY2tTbmlwcGV0ID0gJzxzY3JpcHQgYXN5bmMgc3JjPVwiL3dlYnBhY2stZGV2LXNlcnZlci5qc1wiPjwvc2NyaXB0PidcblxuZ3VscC50YXNrKCdkZXYtYnJvd3NlcnN5bmMnLCAoKSA9PiB7XG4gIGJyb3dzZXJTeW5jLmluaXQoe1xuICAgIG9wZW46IGZhbHNlLFxuICAgIG5vdGlmeTogZmFsc2UsXG4gICAgaHR0cHM6IHRydWUsXG4gICAgcHJveHk6IHtcbiAgICAgIHRhcmdldDogYCR7Y29uZmlnLmRldi5ob3N0fToke2NvbmZpZy5kZXYud2VicGFja1BvcnR9YCxcbiAgICAgIHdzOiB0cnVlXG4gICAgfSxcbiAgICBzbmlwcGV0T3B0aW9uczoge1xuICAgICAgcnVsZToge1xuICAgICAgICBtYXRjaDogLzxib2R5W14+XSo+L2ksXG4gICAgICAgIGZuOiAoc25pcHBldCwgbWF0Y2gpID0+IChtYXRjaCArIHNuaXBwZXQgKyB3ZWJwYWNrU25pcHBldClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59KVxuIl19