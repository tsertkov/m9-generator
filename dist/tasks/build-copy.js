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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1jb3B5LmpzIl0sIm5hbWVzIjpbInRhc2siLCJzcmMiLCJjb3B5IiwicGlwZSIsImlzR3VscERlYnVnIiwidGl0bGUiLCJkZXN0IiwicGF0aHMiLCJkc3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLGVBQUtBLElBQUwsQ0FBVSxZQUFWLEVBQXdCLE1BQ3RCLGVBQ0dDLEdBREgsQ0FDTyxpQkFBT0MsSUFBUCxDQUFZRCxHQURuQixFQUN3QixFQUR4QixFQUVHRSxJQUZILENBRVEsc0JBQU8saUJBQU9DLFdBQWQsRUFBMkIseUJBQU0sRUFBRUMsT0FBTyxlQUFULEVBQU4sQ0FBM0IsQ0FGUixFQUdHRixJQUhILENBR1EsZUFBS0csSUFBTCxDQUFVLGlCQUFPQyxLQUFQLENBQWFDLEdBQXZCLENBSFIsQ0FERiIsImZpbGUiOiJidWlsZC1jb3B5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBkZWJ1ZyBmcm9tICdndWxwLWRlYnVnJ1xuaW1wb3J0IGd1bHBpZiBmcm9tICdndWxwLWlmJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmd1bHAudGFzaygnYnVpbGQtY29weScsICgpID0+IChcbiAgZ3VscFxuICAgIC5zcmMoY29uZmlnLmNvcHkuc3JjLCB7fSlcbiAgICAucGlwZShndWxwaWYoY29uZmlnLmlzR3VscERlYnVnLCBkZWJ1Zyh7IHRpdGxlOiAnRmlsZXMgY29waWVkOicgfSkpKVxuICAgIC5waXBlKGd1bHAuZGVzdChjb25maWcucGF0aHMuZHN0KSlcbikpXG4iXX0=