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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kZXYtYnJvd3NlcnN5bmMuanMiXSwibmFtZXMiOlsid2VicGFja1NuaXBwZXQiLCJndWxwIiwidGFzayIsImJyb3dzZXJTeW5jIiwiaW5pdCIsIm9wZW4iLCJub3RpZnkiLCJodHRwcyIsInByb3h5IiwidGFyZ2V0IiwiY29uZmlnIiwiZGV2IiwiaG9zdCIsIndlYnBhY2tQb3J0Iiwid3MiLCJzbmlwcGV0T3B0aW9ucyIsInJ1bGUiLCJtYXRjaCIsImZuIiwic25pcHBldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixzREFBdkI7O0FBRUFDLGVBQUtDLElBQUwsQ0FBVSxpQkFBVixFQUE2QixZQUFNO0FBQ2pDQyx3QkFBWUMsSUFBWixDQUFpQjtBQUNmQyxVQUFNLEtBRFM7QUFFZkMsWUFBUSxLQUZPO0FBR2ZDLFdBQU8sSUFIUTtBQUlmQyxXQUFPO0FBQ0xDLGNBQVdDLGlCQUFPQyxHQUFQLENBQVdDLElBQXRCLFNBQThCRixpQkFBT0MsR0FBUCxDQUFXRSxXQURwQztBQUVMQyxVQUFJO0FBRkMsS0FKUTtBQVFmQyxvQkFBZ0I7QUFDZEMsWUFBTTtBQUNKQyxlQUFPLGNBREg7QUFFSkMsWUFBSSxZQUFDQyxPQUFELEVBQVVGLEtBQVY7QUFBQSxpQkFBcUJBLFFBQVFFLE9BQVIsR0FBa0JuQixjQUF2QztBQUFBO0FBRkE7QUFEUTtBQVJELEdBQWpCO0FBZUQsQ0FoQkQiLCJmaWxlIjoiZGV2LWJyb3dzZXJzeW5jLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBicm93c2VyU3luYyBmcm9tICdicm93c2VyLXN5bmMnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcblxuY29uc3Qgd2VicGFja1NuaXBwZXQgPSAnPHNjcmlwdCBhc3luYyBzcmM9XCIvd2VicGFjay1kZXYtc2VydmVyLmpzXCI+PC9zY3JpcHQ+J1xuXG5ndWxwLnRhc2soJ2Rldi1icm93c2Vyc3luYycsICgpID0+IHtcbiAgYnJvd3NlclN5bmMuaW5pdCh7XG4gICAgb3BlbjogZmFsc2UsXG4gICAgbm90aWZ5OiBmYWxzZSxcbiAgICBodHRwczogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgdGFyZ2V0OiBgJHtjb25maWcuZGV2Lmhvc3R9OiR7Y29uZmlnLmRldi53ZWJwYWNrUG9ydH1gLFxuICAgICAgd3M6IHRydWVcbiAgICB9LFxuICAgIHNuaXBwZXRPcHRpb25zOiB7XG4gICAgICBydWxlOiB7XG4gICAgICAgIG1hdGNoOiAvPGJvZHlbXj5dKj4vaSxcbiAgICAgICAgZm46IChzbmlwcGV0LCBtYXRjaCkgPT4gKG1hdGNoICsgc25pcHBldCArIHdlYnBhY2tTbmlwcGV0KVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn0pXG4iXX0=