'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _pluginError = require('plugin-error');

var _pluginError2 = _interopRequireDefault(_pluginError);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('build-webpack', callback => {
  if (!Object.keys(_config2.default.webpack.entry).length) {
    (0, _fancyLog2.default)(['webpack] nothing to compile yet...']);
    callback();
    return;
  }

  (0, _webpack2.default)(_config2.default.webpack, (err, stats) => {
    if (err) throw new _pluginError2.default('webpack', err);
    (0, _fancyLog2.default)('[webpack]', '\n' + stats.toString());
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC13ZWJwYWNrLmpzIl0sIm5hbWVzIjpbImd1bHAiLCJ0YXNrIiwiY2FsbGJhY2siLCJPYmplY3QiLCJrZXlzIiwiY29uZmlnIiwid2VicGFjayIsImVudHJ5IiwibGVuZ3RoIiwiZXJyIiwic3RhdHMiLCJQbHVnaW5FcnJvciIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBQSxlQUFLQyxJQUFMLENBQVUsZUFBVixFQUE0QkMsUUFBRCxJQUFjO0FBQ3ZDLE1BQUksQ0FBQ0MsT0FBT0MsSUFBUCxDQUFZQyxpQkFBT0MsT0FBUCxDQUFlQyxLQUEzQixFQUFrQ0MsTUFBdkMsRUFBK0M7QUFDN0MsNEJBQUksQ0FBQyxvQ0FBRCxDQUFKO0FBQ0FOO0FBQ0E7QUFDRDs7QUFFRCx5QkFBUUcsaUJBQU9DLE9BQWYsRUFBd0IsQ0FBQ0csR0FBRCxFQUFNQyxLQUFOLEtBQWdCO0FBQ3RDLFFBQUlELEdBQUosRUFBUyxNQUFNLElBQUlFLHFCQUFKLENBQWdCLFNBQWhCLEVBQTJCRixHQUEzQixDQUFOO0FBQ1QsNEJBQUksV0FBSixFQUFpQixPQUFPQyxNQUFNRSxRQUFOLEVBQXhCO0FBQ0FWO0FBQ0QsR0FKRDtBQUtELENBWkQiLCJmaWxlIjoiYnVpbGQtd2VicGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgbG9nIGZyb20gJ2ZhbmN5LWxvZydcbmltcG9ydCBQbHVnaW5FcnJvciBmcm9tICdwbHVnaW4tZXJyb3InXG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmd1bHAudGFzaygnYnVpbGQtd2VicGFjaycsIChjYWxsYmFjaykgPT4ge1xuICBpZiAoIU9iamVjdC5rZXlzKGNvbmZpZy53ZWJwYWNrLmVudHJ5KS5sZW5ndGgpIHtcbiAgICBsb2coWyd3ZWJwYWNrXSBub3RoaW5nIHRvIGNvbXBpbGUgeWV0Li4uJ10pXG4gICAgY2FsbGJhY2soKVxuICAgIHJldHVyblxuICB9XG5cbiAgd2VicGFjayhjb25maWcud2VicGFjaywgKGVyciwgc3RhdHMpID0+IHtcbiAgICBpZiAoZXJyKSB0aHJvdyBuZXcgUGx1Z2luRXJyb3IoJ3dlYnBhY2snLCBlcnIpXG4gICAgbG9nKCdbd2VicGFja10nLCAnXFxuJyArIHN0YXRzLnRvU3RyaW5nKCkpXG4gICAgY2FsbGJhY2soKVxuICB9KVxufSlcbiJdfQ==