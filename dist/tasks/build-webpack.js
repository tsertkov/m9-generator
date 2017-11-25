'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('build-webpack', callback => {
  if (!Object.keys(_config2.default.webpack.entry).length) {
    _gulpUtil2.default.log(['nothing to compile yet...']);
    callback();
    return;
  }

  (0, _webpack2.default)(_config2.default.webpack, (err, stats) => {
    if (err) throw new _gulpUtil2.default.PluginError('webpack', err);
    _gulpUtil2.default.log('[webpack]', '\n' + stats.toString());
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC13ZWJwYWNrLmpzIl0sIm5hbWVzIjpbInRhc2siLCJjYWxsYmFjayIsIk9iamVjdCIsImtleXMiLCJ3ZWJwYWNrIiwiZW50cnkiLCJsZW5ndGgiLCJsb2ciLCJlcnIiLCJzdGF0cyIsIlBsdWdpbkVycm9yIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLGVBQUtBLElBQUwsQ0FBVSxlQUFWLEVBQTRCQyxRQUFELElBQWM7QUFDdkMsTUFBSSxDQUFDQyxPQUFPQyxJQUFQLENBQVksaUJBQU9DLE9BQVAsQ0FBZUMsS0FBM0IsRUFBa0NDLE1BQXZDLEVBQStDO0FBQzdDLHVCQUFNQyxHQUFOLENBQVUsQ0FBQywyQkFBRCxDQUFWO0FBQ0FOO0FBQ0E7QUFDRDs7QUFFRCx5QkFBUSxpQkFBT0csT0FBZixFQUF3QixDQUFDSSxHQUFELEVBQU1DLEtBQU4sS0FBZ0I7QUFDdEMsUUFBSUQsR0FBSixFQUFTLE1BQU0sSUFBSSxtQkFBTUUsV0FBVixDQUFzQixTQUF0QixFQUFpQ0YsR0FBakMsQ0FBTjtBQUNULHVCQUFNRCxHQUFOLENBQVUsV0FBVixFQUF1QixPQUFPRSxNQUFNRSxRQUFOLEVBQTlCO0FBQ0FWO0FBQ0QsR0FKRDtBQUtELENBWkQiLCJmaWxlIjoiYnVpbGQtd2VicGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgZ3V0aWwgZnJvbSAnZ3VscC11dGlsJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG5ndWxwLnRhc2soJ2J1aWxkLXdlYnBhY2snLCAoY2FsbGJhY2spID0+IHtcbiAgaWYgKCFPYmplY3Qua2V5cyhjb25maWcud2VicGFjay5lbnRyeSkubGVuZ3RoKSB7XG4gICAgZ3V0aWwubG9nKFsnbm90aGluZyB0byBjb21waWxlIHlldC4uLiddKVxuICAgIGNhbGxiYWNrKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHdlYnBhY2soY29uZmlnLndlYnBhY2ssIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgaWYgKGVycikgdGhyb3cgbmV3IGd1dGlsLlBsdWdpbkVycm9yKCd3ZWJwYWNrJywgZXJyKVxuICAgIGd1dGlsLmxvZygnW3dlYnBhY2tdJywgJ1xcbicgKyBzdGF0cy50b1N0cmluZygpKVxuICAgIGNhbGxiYWNrKClcbiAgfSlcbn0pXG4iXX0=