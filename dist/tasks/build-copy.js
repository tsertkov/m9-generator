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

_gulp2.default.task('build-copy', function () {
  return _gulp2.default.src(_config2.default.copy.src, {}).pipe((0, _gulpIf2.default)(_config2.default.isGulpDebug, (0, _gulpDebug2.default)({ title: 'Files copied:' }))).pipe(_gulp2.default.dest(_config2.default.paths.dst));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1jb3B5LmpzIl0sIm5hbWVzIjpbInRhc2siLCJzcmMiLCJjb3B5IiwicGlwZSIsImlzR3VscERlYnVnIiwidGl0bGUiLCJkZXN0IiwicGF0aHMiLCJkc3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLGVBQUtBLElBQUwsQ0FBVSxZQUFWLEVBQXdCO0FBQUEsU0FDdEIsZUFDR0MsR0FESCxDQUNPLGlCQUFPQyxJQUFQLENBQVlELEdBRG5CLEVBQ3dCLEVBRHhCLEVBRUdFLElBRkgsQ0FFUSxzQkFBTyxpQkFBT0MsV0FBZCxFQUEyQix5QkFBTSxFQUFFQyxPQUFPLGVBQVQsRUFBTixDQUEzQixDQUZSLEVBR0dGLElBSEgsQ0FHUSxlQUFLRyxJQUFMLENBQVUsaUJBQU9DLEtBQVAsQ0FBYUMsR0FBdkIsQ0FIUixDQURzQjtBQUFBLENBQXhCIiwiZmlsZSI6ImJ1aWxkLWNvcHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ3VscCBmcm9tICdndWxwJ1xuaW1wb3J0IGRlYnVnIGZyb20gJ2d1bHAtZGVidWcnXG5pbXBvcnQgZ3VscGlmIGZyb20gJ2d1bHAtaWYnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcblxuZ3VscC50YXNrKCdidWlsZC1jb3B5JywgKCkgPT4gKFxuICBndWxwXG4gICAgLnNyYyhjb25maWcuY29weS5zcmMsIHt9KVxuICAgIC5waXBlKGd1bHBpZihjb25maWcuaXNHdWxwRGVidWcsIGRlYnVnKHsgdGl0bGU6ICdGaWxlcyBjb3BpZWQ6JyB9KSkpXG4gICAgLnBpcGUoZ3VscC5kZXN0KGNvbmZpZy5wYXRocy5kc3QpKVxuKSlcbiJdfQ==