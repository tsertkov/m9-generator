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
    _fancyLog2.default.warn('[metalsmith] no pages to build');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1tZXRhbHNtaXRoLmpzIl0sIm5hbWVzIjpbIm1ldGFsc21pdGhJbnBsYWNlQ29uZmlnIiwiY29uZmlnIiwiaW5wbGFjZSIsImVuZ2luZU9wdGlvbnMiLCJwYXJ0aWFscyIsImhlbHBlcnMiLCJndWxwIiwidGFzayIsImNhbGxiYWNrIiwicGFnZXMiLCJkaXJlY3RvcnkiLCJsb2ciLCJ3YXJuIiwibWV0YWxzbWl0aCIsIk1ldGFsc21pdGgiLCJwYXRocyIsImN3ZCIsInVzZSIsImNsZWFuIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJkc3QiLCJtZXRhZGF0YSIsImNvbnRlbnREaXIiLCJtZXRhVG9GaWxlcyIsImxheW91dHMiLCJsZW5ndGgiLCJodG1sbWluIiwiYnVpbGQiLCJlcnJvciIsImJyb3dzZXJTeW5jIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQTs7QUFFQSxTQUFTQSx1QkFBVCxHQUFvQztBQUNsQyxzQkFDS0MsaUJBQU9DLE9BRFo7QUFFRUMsZ0NBQ0tGLGlCQUFPQyxPQUFQLENBQWVDLGFBRHBCO0FBRUVDLGdCQUFVLDRCQUFhSCxpQkFBT0MsT0FBUCxDQUFlQyxhQUFmLENBQTZCQyxRQUExQyxDQUZaO0FBR0VDLGVBQVMsMEJBQVdKLGlCQUFPQyxPQUFQLENBQWVDLGFBQWYsQ0FBNkJFLE9BQXhDO0FBSFg7QUFGRjtBQVFEOztBQUVEQyxlQUFLQyxJQUFMLENBQVUsa0JBQVYsRUFBOEJDLFlBQVk7QUFDeEMsTUFBSSxDQUFDLG9CQUFXUCxpQkFBT1EsS0FBUCxDQUFhQyxTQUF4QixDQUFMLEVBQXlDO0FBQ3ZDQyx1QkFBSUMsSUFBSixDQUFTLGdDQUFUO0FBQ0FKO0FBQ0E7QUFDRDs7QUFFRCxRQUFNSyxhQUFhLElBQUlDLG9CQUFKLENBQWViLGlCQUFPYyxLQUFQLENBQWFDLEdBQTVCLEVBQ2hCQyxHQURnQixDQUNaLGdDQURZLEVBRWhCQyxLQUZnQixDQUVWLEtBRlUsRUFHaEJDLE1BSGdCLENBR1RsQixpQkFBT1EsS0FBUCxDQUFhQyxTQUhKLEVBSWhCVSxXQUpnQixDQUlKbkIsaUJBQU9jLEtBQVAsQ0FBYU0sR0FKVCxFQUtoQkMsUUFMZ0IsY0FNWiwyQkFBWXJCLGlCQUFPc0IsVUFBbkIsQ0FOWTtBQU9mdEI7QUFQZSxNQVNoQmdCLEdBVGdCLENBU1osNkJBQWNoQixpQkFBT3VCLFdBQVAsSUFBc0IsRUFBcEMsQ0FUWSxFQVVoQlAsR0FWZ0IsQ0FVWixvQ0FWWSxFQVdoQkEsR0FYZ0IsQ0FXWix5Q0FBUWhCLGlCQUFPSSxPQUFmLENBWFksRUFZaEJZLEdBWmdCLENBWVosaUNBQVFqQix5QkFBUixDQVpZLENBQW5COztBQWNBLE1BQ0Usb0JBQVdDLGlCQUFPd0IsT0FBUCxDQUFlZixTQUExQixLQUNBLHFCQUFZVCxpQkFBT3dCLE9BQVAsQ0FBZWYsU0FBM0IsRUFBc0NnQixNQUZ4QyxFQUdFO0FBQ0FiLGVBQVdJLEdBQVgsQ0FBZSxpQ0FBUWhCLGlCQUFPd0IsT0FBZixDQUFmO0FBQ0Q7O0FBRURaLGFBQ0dJLEdBREgsQ0FDTyw0QkFEUCxFQUVHQSxHQUZILENBRU8sc0NBQVFoQixpQkFBTzBCLE9BQWYsQ0FGUCxFQUdHQyxLQUhILENBR1NDLFNBQVM7QUFDZCxRQUFJQSxLQUFKLEVBQVcsT0FBT3JCLFNBQVNxQixLQUFULENBQVA7QUFDWEMsMEJBQVlDLE1BQVo7QUFDQXZCO0FBQ0QsR0FQSDs7QUFTQSxTQUFPSyxVQUFQO0FBQ0QsQ0F0Q0QiLCJmaWxlIjoiYnVpbGQtbWV0YWxzbWl0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgTWV0YWxzbWl0aCBmcm9tICdtZXRhbHNtaXRoJ1xuaW1wb3J0IGJyb3dzZXJTeW5jIGZyb20gJ2Jyb3dzZXItc3luYydcbmltcG9ydCBpbnBsYWNlIGZyb20gJ21ldGFsc21pdGgtaW4tcGxhY2UnXG5pbXBvcnQgbGF5b3V0cyBmcm9tICdtZXRhbHNtaXRoLWxheW91dHMnXG5pbXBvcnQgcmVxdWlyZURpciBmcm9tICdyZXF1aXJlLWRpcidcbmltcG9ydCBoZWxwZXJzIGZyb20gJ21ldGFsc21pdGgtcmVnaXN0ZXItaGVscGVycydcbmltcG9ydCBoYW5kbGViYXJzSGVscGVycyBmcm9tICdoYW5kbGViYXJzLWhlbHBlcnMnXG5pbXBvcnQgZGVidWcgZnJvbSAnbWV0YWxzbWl0aC1kZWJ1ZydcbmltcG9ydCBodG1sbWluIGZyb20gJ21ldGFsc21pdGgtaHRtbC1taW5pZmllcidcbmltcG9ydCBsb2cgZnJvbSAnZmFuY3ktbG9nJ1xuaW1wb3J0IHsgcmVhZGRpclN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tICdmcydcbmltcG9ydCBsb2FkQ29udGVudCBmcm9tICcuLi9saWIvbG9hZC1jb250ZW50J1xuaW1wb3J0IG05bWV0YVRvRmlsZXMgZnJvbSAnLi4vbGliL21ldGFsc21pdGgtcGx1Z2lucy9tOS1tZXRhLXRvLWZpbGVzJ1xuaW1wb3J0IG05bWF0dGVySW50ZXJwb2xhdGUgZnJvbSAnLi4vbGliL21ldGFsc21pdGgtcGx1Z2lucy9tOS1tYXR0ZXItaW50ZXJwb2xhdGUnXG5pbXBvcnQgbTlwZXJtYWxpbmsgZnJvbSAnLi4vbGliL21ldGFsc21pdGgtcGx1Z2lucy9tOS1wZXJtYWxpbmsnXG5pbXBvcnQgcmVhZERpckZpbGVzIGZyb20gJy4uL2xpYi9yZWFkLWRpci1maWxlcydcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG4vLyByZWdpc3RlciBoYW5kbGViYXJzLWhlbHBlcnNcbmhhbmRsZWJhcnNIZWxwZXJzKClcblxuZnVuY3Rpb24gbWV0YWxzbWl0aElucGxhY2VDb25maWcgKCkge1xuICByZXR1cm4ge1xuICAgIC4uLmNvbmZpZy5pbnBsYWNlLFxuICAgIGVuZ2luZU9wdGlvbnM6IHtcbiAgICAgIC4uLmNvbmZpZy5pbnBsYWNlLmVuZ2luZU9wdGlvbnMsXG4gICAgICBwYXJ0aWFsczogcmVhZERpckZpbGVzKGNvbmZpZy5pbnBsYWNlLmVuZ2luZU9wdGlvbnMucGFydGlhbHMpLFxuICAgICAgaGVscGVyczogcmVxdWlyZURpcihjb25maWcuaW5wbGFjZS5lbmdpbmVPcHRpb25zLmhlbHBlcnMpXG4gICAgfVxuICB9XG59XG5cbmd1bHAudGFzaygnYnVpbGQtbWV0YWxzbWl0aCcsIGNhbGxiYWNrID0+IHtcbiAgaWYgKCFleGlzdHNTeW5jKGNvbmZpZy5wYWdlcy5kaXJlY3RvcnkpKSB7XG4gICAgbG9nLndhcm4oJ1ttZXRhbHNtaXRoXSBubyBwYWdlcyB0byBidWlsZCcpXG4gICAgY2FsbGJhY2soKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgbWV0YWxzbWl0aCA9IG5ldyBNZXRhbHNtaXRoKGNvbmZpZy5wYXRocy5jd2QpXG4gICAgLnVzZShkZWJ1ZygpKVxuICAgIC5jbGVhbihmYWxzZSlcbiAgICAuc291cmNlKGNvbmZpZy5wYWdlcy5kaXJlY3RvcnkpXG4gICAgLmRlc3RpbmF0aW9uKGNvbmZpZy5wYXRocy5kc3QpXG4gICAgLm1ldGFkYXRhKHtcbiAgICAgIC4uLmxvYWRDb250ZW50KGNvbmZpZy5jb250ZW50RGlyKSxcbiAgICAgIGNvbmZpZ1xuICAgIH0pXG4gICAgLnVzZShtOW1ldGFUb0ZpbGVzKGNvbmZpZy5tZXRhVG9GaWxlcyB8fCB7fSkpXG4gICAgLnVzZShtOW1hdHRlckludGVycG9sYXRlKCkpXG4gICAgLnVzZShoZWxwZXJzKGNvbmZpZy5oZWxwZXJzKSlcbiAgICAudXNlKGlucGxhY2UobWV0YWxzbWl0aElucGxhY2VDb25maWcoKSkpXG5cbiAgaWYgKFxuICAgIGV4aXN0c1N5bmMoY29uZmlnLmxheW91dHMuZGlyZWN0b3J5KSAmJlxuICAgIHJlYWRkaXJTeW5jKGNvbmZpZy5sYXlvdXRzLmRpcmVjdG9yeSkubGVuZ3RoXG4gICkge1xuICAgIG1ldGFsc21pdGgudXNlKGxheW91dHMoY29uZmlnLmxheW91dHMpKVxuICB9XG5cbiAgbWV0YWxzbWl0aFxuICAgIC51c2UobTlwZXJtYWxpbmsoKSlcbiAgICAudXNlKGh0bWxtaW4oY29uZmlnLmh0bWxtaW4pKVxuICAgIC5idWlsZChlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHJldHVybiBjYWxsYmFjayhlcnJvcilcbiAgICAgIGJyb3dzZXJTeW5jLnJlbG9hZCgpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfSlcblxuICByZXR1cm4gbWV0YWxzbWl0aFxufSlcbiJdfQ==