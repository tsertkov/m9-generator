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

var _metalsmithHtmlMinifier = require('metalsmith-html-minifier');

var _metalsmithHtmlMinifier2 = _interopRequireDefault(_metalsmithHtmlMinifier);

var _loadContent = require('../lib/load-content');

var _loadContent2 = _interopRequireDefault(_loadContent);

var _m9MetaToFiles = require('../lib/metalsmith-plugins/m9-meta-to-files');

var _m9MetaToFiles2 = _interopRequireDefault(_m9MetaToFiles);

var _m9MatterInterpolate = require('../lib/metalsmith-plugins/m9-matter-interpolate');

var _m9MatterInterpolate2 = _interopRequireDefault(_m9MatterInterpolate);

var _m9Permalink = require('../lib/metalsmith-plugins/m9-permalink');

var _m9Permalink2 = _interopRequireDefault(_m9Permalink);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// register handlebars-helpers
(0, _handlebarsHelpers2.default)();

_gulp2.default.task('build-metalsmith', callback => {
  return new _metalsmith2.default(_config2.default.paths.cwd).use((0, _metalsmithDebug2.default)()).clean(false).source(_config2.default.pages.directory).destination(_config2.default.paths.dst).metadata(_extends({}, (0, _loadContent2.default)(_config2.default.contentDir), {
    config: _config2.default
  })).use((0, _m9MetaToFiles2.default)(_config2.default.metaToFiles || {})).use((0, _m9MatterInterpolate2.default)()).use((0, _metalsmithRegisterHelpers2.default)(_config2.default.helpers)).use((0, _metalsmithInPlace2.default)(_config2.default.inplace)).use((0, _metalsmithLayouts2.default)(_config2.default.layouts)).use((0, _m9Permalink2.default)()).use((0, _metalsmithHtmlMinifier2.default)(_config2.default.htmlmin)).build(error => {
    if (error) return callback(error);
    _browserSync2.default.reload();
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1tZXRhbHNtaXRoLmpzIl0sIm5hbWVzIjpbImd1bHAiLCJ0YXNrIiwiY2FsbGJhY2siLCJNZXRhbHNtaXRoIiwiY29uZmlnIiwicGF0aHMiLCJjd2QiLCJ1c2UiLCJjbGVhbiIsInNvdXJjZSIsInBhZ2VzIiwiZGlyZWN0b3J5IiwiZGVzdGluYXRpb24iLCJkc3QiLCJtZXRhZGF0YSIsImNvbnRlbnREaXIiLCJtZXRhVG9GaWxlcyIsImhlbHBlcnMiLCJpbnBsYWNlIiwibGF5b3V0cyIsImh0bWxtaW4iLCJidWlsZCIsImVycm9yIiwiYnJvd3NlclN5bmMiLCJyZWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBOztBQUVBQSxlQUFLQyxJQUFMLENBQVUsa0JBQVYsRUFBOEJDLFlBQVk7QUFDeEMsU0FBTyxJQUFJQyxvQkFBSixDQUFlQyxpQkFBT0MsS0FBUCxDQUFhQyxHQUE1QixFQUNKQyxHQURJLENBQ0EsZ0NBREEsRUFFSkMsS0FGSSxDQUVFLEtBRkYsRUFHSkMsTUFISSxDQUdHTCxpQkFBT00sS0FBUCxDQUFhQyxTQUhoQixFQUlKQyxXQUpJLENBSVFSLGlCQUFPQyxLQUFQLENBQWFRLEdBSnJCLEVBS0pDLFFBTEksY0FNQSwyQkFBWVYsaUJBQU9XLFVBQW5CLENBTkE7QUFPSFg7QUFQRyxNQVNKRyxHQVRJLENBU0EsNkJBQWNILGlCQUFPWSxXQUFQLElBQXNCLEVBQXBDLENBVEEsRUFVSlQsR0FWSSxDQVVBLG9DQVZBLEVBV0pBLEdBWEksQ0FXQSx5Q0FBUUgsaUJBQU9hLE9BQWYsQ0FYQSxFQVlKVixHQVpJLENBWUEsaUNBQVFILGlCQUFPYyxPQUFmLENBWkEsRUFhSlgsR0FiSSxDQWFBLGlDQUFRSCxpQkFBT2UsT0FBZixDQWJBLEVBY0paLEdBZEksQ0FjQSw0QkFkQSxFQWVKQSxHQWZJLENBZUEsc0NBQVFILGlCQUFPZ0IsT0FBZixDQWZBLEVBZ0JKQyxLQWhCSSxDQWdCRUMsU0FBUztBQUNkLFFBQUlBLEtBQUosRUFBVyxPQUFPcEIsU0FBU29CLEtBQVQsQ0FBUDtBQUNYQywwQkFBWUMsTUFBWjtBQUNBdEI7QUFDRCxHQXBCSSxDQUFQO0FBcUJELENBdEJEIiwiZmlsZSI6ImJ1aWxkLW1ldGFsc21pdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ3VscCBmcm9tICdndWxwJ1xuaW1wb3J0IE1ldGFsc21pdGggZnJvbSAnbWV0YWxzbWl0aCdcbmltcG9ydCBicm93c2VyU3luYyBmcm9tICdicm93c2VyLXN5bmMnXG5pbXBvcnQgaW5wbGFjZSBmcm9tICdtZXRhbHNtaXRoLWluLXBsYWNlJ1xuaW1wb3J0IGxheW91dHMgZnJvbSAnbWV0YWxzbWl0aC1sYXlvdXRzJ1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnbWV0YWxzbWl0aC1yZWdpc3Rlci1oZWxwZXJzJ1xuaW1wb3J0IGhhbmRsZWJhcnNIZWxwZXJzIGZyb20gJ2hhbmRsZWJhcnMtaGVscGVycydcbmltcG9ydCBkZWJ1ZyBmcm9tICdtZXRhbHNtaXRoLWRlYnVnJ1xuaW1wb3J0IGh0bWxtaW4gZnJvbSAnbWV0YWxzbWl0aC1odG1sLW1pbmlmaWVyJ1xuaW1wb3J0IGxvYWRDb250ZW50IGZyb20gJy4uL2xpYi9sb2FkLWNvbnRlbnQnXG5pbXBvcnQgbTltZXRhVG9GaWxlcyBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMnXG5pbXBvcnQgbTltYXR0ZXJJbnRlcnBvbGF0ZSBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1hdHRlci1pbnRlcnBvbGF0ZSdcbmltcG9ydCBtOXBlcm1hbGluayBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LXBlcm1hbGluaydcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG4vLyByZWdpc3RlciBoYW5kbGViYXJzLWhlbHBlcnNcbmhhbmRsZWJhcnNIZWxwZXJzKClcblxuZ3VscC50YXNrKCdidWlsZC1tZXRhbHNtaXRoJywgY2FsbGJhY2sgPT4ge1xuICByZXR1cm4gbmV3IE1ldGFsc21pdGgoY29uZmlnLnBhdGhzLmN3ZClcbiAgICAudXNlKGRlYnVnKCkpXG4gICAgLmNsZWFuKGZhbHNlKVxuICAgIC5zb3VyY2UoY29uZmlnLnBhZ2VzLmRpcmVjdG9yeSlcbiAgICAuZGVzdGluYXRpb24oY29uZmlnLnBhdGhzLmRzdClcbiAgICAubWV0YWRhdGEoe1xuICAgICAgLi4ubG9hZENvbnRlbnQoY29uZmlnLmNvbnRlbnREaXIpLFxuICAgICAgY29uZmlnXG4gICAgfSlcbiAgICAudXNlKG05bWV0YVRvRmlsZXMoY29uZmlnLm1ldGFUb0ZpbGVzIHx8IHt9KSlcbiAgICAudXNlKG05bWF0dGVySW50ZXJwb2xhdGUoKSlcbiAgICAudXNlKGhlbHBlcnMoY29uZmlnLmhlbHBlcnMpKVxuICAgIC51c2UoaW5wbGFjZShjb25maWcuaW5wbGFjZSkpXG4gICAgLnVzZShsYXlvdXRzKGNvbmZpZy5sYXlvdXRzKSlcbiAgICAudXNlKG05cGVybWFsaW5rKCkpXG4gICAgLnVzZShodG1sbWluKGNvbmZpZy5odG1sbWluKSlcbiAgICAuYnVpbGQoZXJyb3IgPT4ge1xuICAgICAgaWYgKGVycm9yKSByZXR1cm4gY2FsbGJhY2soZXJyb3IpXG4gICAgICBicm93c2VyU3luYy5yZWxvYWQoKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH0pXG59KVxuIl19