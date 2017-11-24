'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _metalsmithInPlace = require('metalsmith-in-place');

var _metalsmithInPlace2 = _interopRequireDefault(_metalsmithInPlace);

var _metalsmithLayouts = require('metalsmith-layouts');

var _metalsmithLayouts2 = _interopRequireDefault(_metalsmithLayouts);

var _metalsmithRegisterHelpers = require('metalsmith-register-helpers');

var _metalsmithRegisterHelpers2 = _interopRequireDefault(_metalsmithRegisterHelpers);

var _handlebarsHelpers = require('handlebars-helpers');

var _handlebarsHelpers2 = _interopRequireDefault(_handlebarsHelpers);

var _metalsmithDebug = require('metalsmith-debug');

var _metalsmithDebug2 = _interopRequireDefault(_metalsmithDebug);

var _loadContent = require('../lib/load-content');

var _loadContent2 = _interopRequireDefault(_loadContent);

var _m9MetaToFiles = require('../lib/m9-meta-to-files');

var _m9MetaToFiles2 = _interopRequireDefault(_m9MetaToFiles);

var _m9MatterInterpolate = require('../lib/m9-matter-interpolate');

var _m9MatterInterpolate2 = _interopRequireDefault(_m9MatterInterpolate);

var _m9Permalink = require('../lib/m9-permalink');

var _m9Permalink2 = _interopRequireDefault(_m9Permalink);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// register handlebars-helpers
(0, _handlebarsHelpers2.default)();

