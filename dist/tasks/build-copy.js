'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('build-copy', () => _gulp2.default.src(_config2.default.copy.src, {}).pipe((0, _gulpIf2.default)(_config2.default.isGulpDebug, (0, _gulpDebug2.default)({ title: 'Files copied:' }))).pipe(_gulp2.default.dest(_config2.default.paths.dst)));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1jb3B5LmpzIl0sIm5hbWVzIjpbImd1bHAiLCJ0YXNrIiwic3JjIiwiY29uZmlnIiwiY29weSIsInBpcGUiLCJpc0d1bHBEZWJ1ZyIsInRpdGxlIiwiZGVzdCIsInBhdGhzIiwiZHN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQUEsZUFBS0MsSUFBTCxDQUFVLFlBQVYsRUFBd0IsTUFDdEJELGVBQ0dFLEdBREgsQ0FDT0MsaUJBQU9DLElBQVAsQ0FBWUYsR0FEbkIsRUFDd0IsRUFEeEIsRUFFR0csSUFGSCxDQUVRLHNCQUFPRixpQkFBT0csV0FBZCxFQUEyQix5QkFBTSxFQUFFQyxPQUFPLGVBQVQsRUFBTixDQUEzQixDQUZSLEVBR0dGLElBSEgsQ0FHUUwsZUFBS1EsSUFBTCxDQUFVTCxpQkFBT00sS0FBUCxDQUFhQyxHQUF2QixDQUhSLENBREYiLCJmaWxlIjoiYnVpbGQtY29weS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgZGVidWcgZnJvbSAnZ3VscC1kZWJ1ZydcbmltcG9ydCBndWxwaWYgZnJvbSAnZ3VscC1pZidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG5ndWxwLnRhc2soJ2J1aWxkLWNvcHknLCAoKSA9PiAoXG4gIGd1bHBcbiAgICAuc3JjKGNvbmZpZy5jb3B5LnNyYywge30pXG4gICAgLnBpcGUoZ3VscGlmKGNvbmZpZy5pc0d1bHBEZWJ1ZywgZGVidWcoeyB0aXRsZTogJ0ZpbGVzIGNvcGllZDonIH0pKSlcbiAgICAucGlwZShndWxwLmRlc3QoY29uZmlnLnBhdGhzLmRzdCkpXG4pKVxuIl19