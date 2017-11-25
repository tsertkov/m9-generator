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

_gulp2.default.task('build-metalsmith', function (callback) {
  return new _metalsmith2.default(_config2.default.paths.root).use((0, _metalsmithDebug2.default)()).clean(false).source(_config2.default.pages.directory).destination(_config2.default.paths.dst).metadata(_extends({}, (0, _loadContent2.default)(_config2.default.contentDir), {
    config: _config2.default
  })).use((0, _m9MetaToFiles2.default)()).use((0, _m9MatterInterpolate2.default)()).use((0, _metalsmithRegisterHelpers2.default)(_config2.default.helpers)).use((0, _metalsmithInPlace2.default)(_config2.default.inplace)).use((0, _metalsmithLayouts2.default)(_config2.default.layouts)).use((0, _m9Permalink2.default)()).use((0, _metalsmithHtmlMinifier2.default)(_config2.default.htmlmin.src, _config2.default.htmlmin.options)).build(function (error) {
    if (error) return callback(error);
    _browserSync2.default.reload();
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1tZXRhbHNtaXRoLmpzIl0sIm5hbWVzIjpbInRhc2siLCJwYXRocyIsInJvb3QiLCJ1c2UiLCJjbGVhbiIsInNvdXJjZSIsInBhZ2VzIiwiZGlyZWN0b3J5IiwiZGVzdGluYXRpb24iLCJkc3QiLCJtZXRhZGF0YSIsImNvbnRlbnREaXIiLCJjb25maWciLCJoZWxwZXJzIiwiaW5wbGFjZSIsImxheW91dHMiLCJodG1sbWluIiwic3JjIiwib3B0aW9ucyIsImJ1aWxkIiwiZXJyb3IiLCJjYWxsYmFjayIsInJlbG9hZCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7O0FBRUEsZUFBS0EsSUFBTCxDQUFVLGtCQUFWLEVBQThCLG9CQUFZO0FBQ3hDLFNBQU8seUJBQWUsaUJBQU9DLEtBQVAsQ0FBYUMsSUFBNUIsRUFDSkMsR0FESSxDQUNBLGdDQURBLEVBRUpDLEtBRkksQ0FFRSxLQUZGLEVBR0pDLE1BSEksQ0FHRyxpQkFBT0MsS0FBUCxDQUFhQyxTQUhoQixFQUlKQyxXQUpJLENBSVEsaUJBQU9QLEtBQVAsQ0FBYVEsR0FKckIsRUFLSkMsUUFMSSxjQU1BLDJCQUFZLGlCQUFPQyxVQUFuQixDQU5BO0FBT0hDO0FBUEcsTUFTSlQsR0FUSSxDQVNBLDhCQVRBLEVBVUpBLEdBVkksQ0FVQSxvQ0FWQSxFQVdKQSxHQVhJLENBV0EseUNBQVEsaUJBQU9VLE9BQWYsQ0FYQSxFQVlKVixHQVpJLENBWUEsaUNBQVEsaUJBQU9XLE9BQWYsQ0FaQSxFQWFKWCxHQWJJLENBYUEsaUNBQVEsaUJBQU9ZLE9BQWYsQ0FiQSxFQWNKWixHQWRJLENBY0EsNEJBZEEsRUFlSkEsR0FmSSxDQWVBLHNDQUFRLGlCQUFPYSxPQUFQLENBQWVDLEdBQXZCLEVBQTRCLGlCQUFPRCxPQUFQLENBQWVFLE9BQTNDLENBZkEsRUFnQkpDLEtBaEJJLENBZ0JFLGlCQUFTO0FBQ2QsUUFBSUMsS0FBSixFQUFXLE9BQU9DLFNBQVNELEtBQVQsQ0FBUDtBQUNYLDBCQUFZRSxNQUFaO0FBQ0FEO0FBQ0QsR0FwQkksQ0FBUDtBQXFCRCxDQXRCRCIsImZpbGUiOiJidWlsZC1tZXRhbHNtaXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBNZXRhbHNtaXRoIGZyb20gJ21ldGFsc21pdGgnXG5pbXBvcnQgYnJvd3NlclN5bmMgZnJvbSAnYnJvd3Nlci1zeW5jJ1xuaW1wb3J0IGlucGxhY2UgZnJvbSAnbWV0YWxzbWl0aC1pbi1wbGFjZSdcbmltcG9ydCBsYXlvdXRzIGZyb20gJ21ldGFsc21pdGgtbGF5b3V0cydcbmltcG9ydCBoZWxwZXJzIGZyb20gJ21ldGFsc21pdGgtcmVnaXN0ZXItaGVscGVycydcbmltcG9ydCBoYW5kbGViYXJzSGVscGVycyBmcm9tICdoYW5kbGViYXJzLWhlbHBlcnMnXG5pbXBvcnQgZGVidWcgZnJvbSAnbWV0YWxzbWl0aC1kZWJ1ZydcbmltcG9ydCBodG1sbWluIGZyb20gJ21ldGFsc21pdGgtaHRtbC1taW5pZmllcidcbmltcG9ydCBsb2FkQ29udGVudCBmcm9tICcuLi9saWIvbG9hZC1jb250ZW50J1xuaW1wb3J0IG05bWV0YVRvRmlsZXMgZnJvbSAnLi4vbGliL21ldGFsc21pdGgtcGx1Z2lucy9tOS1tZXRhLXRvLWZpbGVzJ1xuaW1wb3J0IG05bWF0dGVySW50ZXJwb2xhdGUgZnJvbSAnLi4vbGliL21ldGFsc21pdGgtcGx1Z2lucy9tOS1tYXR0ZXItaW50ZXJwb2xhdGUnXG5pbXBvcnQgbTlwZXJtYWxpbmsgZnJvbSAnLi4vbGliL21ldGFsc21pdGgtcGx1Z2lucy9tOS1wZXJtYWxpbmsnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcblxuLy8gcmVnaXN0ZXIgaGFuZGxlYmFycy1oZWxwZXJzXG5oYW5kbGViYXJzSGVscGVycygpXG5cbmd1bHAudGFzaygnYnVpbGQtbWV0YWxzbWl0aCcsIGNhbGxiYWNrID0+IHtcbiAgcmV0dXJuIG5ldyBNZXRhbHNtaXRoKGNvbmZpZy5wYXRocy5yb290KVxuICAgIC51c2UoZGVidWcoKSlcbiAgICAuY2xlYW4oZmFsc2UpXG4gICAgLnNvdXJjZShjb25maWcucGFnZXMuZGlyZWN0b3J5KVxuICAgIC5kZXN0aW5hdGlvbihjb25maWcucGF0aHMuZHN0KVxuICAgIC5tZXRhZGF0YSh7XG4gICAgICAuLi5sb2FkQ29udGVudChjb25maWcuY29udGVudERpciksXG4gICAgICBjb25maWdcbiAgICB9KVxuICAgIC51c2UobTltZXRhVG9GaWxlcygpKVxuICAgIC51c2UobTltYXR0ZXJJbnRlcnBvbGF0ZSgpKVxuICAgIC51c2UoaGVscGVycyhjb25maWcuaGVscGVycykpXG4gICAgLnVzZShpbnBsYWNlKGNvbmZpZy5pbnBsYWNlKSlcbiAgICAudXNlKGxheW91dHMoY29uZmlnLmxheW91dHMpKVxuICAgIC51c2UobTlwZXJtYWxpbmsoKSlcbiAgICAudXNlKGh0bWxtaW4oY29uZmlnLmh0bWxtaW4uc3JjLCBjb25maWcuaHRtbG1pbi5vcHRpb25zKSlcbiAgICAuYnVpbGQoZXJyb3IgPT4ge1xuICAgICAgaWYgKGVycm9yKSByZXR1cm4gY2FsbGJhY2soZXJyb3IpXG4gICAgICBicm93c2VyU3luYy5yZWxvYWQoKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH0pXG59KVxuIl19