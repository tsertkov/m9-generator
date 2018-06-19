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

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

var _metalsmithRegisterHelpers = require('metalsmith-register-helpers');

var _metalsmithRegisterHelpers2 = _interopRequireDefault(_metalsmithRegisterHelpers);

var _handlebarsHelpers = require('handlebars-helpers');

var _handlebarsHelpers2 = _interopRequireDefault(_handlebarsHelpers);

var _metalsmithDebug = require('metalsmith-debug');

var _metalsmithDebug2 = _interopRequireDefault(_metalsmithDebug);

var _metalsmithHtmlMinifier = require('metalsmith-html-minifier');

var _metalsmithHtmlMinifier2 = _interopRequireDefault(_metalsmithHtmlMinifier);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _gulpColor = require('gulp-color');

var _gulpColor2 = _interopRequireDefault(_gulpColor);

var _fs = require('fs');

var _loadContent = require('../lib/load-content');

var _loadContent2 = _interopRequireDefault(_loadContent);

var _m9MetaToFiles = require('../lib/metalsmith-plugins/m9-meta-to-files');

var _m9MetaToFiles2 = _interopRequireDefault(_m9MetaToFiles);

var _m9MatterInterpolate = require('../lib/metalsmith-plugins/m9-matter-interpolate');

var _m9MatterInterpolate2 = _interopRequireDefault(_m9MatterInterpolate);

var _m9Permalink = require('../lib/metalsmith-plugins/m9-permalink');

var _m9Permalink2 = _interopRequireDefault(_m9Permalink);

var _readDirFiles = require('../lib/read-dir-files');

var _readDirFiles2 = _interopRequireDefault(_readDirFiles);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// register handlebars-helpers
(0, _handlebarsHelpers2.default)();

function metalsmithInplaceConfig() {
  return _extends({}, _config2.default.inplace, {
    engineOptions: _extends({}, _config2.default.inplace.engineOptions, {
      partials: (0, _readDirFiles2.default)(_config2.default.inplace.engineOptions.partials),
      helpers: (0, _requireDir2.default)(_config2.default.inplace.engineOptions.helpers)
    })
  });
}

