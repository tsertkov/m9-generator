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

_gulp2.default.task('build-metalsmith', function (callback) {
  return new _metalsmith2.default(_config2.default.paths.root).use((0, _metalsmithDebug2.default)()).clean(false).source(_config2.default.pages.directory).destination(_config2.default.paths.dst).metadata(_extends({}, (0, _loadContent2.default)(_config2.default.contentDir), {
    config: _config2.default
  })).use((0, _m9MetaToFiles2.default)()).use((0, _m9MatterInterpolate2.default)()).use((0, _metalsmithRegisterHelpers2.default)(_config2.default.helpers)).use((0, _metalsmithInPlace2.default)(_config2.default.inplace)).use((0, _metalsmithLayouts2.default)(_config2.default.layouts)).use((0, _m9Permalink2.default)()).build(function (error) {
    if (error) return callback(error);
    _browserSync2.default.reload();
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1tZXRhbHNtaXRoLmpzIl0sIm5hbWVzIjpbInRhc2siLCJwYXRocyIsInJvb3QiLCJ1c2UiLCJjbGVhbiIsInNvdXJjZSIsInBhZ2VzIiwiZGlyZWN0b3J5IiwiZGVzdGluYXRpb24iLCJkc3QiLCJtZXRhZGF0YSIsImNvbnRlbnREaXIiLCJjb25maWciLCJoZWxwZXJzIiwiaW5wbGFjZSIsImxheW91dHMiLCJidWlsZCIsImVycm9yIiwiY2FsbGJhY2siLCJyZWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLGVBQUtBLElBQUwsQ0FBVSxrQkFBVixFQUE4QixvQkFBWTtBQUN4QyxTQUFPLHlCQUFlLGlCQUFPQyxLQUFQLENBQWFDLElBQTVCLEVBQ0pDLEdBREksQ0FDQSxnQ0FEQSxFQUVKQyxLQUZJLENBRUUsS0FGRixFQUdKQyxNQUhJLENBR0csaUJBQU9DLEtBQVAsQ0FBYUMsU0FIaEIsRUFJSkMsV0FKSSxDQUlRLGlCQUFPUCxLQUFQLENBQWFRLEdBSnJCLEVBS0pDLFFBTEksY0FNQSwyQkFBWSxpQkFBT0MsVUFBbkIsQ0FOQTtBQU9IQztBQVBHLE1BU0pULEdBVEksQ0FTQSw4QkFUQSxFQVVKQSxHQVZJLENBVUEsb0NBVkEsRUFXSkEsR0FYSSxDQVdBLHlDQUFRLGlCQUFPVSxPQUFmLENBWEEsRUFZSlYsR0FaSSxDQVlBLGlDQUFRLGlCQUFPVyxPQUFmLENBWkEsRUFhSlgsR0FiSSxDQWFBLGlDQUFRLGlCQUFPWSxPQUFmLENBYkEsRUFjSlosR0FkSSxDQWNBLDRCQWRBLEVBZUphLEtBZkksQ0FlRSxpQkFBUztBQUNkLFFBQUlDLEtBQUosRUFBVyxPQUFPQyxTQUFTRCxLQUFULENBQVA7QUFDWCwwQkFBWUUsTUFBWjtBQUNBRDtBQUNELEdBbkJJLENBQVA7QUFvQkQsQ0FyQkQiLCJmaWxlIjoiYnVpbGQtbWV0YWxzbWl0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgTWV0YWxzbWl0aCBmcm9tICdtZXRhbHNtaXRoJ1xuaW1wb3J0IGJyb3dzZXJTeW5jIGZyb20gJ2Jyb3dzZXItc3luYydcbmltcG9ydCBpbnBsYWNlIGZyb20gJ21ldGFsc21pdGgtaW4tcGxhY2UnXG5pbXBvcnQgbGF5b3V0cyBmcm9tICdtZXRhbHNtaXRoLWxheW91dHMnXG5pbXBvcnQgaGVscGVycyBmcm9tICdtZXRhbHNtaXRoLXJlZ2lzdGVyLWhlbHBlcnMnXG5pbXBvcnQgZGVidWcgZnJvbSAnbWV0YWxzbWl0aC1kZWJ1ZydcbmltcG9ydCBsb2FkQ29udGVudCBmcm9tICcuLi9saWIvbG9hZC1jb250ZW50J1xuaW1wb3J0IG05bWV0YVRvRmlsZXMgZnJvbSAnLi4vbGliL205LW1ldGEtdG8tZmlsZXMnXG5pbXBvcnQgbTltYXR0ZXJJbnRlcnBvbGF0ZSBmcm9tICcuLi9saWIvbTktbWF0dGVyLWludGVycG9sYXRlJ1xuaW1wb3J0IG05cGVybWFsaW5rIGZyb20gJy4uL2xpYi9tOS1wZXJtYWxpbmsnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcblxuZ3VscC50YXNrKCdidWlsZC1tZXRhbHNtaXRoJywgY2FsbGJhY2sgPT4ge1xuICByZXR1cm4gbmV3IE1ldGFsc21pdGgoY29uZmlnLnBhdGhzLnJvb3QpXG4gICAgLnVzZShkZWJ1ZygpKVxuICAgIC5jbGVhbihmYWxzZSlcbiAgICAuc291cmNlKGNvbmZpZy5wYWdlcy5kaXJlY3RvcnkpXG4gICAgLmRlc3RpbmF0aW9uKGNvbmZpZy5wYXRocy5kc3QpXG4gICAgLm1ldGFkYXRhKHtcbiAgICAgIC4uLmxvYWRDb250ZW50KGNvbmZpZy5jb250ZW50RGlyKSxcbiAgICAgIGNvbmZpZ1xuICAgIH0pXG4gICAgLnVzZShtOW1ldGFUb0ZpbGVzKCkpXG4gICAgLnVzZShtOW1hdHRlckludGVycG9sYXRlKCkpXG4gICAgLnVzZShoZWxwZXJzKGNvbmZpZy5oZWxwZXJzKSlcbiAgICAudXNlKGlucGxhY2UoY29uZmlnLmlucGxhY2UpKVxuICAgIC51c2UobGF5b3V0cyhjb25maWcubGF5b3V0cykpXG4gICAgLnVzZShtOXBlcm1hbGluaygpKVxuICAgIC5idWlsZChlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHJldHVybiBjYWxsYmFjayhlcnJvcilcbiAgICAgIGJyb3dzZXJTeW5jLnJlbG9hZCgpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfSlcbn0pXG4iXX0=