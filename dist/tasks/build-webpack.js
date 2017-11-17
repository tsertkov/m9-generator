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

_gulp2.default.task('build-webpack', function (callback) {
  if (!Object.keys(_config2.default.webpack.entry).length) {
    _gulpUtil2.default.log(['nothing to compile yet...']);
    callback();
    return;
  }

  (0, _webpack2.default)(_config2.default.webpack, function (err, stats) {
    if (err) throw new _gulpUtil2.default.PluginError('webpack', err);
    _gulpUtil2.default.log('[webpack]', '\n' + stats.toString());
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC13ZWJwYWNrLmpzIl0sIm5hbWVzIjpbInRhc2siLCJjYWxsYmFjayIsIk9iamVjdCIsImtleXMiLCJ3ZWJwYWNrIiwiZW50cnkiLCJsZW5ndGgiLCJsb2ciLCJlcnIiLCJzdGF0cyIsIlBsdWdpbkVycm9yIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLGVBQUtBLElBQUwsQ0FBVSxlQUFWLEVBQTJCLFVBQUNDLFFBQUQsRUFBYztBQUN2QyxNQUFJLENBQUNDLE9BQU9DLElBQVAsQ0FBWSxpQkFBT0MsT0FBUCxDQUFlQyxLQUEzQixFQUFrQ0MsTUFBdkMsRUFBK0M7QUFDN0MsdUJBQU1DLEdBQU4sQ0FBVSxDQUFDLDJCQUFELENBQVY7QUFDQU47QUFDQTtBQUNEOztBQUVELHlCQUFRLGlCQUFPRyxPQUFmLEVBQXdCLFVBQUNJLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUN0QyxRQUFJRCxHQUFKLEVBQVMsTUFBTSxJQUFJLG1CQUFNRSxXQUFWLENBQXNCLFNBQXRCLEVBQWlDRixHQUFqQyxDQUFOO0FBQ1QsdUJBQU1ELEdBQU4sQ0FBVSxXQUFWLEVBQXVCLE9BQU9FLE1BQU1FLFFBQU4sRUFBOUI7QUFDQVY7QUFDRCxHQUpEO0FBS0QsQ0FaRCIsImZpbGUiOiJidWlsZC13ZWJwYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBndXRpbCBmcm9tICdndWxwLXV0aWwnXG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmd1bHAudGFzaygnYnVpbGQtd2VicGFjaycsIChjYWxsYmFjaykgPT4ge1xuICBpZiAoIU9iamVjdC5rZXlzKGNvbmZpZy53ZWJwYWNrLmVudHJ5KS5sZW5ndGgpIHtcbiAgICBndXRpbC5sb2coWydub3RoaW5nIHRvIGNvbXBpbGUgeWV0Li4uJ10pXG4gICAgY2FsbGJhY2soKVxuICAgIHJldHVyblxuICB9XG5cbiAgd2VicGFjayhjb25maWcud2VicGFjaywgKGVyciwgc3RhdHMpID0+IHtcbiAgICBpZiAoZXJyKSB0aHJvdyBuZXcgZ3V0aWwuUGx1Z2luRXJyb3IoJ3dlYnBhY2snLCBlcnIpXG4gICAgZ3V0aWwubG9nKCdbd2VicGFja10nLCAnXFxuJyArIHN0YXRzLnRvU3RyaW5nKCkpXG4gICAgY2FsbGJhY2soKVxuICB9KVxufSlcbiJdfQ==