_gulp2.default.task('build-metalsmith', function (callback) {
  return new _metalsmith2.default(_config2.default.paths.root).use((0, _metalsmithDebug2.default)()).clean(false).source(_config2.default.pages.directory).destination(_config2.default.paths.dst).metadata(_extends({}, (0, _loadContent2.default)(_config2.default.contentDir), {
    config: _config2.default
  })).use((0, _m9MetaToFiles2.default)()).use((0, _m9MatterInterpolate2.default)()).use((0, _metalsmithRegisterHelpers2.default)(_config2.default.helpers)).use((0, _metalsmithInPlace2.default)(_config2.default.inplace)).use((0, _metalsmithLayouts2.default)(_config2.default.layouts)).use((0, _m9Permalink2.default)()).build(function (error) {
    if (error) return callback(error);
    _browserSync2.default.reload();
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1tZXRhbHNtaXRoLmpzIl0sIm5hbWVzIjpbInRhc2siLCJwYXRocyIsInJvb3QiLCJ1c2UiLCJjbGVhbiIsInNvdXJjZSIsInBhZ2VzIiwiZGlyZWN0b3J5IiwiZGVzdGluYXRpb24iLCJkc3QiLCJtZXRhZGF0YSIsImNvbnRlbnREaXIiLCJjb25maWciLCJoZWxwZXJzIiwiaW5wbGFjZSIsImxheW91dHMiLCJidWlsZCIsImVycm9yIiwiY2FsbGJhY2siLCJyZWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQTs7QUFFQSxlQUFLQSxJQUFMLENBQVUsa0JBQVYsRUFBOEIsb0JBQVk7QUFDeEMsU0FBTyx5QkFBZSxpQkFBT0MsS0FBUCxDQUFhQyxJQUE1QixFQUNKQyxHQURJLENBQ0EsZ0NBREEsRUFFSkMsS0FGSSxDQUVFLEtBRkYsRUFHSkMsTUFISSxDQUdHLGlCQUFPQyxLQUFQLENBQWFDLFNBSGhCLEVBSUpDLFdBSkksQ0FJUSxpQkFBT1AsS0FBUCxDQUFhUSxHQUpyQixFQUtKQyxRQUxJLGNBTUEsMkJBQVksaUJBQU9DLFVBQW5CLENBTkE7QUFPSEM7QUFQRyxNQVNKVCxHQVRJLENBU0EsOEJBVEEsRUFVSkEsR0FWSSxDQVVBLG9DQVZBLEVBV0pBLEdBWEksQ0FXQSx5Q0FBUSxpQkFBT1UsT0FBZixDQVhBLEVBWUpWLEdBWkksQ0FZQSxpQ0FBUSxpQkFBT1csT0FBZixDQVpBLEVBYUpYLEdBYkksQ0FhQSxpQ0FBUSxpQkFBT1ksT0FBZixDQWJBLEVBY0paLEdBZEksQ0FjQSw0QkFkQSxFQWVKYSxLQWZJLENBZUUsaUJBQVM7QUFDZCxRQUFJQyxLQUFKLEVBQVcsT0FBT0MsU0FBU0QsS0FBVCxDQUFQO0FBQ1gsMEJBQVlFLE1BQVo7QUFDQUQ7QUFDRCxHQW5CSSxDQUFQO0FBb0JELENBckJEIiwiZmlsZSI6ImJ1aWxkLW1ldGFsc21pdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ3VscCBmcm9tICdndWxwJ1xuaW1wb3J0IE1ldGFsc21pdGggZnJvbSAnbWV0YWxzbWl0aCdcbmltcG9ydCBicm93c2VyU3luYyBmcm9tICdicm93c2VyLXN5bmMnXG5pbXBvcnQgaW5wbGFjZSBmcm9tICdtZXRhbHNtaXRoLWluLXBsYWNlJ1xuaW1wb3J0IGxheW91dHMgZnJvbSAnbWV0YWxzbWl0aC1sYXlvdXRzJ1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnbWV0YWxzbWl0aC1yZWdpc3Rlci1oZWxwZXJzJ1xuaW1wb3J0IGhhbmRsZWJhcnNIZWxwZXJzIGZyb20gJ2hhbmRsZWJhcnMtaGVscGVycydcbmltcG9ydCBkZWJ1ZyBmcm9tICdtZXRhbHNtaXRoLWRlYnVnJ1xuaW1wb3J0IGxvYWRDb250ZW50IGZyb20gJy4uL2xpYi9sb2FkLWNvbnRlbnQnXG5pbXBvcnQgbTltZXRhVG9GaWxlcyBmcm9tICcuLi9saWIvbTktbWV0YS10by1maWxlcydcbmltcG9ydCBtOW1hdHRlckludGVycG9sYXRlIGZyb20gJy4uL2xpYi9tOS1tYXR0ZXItaW50ZXJwb2xhdGUnXG5pbXBvcnQgbTlwZXJtYWxpbmsgZnJvbSAnLi4vbGliL205LXBlcm1hbGluaydcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG4vLyByZWdpc3RlciBoYW5kbGViYXJzLWhlbHBlcnNcbmhhbmRsZWJhcnNIZWxwZXJzKClcblxuZ3VscC50YXNrKCdidWlsZC1tZXRhbHNtaXRoJywgY2FsbGJhY2sgPT4ge1xuICByZXR1cm4gbmV3IE1ldGFsc21pdGgoY29uZmlnLnBhdGhzLnJvb3QpXG4gICAgLnVzZShkZWJ1ZygpKVxuICAgIC5jbGVhbihmYWxzZSlcbiAgICAuc291cmNlKGNvbmZpZy5wYWdlcy5kaXJlY3RvcnkpXG4gICAgLmRlc3RpbmF0aW9uKGNvbmZpZy5wYXRocy5kc3QpXG4gICAgLm1ldGFkYXRhKHtcbiAgICAgIC4uLmxvYWRDb250ZW50KGNvbmZpZy5jb250ZW50RGlyKSxcbiAgICAgIGNvbmZpZ1xuICAgIH0pXG4gICAgLnVzZShtOW1ldGFUb0ZpbGVzKCkpXG4gICAgLnVzZShtOW1hdHRlckludGVycG9sYXRlKCkpXG4gICAgLnVzZShoZWxwZXJzKGNvbmZpZy5oZWxwZXJzKSlcbiAgICAudXNlKGlucGxhY2UoY29uZmlnLmlucGxhY2UpKVxuICAgIC51c2UobGF5b3V0cyhjb25maWcubGF5b3V0cykpXG4gICAgLnVzZShtOXBlcm1hbGluaygpKVxuICAgIC5idWlsZChlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHJldHVybiBjYWxsYmFjayhlcnJvcilcbiAgICAgIGJyb3dzZXJTeW5jLnJlbG9hZCgpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfSlcbn0pXG4iXX0=