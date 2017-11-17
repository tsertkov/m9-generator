'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpackSnippet = '<script async src="/webpack-dev-server.js"></script>';

_gulp2.default.task('dev-browsersync', function () {
  _browserSync2.default.init({
    open: false,
    notify: false,
    https: true,
    proxy: {
      target: _config2.default.dev.host + ':' + _config2.default.dev.webpackPort,
      ws: true
    },
    snippetOptions: {
      rule: {
        match: /<body[^>]*>/i,
        fn: function fn(snippet, match) {
          return match + snippet + webpackSnippet;
        }
      }
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kZXYtYnJvd3NlcnN5bmMuanMiXSwibmFtZXMiOlsid2VicGFja1NuaXBwZXQiLCJ0YXNrIiwiaW5pdCIsIm9wZW4iLCJub3RpZnkiLCJodHRwcyIsInByb3h5IiwidGFyZ2V0IiwiZGV2IiwiaG9zdCIsIndlYnBhY2tQb3J0Iiwid3MiLCJzbmlwcGV0T3B0aW9ucyIsInJ1bGUiLCJtYXRjaCIsImZuIiwic25pcHBldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixzREFBdkI7O0FBRUEsZUFBS0MsSUFBTCxDQUFVLGlCQUFWLEVBQTZCLFlBQU07QUFDakMsd0JBQVlDLElBQVosQ0FBaUI7QUFDZkMsVUFBTSxLQURTO0FBRWZDLFlBQVEsS0FGTztBQUdmQyxXQUFPLElBSFE7QUFJZkMsV0FBTztBQUNMQyxjQUFXLGlCQUFPQyxHQUFQLENBQVdDLElBQXRCLFNBQThCLGlCQUFPRCxHQUFQLENBQVdFLFdBRHBDO0FBRUxDLFVBQUk7QUFGQyxLQUpRO0FBUWZDLG9CQUFnQjtBQUNkQyxZQUFNO0FBQ0pDLGVBQU8sY0FESDtBQUVKQyxZQUFJLFlBQUNDLE9BQUQsRUFBVUYsS0FBVjtBQUFBLGlCQUFxQkEsUUFBUUUsT0FBUixHQUFrQmhCLGNBQXZDO0FBQUE7QUFGQTtBQURRO0FBUkQsR0FBakI7QUFlRCxDQWhCRCIsImZpbGUiOiJkZXYtYnJvd3NlcnN5bmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ3VscCBmcm9tICdndWxwJ1xuaW1wb3J0IGJyb3dzZXJTeW5jIGZyb20gJ2Jyb3dzZXItc3luYydcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG5jb25zdCB3ZWJwYWNrU25pcHBldCA9ICc8c2NyaXB0IGFzeW5jIHNyYz1cIi93ZWJwYWNrLWRldi1zZXJ2ZXIuanNcIj48L3NjcmlwdD4nXG5cbmd1bHAudGFzaygnZGV2LWJyb3dzZXJzeW5jJywgKCkgPT4ge1xuICBicm93c2VyU3luYy5pbml0KHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgICBub3RpZnk6IGZhbHNlLFxuICAgIGh0dHBzOiB0cnVlLFxuICAgIHByb3h5OiB7XG4gICAgICB0YXJnZXQ6IGAke2NvbmZpZy5kZXYuaG9zdH06JHtjb25maWcuZGV2LndlYnBhY2tQb3J0fWAsXG4gICAgICB3czogdHJ1ZVxuICAgIH0sXG4gICAgc25pcHBldE9wdGlvbnM6IHtcbiAgICAgIHJ1bGU6IHtcbiAgICAgICAgbWF0Y2g6IC88Ym9keVtePl0qPi9pLFxuICAgICAgICBmbjogKHNuaXBwZXQsIG1hdGNoKSA9PiAobWF0Y2ggKyBzbmlwcGV0ICsgd2VicGFja1NuaXBwZXQpXG4gICAgICB9XG4gICAgfVxuICB9KVxufSlcbiJdfQ==