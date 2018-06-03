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

var _fs = require('fs');

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
  const metalsmith = new _metalsmith2.default(_config2.default.paths.cwd).use((0, _metalsmithDebug2.default)()).clean(false).source(_config2.default.pages.directory).destination(_config2.default.paths.dst).metadata(_extends({}, (0, _loadContent2.default)(_config2.default.contentDir), {
    config: _config2.default
  })).use((0, _m9MetaToFiles2.default)(_config2.default.metaToFiles || {})).use((0, _m9MatterInterpolate2.default)()).use((0, _metalsmithRegisterHelpers2.default)(_config2.default.helpers)).use((0, _metalsmithInPlace2.default)(_config2.default.inplace));

  if ((0, _fs.existsSync)(_config2.default.layouts.directory) && (0, _fs.readdirSync)(_config2.default.layouts.directory).length) {
    metalsmith.use((0, _metalsmithLayouts2.default)(_config2.default.layouts));
  }

  metalsmith.use((0, _m9Permalink2.default)()).use((0, _metalsmithHtmlMinifier2.default)(_config2.default.htmlmin)).build(error => {
    if (error) return callback(error);
    _browserSync2.default.reload();
    callback();
  });

  return metalsmith;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1tZXRhbHNtaXRoLmpzIl0sIm5hbWVzIjpbImd1bHAiLCJ0YXNrIiwiY2FsbGJhY2siLCJtZXRhbHNtaXRoIiwiTWV0YWxzbWl0aCIsImNvbmZpZyIsInBhdGhzIiwiY3dkIiwidXNlIiwiY2xlYW4iLCJzb3VyY2UiLCJwYWdlcyIsImRpcmVjdG9yeSIsImRlc3RpbmF0aW9uIiwiZHN0IiwibWV0YWRhdGEiLCJjb250ZW50RGlyIiwibWV0YVRvRmlsZXMiLCJoZWxwZXJzIiwiaW5wbGFjZSIsImxheW91dHMiLCJsZW5ndGgiLCJodG1sbWluIiwiYnVpbGQiLCJlcnJvciIsImJyb3dzZXJTeW5jIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQTs7QUFFQUEsZUFBS0MsSUFBTCxDQUFVLGtCQUFWLEVBQThCQyxZQUFZO0FBQ3hDLFFBQU1DLGFBQWEsSUFBSUMsb0JBQUosQ0FBZUMsaUJBQU9DLEtBQVAsQ0FBYUMsR0FBNUIsRUFDaEJDLEdBRGdCLENBQ1osZ0NBRFksRUFFaEJDLEtBRmdCLENBRVYsS0FGVSxFQUdoQkMsTUFIZ0IsQ0FHVEwsaUJBQU9NLEtBQVAsQ0FBYUMsU0FISixFQUloQkMsV0FKZ0IsQ0FJSlIsaUJBQU9DLEtBQVAsQ0FBYVEsR0FKVCxFQUtoQkMsUUFMZ0IsY0FNWiwyQkFBWVYsaUJBQU9XLFVBQW5CLENBTlk7QUFPZlg7QUFQZSxNQVNoQkcsR0FUZ0IsQ0FTWiw2QkFBY0gsaUJBQU9ZLFdBQVAsSUFBc0IsRUFBcEMsQ0FUWSxFQVVoQlQsR0FWZ0IsQ0FVWixvQ0FWWSxFQVdoQkEsR0FYZ0IsQ0FXWix5Q0FBUUgsaUJBQU9hLE9BQWYsQ0FYWSxFQVloQlYsR0FaZ0IsQ0FZWixpQ0FBUUgsaUJBQU9jLE9BQWYsQ0FaWSxDQUFuQjs7QUFjQSxNQUNFLG9CQUFXZCxpQkFBT2UsT0FBUCxDQUFlUixTQUExQixLQUNBLHFCQUFZUCxpQkFBT2UsT0FBUCxDQUFlUixTQUEzQixFQUFzQ1MsTUFGeEMsRUFHRTtBQUNBbEIsZUFBV0ssR0FBWCxDQUFlLGlDQUFRSCxpQkFBT2UsT0FBZixDQUFmO0FBQ0Q7O0FBRURqQixhQUNHSyxHQURILENBQ08sNEJBRFAsRUFFR0EsR0FGSCxDQUVPLHNDQUFRSCxpQkFBT2lCLE9BQWYsQ0FGUCxFQUdHQyxLQUhILENBR1NDLFNBQVM7QUFDZCxRQUFJQSxLQUFKLEVBQVcsT0FBT3RCLFNBQVNzQixLQUFULENBQVA7QUFDWEMsMEJBQVlDLE1BQVo7QUFDQXhCO0FBQ0QsR0FQSDs7QUFTQSxTQUFPQyxVQUFQO0FBQ0QsQ0FoQ0QiLCJmaWxlIjoiYnVpbGQtbWV0YWxzbWl0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgTWV0YWxzbWl0aCBmcm9tICdtZXRhbHNtaXRoJ1xuaW1wb3J0IGJyb3dzZXJTeW5jIGZyb20gJ2Jyb3dzZXItc3luYydcbmltcG9ydCBpbnBsYWNlIGZyb20gJ21ldGFsc21pdGgtaW4tcGxhY2UnXG5pbXBvcnQgbGF5b3V0cyBmcm9tICdtZXRhbHNtaXRoLWxheW91dHMnXG5pbXBvcnQgaGVscGVycyBmcm9tICdtZXRhbHNtaXRoLXJlZ2lzdGVyLWhlbHBlcnMnXG5pbXBvcnQgaGFuZGxlYmFyc0hlbHBlcnMgZnJvbSAnaGFuZGxlYmFycy1oZWxwZXJzJ1xuaW1wb3J0IGRlYnVnIGZyb20gJ21ldGFsc21pdGgtZGVidWcnXG5pbXBvcnQgaHRtbG1pbiBmcm9tICdtZXRhbHNtaXRoLWh0bWwtbWluaWZpZXInXG5pbXBvcnQgeyByZWFkZGlyU3luYywgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IGxvYWRDb250ZW50IGZyb20gJy4uL2xpYi9sb2FkLWNvbnRlbnQnXG5pbXBvcnQgbTltZXRhVG9GaWxlcyBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMnXG5pbXBvcnQgbTltYXR0ZXJJbnRlcnBvbGF0ZSBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1hdHRlci1pbnRlcnBvbGF0ZSdcbmltcG9ydCBtOXBlcm1hbGluayBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LXBlcm1hbGluaydcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG4vLyByZWdpc3RlciBoYW5kbGViYXJzLWhlbHBlcnNcbmhhbmRsZWJhcnNIZWxwZXJzKClcblxuZ3VscC50YXNrKCdidWlsZC1tZXRhbHNtaXRoJywgY2FsbGJhY2sgPT4ge1xuICBjb25zdCBtZXRhbHNtaXRoID0gbmV3IE1ldGFsc21pdGgoY29uZmlnLnBhdGhzLmN3ZClcbiAgICAudXNlKGRlYnVnKCkpXG4gICAgLmNsZWFuKGZhbHNlKVxuICAgIC5zb3VyY2UoY29uZmlnLnBhZ2VzLmRpcmVjdG9yeSlcbiAgICAuZGVzdGluYXRpb24oY29uZmlnLnBhdGhzLmRzdClcbiAgICAubWV0YWRhdGEoe1xuICAgICAgLi4ubG9hZENvbnRlbnQoY29uZmlnLmNvbnRlbnREaXIpLFxuICAgICAgY29uZmlnXG4gICAgfSlcbiAgICAudXNlKG05bWV0YVRvRmlsZXMoY29uZmlnLm1ldGFUb0ZpbGVzIHx8IHt9KSlcbiAgICAudXNlKG05bWF0dGVySW50ZXJwb2xhdGUoKSlcbiAgICAudXNlKGhlbHBlcnMoY29uZmlnLmhlbHBlcnMpKVxuICAgIC51c2UoaW5wbGFjZShjb25maWcuaW5wbGFjZSkpXG5cbiAgaWYgKFxuICAgIGV4aXN0c1N5bmMoY29uZmlnLmxheW91dHMuZGlyZWN0b3J5KSAmJlxuICAgIHJlYWRkaXJTeW5jKGNvbmZpZy5sYXlvdXRzLmRpcmVjdG9yeSkubGVuZ3RoXG4gICkge1xuICAgIG1ldGFsc21pdGgudXNlKGxheW91dHMoY29uZmlnLmxheW91dHMpKVxuICB9XG5cbiAgbWV0YWxzbWl0aFxuICAgIC51c2UobTlwZXJtYWxpbmsoKSlcbiAgICAudXNlKGh0bWxtaW4oY29uZmlnLmh0bWxtaW4pKVxuICAgIC5idWlsZChlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHJldHVybiBjYWxsYmFjayhlcnJvcilcbiAgICAgIGJyb3dzZXJTeW5jLnJlbG9hZCgpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfSlcblxuICByZXR1cm4gbWV0YWxzbWl0aFxufSlcbiJdfQ==