_gulp2.default.task('build-metalsmith', callback => {
  if (!(0, _fs.existsSync)(_config2.default.pages.directory)) {
    const msg = `No templates to compile found:\n - ${_config2.default.pages.directory}`;
    _fancyLog2.default.warn((0, _gulpColor2.default)(msg, 'YELLOW'));
    callback();
    return;
  }

  const metalsmith = new _metalsmith2.default(_config2.default.paths.cwd).use((0, _metalsmithDebug2.default)()).clean(false).source(_config2.default.pages.directory).destination(_config2.default.paths.dst).metadata(_extends({}, (0, _loadContent2.default)(_config2.default.contentDir), {
    config: _config2.default
  })).use((0, _m9MetaToFiles2.default)(_config2.default.metaToFiles || {})).use((0, _m9MatterInterpolate2.default)()).use((0, _metalsmithRegisterHelpers2.default)(_config2.default.helpers)).use((0, _metalsmithInPlace2.default)(metalsmithInplaceConfig()));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1tZXRhbHNtaXRoLmpzIl0sIm5hbWVzIjpbIm1ldGFsc21pdGhJbnBsYWNlQ29uZmlnIiwiY29uZmlnIiwiaW5wbGFjZSIsImVuZ2luZU9wdGlvbnMiLCJwYXJ0aWFscyIsImhlbHBlcnMiLCJndWxwIiwidGFzayIsImNhbGxiYWNrIiwicGFnZXMiLCJkaXJlY3RvcnkiLCJtc2ciLCJsb2ciLCJ3YXJuIiwibWV0YWxzbWl0aCIsIk1ldGFsc21pdGgiLCJwYXRocyIsImN3ZCIsInVzZSIsImNsZWFuIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJkc3QiLCJtZXRhZGF0YSIsImNvbnRlbnREaXIiLCJtZXRhVG9GaWxlcyIsImxheW91dHMiLCJsZW5ndGgiLCJodG1sbWluIiwiYnVpbGQiLCJlcnJvciIsImJyb3dzZXJTeW5jIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBOztBQUVBLFNBQVNBLHVCQUFULEdBQW9DO0FBQ2xDLHNCQUNLQyxpQkFBT0MsT0FEWjtBQUVFQyxnQ0FDS0YsaUJBQU9DLE9BQVAsQ0FBZUMsYUFEcEI7QUFFRUMsZ0JBQVUsNEJBQWFILGlCQUFPQyxPQUFQLENBQWVDLGFBQWYsQ0FBNkJDLFFBQTFDLENBRlo7QUFHRUMsZUFBUywwQkFBV0osaUJBQU9DLE9BQVAsQ0FBZUMsYUFBZixDQUE2QkUsT0FBeEM7QUFIWDtBQUZGO0FBUUQ7O0FBRURDLGVBQUtDLElBQUwsQ0FBVSxrQkFBVixFQUE4QkMsWUFBWTtBQUN4QyxNQUFJLENBQUMsb0JBQVdQLGlCQUFPUSxLQUFQLENBQWFDLFNBQXhCLENBQUwsRUFBeUM7QUFDdkMsVUFBTUMsTUFBTyxzQ0FBcUNWLGlCQUFPUSxLQUFQLENBQWFDLFNBQVUsRUFBekU7QUFDQUUsdUJBQUlDLElBQUosQ0FBUyx5QkFBTUYsR0FBTixFQUFXLFFBQVgsQ0FBVDtBQUNBSDtBQUNBO0FBQ0Q7O0FBRUQsUUFBTU0sYUFBYSxJQUFJQyxvQkFBSixDQUFlZCxpQkFBT2UsS0FBUCxDQUFhQyxHQUE1QixFQUNoQkMsR0FEZ0IsQ0FDWixnQ0FEWSxFQUVoQkMsS0FGZ0IsQ0FFVixLQUZVLEVBR2hCQyxNQUhnQixDQUdUbkIsaUJBQU9RLEtBQVAsQ0FBYUMsU0FISixFQUloQlcsV0FKZ0IsQ0FJSnBCLGlCQUFPZSxLQUFQLENBQWFNLEdBSlQsRUFLaEJDLFFBTGdCLGNBTVosMkJBQVl0QixpQkFBT3VCLFVBQW5CLENBTlk7QUFPZnZCO0FBUGUsTUFTaEJpQixHQVRnQixDQVNaLDZCQUFjakIsaUJBQU93QixXQUFQLElBQXNCLEVBQXBDLENBVFksRUFVaEJQLEdBVmdCLENBVVosb0NBVlksRUFXaEJBLEdBWGdCLENBV1oseUNBQVFqQixpQkFBT0ksT0FBZixDQVhZLEVBWWhCYSxHQVpnQixDQVlaLGlDQUFRbEIseUJBQVIsQ0FaWSxDQUFuQjs7QUFjQSxNQUNFLG9CQUFXQyxpQkFBT3lCLE9BQVAsQ0FBZWhCLFNBQTFCLEtBQ0EscUJBQVlULGlCQUFPeUIsT0FBUCxDQUFlaEIsU0FBM0IsRUFBc0NpQixNQUZ4QyxFQUdFO0FBQ0FiLGVBQVdJLEdBQVgsQ0FBZSxpQ0FBUWpCLGlCQUFPeUIsT0FBZixDQUFmO0FBQ0Q7O0FBRURaLGFBQ0dJLEdBREgsQ0FDTyw0QkFEUCxFQUVHQSxHQUZILENBRU8sc0NBQVFqQixpQkFBTzJCLE9BQWYsQ0FGUCxFQUdHQyxLQUhILENBR1NDLFNBQVM7QUFDZCxRQUFJQSxLQUFKLEVBQVcsT0FBT3RCLFNBQVNzQixLQUFULENBQVA7QUFDWEMsMEJBQVlDLE1BQVo7QUFDQXhCO0FBQ0QsR0FQSDs7QUFTQSxTQUFPTSxVQUFQO0FBQ0QsQ0F2Q0QiLCJmaWxlIjoiYnVpbGQtbWV0YWxzbWl0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgTWV0YWxzbWl0aCBmcm9tICdtZXRhbHNtaXRoJ1xuaW1wb3J0IGJyb3dzZXJTeW5jIGZyb20gJ2Jyb3dzZXItc3luYydcbmltcG9ydCBpbnBsYWNlIGZyb20gJ21ldGFsc21pdGgtaW4tcGxhY2UnXG5pbXBvcnQgbGF5b3V0cyBmcm9tICdtZXRhbHNtaXRoLWxheW91dHMnXG5pbXBvcnQgcmVxdWlyZURpciBmcm9tICdyZXF1aXJlLWRpcidcbmltcG9ydCBoZWxwZXJzIGZyb20gJ21ldGFsc21pdGgtcmVnaXN0ZXItaGVscGVycydcbmltcG9ydCBoYW5kbGViYXJzSGVscGVycyBmcm9tICdoYW5kbGViYXJzLWhlbHBlcnMnXG5pbXBvcnQgZGVidWcgZnJvbSAnbWV0YWxzbWl0aC1kZWJ1ZydcbmltcG9ydCBodG1sbWluIGZyb20gJ21ldGFsc21pdGgtaHRtbC1taW5pZmllcidcbmltcG9ydCBsb2cgZnJvbSAnZmFuY3ktbG9nJ1xuaW1wb3J0IGNvbG9yIGZyb20gJ2d1bHAtY29sb3InXG5pbXBvcnQgeyByZWFkZGlyU3luYywgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IGxvYWRDb250ZW50IGZyb20gJy4uL2xpYi9sb2FkLWNvbnRlbnQnXG5pbXBvcnQgbTltZXRhVG9GaWxlcyBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMnXG5pbXBvcnQgbTltYXR0ZXJJbnRlcnBvbGF0ZSBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1hdHRlci1pbnRlcnBvbGF0ZSdcbmltcG9ydCBtOXBlcm1hbGluayBmcm9tICcuLi9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LXBlcm1hbGluaydcbmltcG9ydCByZWFkRGlyRmlsZXMgZnJvbSAnLi4vbGliL3JlYWQtZGlyLWZpbGVzJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbi8vIHJlZ2lzdGVyIGhhbmRsZWJhcnMtaGVscGVyc1xuaGFuZGxlYmFyc0hlbHBlcnMoKVxuXG5mdW5jdGlvbiBtZXRhbHNtaXRoSW5wbGFjZUNvbmZpZyAoKSB7XG4gIHJldHVybiB7XG4gICAgLi4uY29uZmlnLmlucGxhY2UsXG4gICAgZW5naW5lT3B0aW9uczoge1xuICAgICAgLi4uY29uZmlnLmlucGxhY2UuZW5naW5lT3B0aW9ucyxcbiAgICAgIHBhcnRpYWxzOiByZWFkRGlyRmlsZXMoY29uZmlnLmlucGxhY2UuZW5naW5lT3B0aW9ucy5wYXJ0aWFscyksXG4gICAgICBoZWxwZXJzOiByZXF1aXJlRGlyKGNvbmZpZy5pbnBsYWNlLmVuZ2luZU9wdGlvbnMuaGVscGVycylcbiAgICB9XG4gIH1cbn1cblxuZ3VscC50YXNrKCdidWlsZC1tZXRhbHNtaXRoJywgY2FsbGJhY2sgPT4ge1xuICBpZiAoIWV4aXN0c1N5bmMoY29uZmlnLnBhZ2VzLmRpcmVjdG9yeSkpIHtcbiAgICBjb25zdCBtc2cgPSBgTm8gdGVtcGxhdGVzIHRvIGNvbXBpbGUgZm91bmQ6XFxuIC0gJHtjb25maWcucGFnZXMuZGlyZWN0b3J5fWBcbiAgICBsb2cud2Fybihjb2xvcihtc2csICdZRUxMT1cnKSlcbiAgICBjYWxsYmFjaygpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBtZXRhbHNtaXRoID0gbmV3IE1ldGFsc21pdGgoY29uZmlnLnBhdGhzLmN3ZClcbiAgICAudXNlKGRlYnVnKCkpXG4gICAgLmNsZWFuKGZhbHNlKVxuICAgIC5zb3VyY2UoY29uZmlnLnBhZ2VzLmRpcmVjdG9yeSlcbiAgICAuZGVzdGluYXRpb24oY29uZmlnLnBhdGhzLmRzdClcbiAgICAubWV0YWRhdGEoe1xuICAgICAgLi4ubG9hZENvbnRlbnQoY29uZmlnLmNvbnRlbnREaXIpLFxuICAgICAgY29uZmlnXG4gICAgfSlcbiAgICAudXNlKG05bWV0YVRvRmlsZXMoY29uZmlnLm1ldGFUb0ZpbGVzIHx8IHt9KSlcbiAgICAudXNlKG05bWF0dGVySW50ZXJwb2xhdGUoKSlcbiAgICAudXNlKGhlbHBlcnMoY29uZmlnLmhlbHBlcnMpKVxuICAgIC51c2UoaW5wbGFjZShtZXRhbHNtaXRoSW5wbGFjZUNvbmZpZygpKSlcblxuICBpZiAoXG4gICAgZXhpc3RzU3luYyhjb25maWcubGF5b3V0cy5kaXJlY3RvcnkpICYmXG4gICAgcmVhZGRpclN5bmMoY29uZmlnLmxheW91dHMuZGlyZWN0b3J5KS5sZW5ndGhcbiAgKSB7XG4gICAgbWV0YWxzbWl0aC51c2UobGF5b3V0cyhjb25maWcubGF5b3V0cykpXG4gIH1cblxuICBtZXRhbHNtaXRoXG4gICAgLnVzZShtOXBlcm1hbGluaygpKVxuICAgIC51c2UoaHRtbG1pbihjb25maWcuaHRtbG1pbikpXG4gICAgLmJ1aWxkKGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvcikgcmV0dXJuIGNhbGxiYWNrKGVycm9yKVxuICAgICAgYnJvd3NlclN5bmMucmVsb2FkKClcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9KVxuXG4gIHJldHVybiBtZXRhbHNtaXRoXG59KVxuIl19