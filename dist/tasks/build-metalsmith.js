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
  })).use((0, _m9MetaToFiles2.default)(_config2.default.metaToFiles)).use((0, _m9MatterInterpolate2.default)()).use((0, _metalsmithRegisterHelpers2.default)(_config2.default.helpers)).use((0, _metalsmithInPlace2.default)(_config2.default.inplace)).use((0, _metalsmithLayouts2.default)(_config2.default.layouts)).use((0, _m9Permalink2.default)()).use((0, _metalsmithHtmlMinifier2.default)(_config2.default.htmlmin)).build(function (error) {
    if (error) return callback(error);
    _browserSync2.default.reload();
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1tZXRhbHNtaXRoLmpzIl0sIm5hbWVzIjpbImd1bHAiLCJ0YXNrIiwiTWV0YWxzbWl0aCIsImNvbmZpZyIsInBhdGhzIiwicm9vdCIsInVzZSIsImNsZWFuIiwic291cmNlIiwicGFnZXMiLCJkaXJlY3RvcnkiLCJkZXN0aW5hdGlvbiIsImRzdCIsIm1ldGFkYXRhIiwiY29udGVudERpciIsIm1ldGFUb0ZpbGVzIiwiaGVscGVycyIsImlucGxhY2UiLCJsYXlvdXRzIiwiaHRtbG1pbiIsImJ1aWxkIiwiZXJyb3IiLCJjYWxsYmFjayIsImJyb3dzZXJTeW5jIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQTs7QUFFQUEsZUFBS0MsSUFBTCxDQUFVLGtCQUFWLEVBQThCLG9CQUFZO0FBQ3hDLFNBQU8sSUFBSUMsb0JBQUosQ0FBZUMsaUJBQU9DLEtBQVAsQ0FBYUMsSUFBNUIsRUFDSkMsR0FESSxDQUNBLGdDQURBLEVBRUpDLEtBRkksQ0FFRSxLQUZGLEVBR0pDLE1BSEksQ0FHR0wsaUJBQU9NLEtBQVAsQ0FBYUMsU0FIaEIsRUFJSkMsV0FKSSxDQUlRUixpQkFBT0MsS0FBUCxDQUFhUSxHQUpyQixFQUtKQyxRQUxJLGNBTUEsMkJBQVlWLGlCQUFPVyxVQUFuQixDQU5BO0FBT0hYO0FBUEcsTUFTSkcsR0FUSSxDQVNBLDZCQUFjSCxpQkFBT1ksV0FBckIsQ0FUQSxFQVVKVCxHQVZJLENBVUEsb0NBVkEsRUFXSkEsR0FYSSxDQVdBLHlDQUFRSCxpQkFBT2EsT0FBZixDQVhBLEVBWUpWLEdBWkksQ0FZQSxpQ0FBUUgsaUJBQU9jLE9BQWYsQ0FaQSxFQWFKWCxHQWJJLENBYUEsaUNBQVFILGlCQUFPZSxPQUFmLENBYkEsRUFjSlosR0FkSSxDQWNBLDRCQWRBLEVBZUpBLEdBZkksQ0FlQSxzQ0FBUUgsaUJBQU9nQixPQUFmLENBZkEsRUFnQkpDLEtBaEJJLENBZ0JFLGlCQUFTO0FBQ2QsUUFBSUMsS0FBSixFQUFXLE9BQU9DLFNBQVNELEtBQVQsQ0FBUDtBQUNYRSwwQkFBWUMsTUFBWjtBQUNBRjtBQUNELEdBcEJJLENBQVA7QUFxQkQsQ0F0QkQiLCJmaWxlIjoiYnVpbGQtbWV0YWxzbWl0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgTWV0YWxzbWl0aCBmcm9tICdtZXRhbHNtaXRoJ1xuaW1wb3J0IGJyb3dzZXJTeW5jIGZyb20gJ2Jyb3dzZXItc3luYydcbmltcG9ydCBpbnBsYWNlIGZyb20gJ21ldGFsc21pdGgtaW4tcGxhY2UnXG5pbXBvcnQgbGF5b3V0cyBmcm9tICdtZXRhbHNtaXRoLWxheW91dHMnXG5pbXBvcnQgaGVscGVycyBmcm9tICdtZXRhbHNtaXRoLXJlZ2lzdGVyLWhlbHBlcnMnXG5pbXBvcnQgaGFuZGxlYmFyc0hlbHBlcnMgZnJvbSAnaGFuZGxlYmFycy1oZWxwZXJzJ1xuaW1wb3J0IGRlYnVnIGZyb20gJ21ldGFsc21pdGgtZGVidWcnXG5pbXBvcnQgaHRtbG1pbiBmcm9tICdtZXRhbHNtaXRoLWh0bWwtbWluaWZpZXInXG5pbXBvcnQgbG9hZENvbnRlbnQgZnJvbSAnLi4vbGliL2xvYWQtY29udGVudCdcbmltcG9ydCBtOW1ldGFUb0ZpbGVzIGZyb20gJy4uL2xpYi9tZXRhbHNtaXRoLXBsdWdpbnMvbTktbWV0YS10by1maWxlcydcbmltcG9ydCBtOW1hdHRlckludGVycG9sYXRlIGZyb20gJy4uL2xpYi9tZXRhbHNtaXRoLXBsdWdpbnMvbTktbWF0dGVyLWludGVycG9sYXRlJ1xuaW1wb3J0IG05cGVybWFsaW5rIGZyb20gJy4uL2xpYi9tZXRhbHNtaXRoLXBsdWdpbnMvbTktcGVybWFsaW5rJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbi8vIHJlZ2lzdGVyIGhhbmRsZWJhcnMtaGVscGVyc1xuaGFuZGxlYmFyc0hlbHBlcnMoKVxuXG5ndWxwLnRhc2soJ2J1aWxkLW1ldGFsc21pdGgnLCBjYWxsYmFjayA9PiB7XG4gIHJldHVybiBuZXcgTWV0YWxzbWl0aChjb25maWcucGF0aHMucm9vdClcbiAgICAudXNlKGRlYnVnKCkpXG4gICAgLmNsZWFuKGZhbHNlKVxuICAgIC5zb3VyY2UoY29uZmlnLnBhZ2VzLmRpcmVjdG9yeSlcbiAgICAuZGVzdGluYXRpb24oY29uZmlnLnBhdGhzLmRzdClcbiAgICAubWV0YWRhdGEoe1xuICAgICAgLi4ubG9hZENvbnRlbnQoY29uZmlnLmNvbnRlbnREaXIpLFxuICAgICAgY29uZmlnXG4gICAgfSlcbiAgICAudXNlKG05bWV0YVRvRmlsZXMoY29uZmlnLm1ldGFUb0ZpbGVzKSlcbiAgICAudXNlKG05bWF0dGVySW50ZXJwb2xhdGUoKSlcbiAgICAudXNlKGhlbHBlcnMoY29uZmlnLmhlbHBlcnMpKVxuICAgIC51c2UoaW5wbGFjZShjb25maWcuaW5wbGFjZSkpXG4gICAgLnVzZShsYXlvdXRzKGNvbmZpZy5sYXlvdXRzKSlcbiAgICAudXNlKG05cGVybWFsaW5rKCkpXG4gICAgLnVzZShodG1sbWluKGNvbmZpZy5odG1sbWluKSlcbiAgICAuYnVpbGQoZXJyb3IgPT4ge1xuICAgICAgaWYgKGVycm9yKSByZXR1cm4gY2FsbGJhY2soZXJyb3IpXG4gICAgICBicm93c2VyU3luYy5yZWxvYWQoKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH0pXG59KVxuIl19