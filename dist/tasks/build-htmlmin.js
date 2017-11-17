'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpHtmlmin = require('gulp-htmlmin');

var _gulpHtmlmin2 = _interopRequireDefault(_gulpHtmlmin);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('build-htmlmin', function () {
  return _gulp2.default.src(_config2.default.htmlmin.src).pipe((0, _gulpIf2.default)(_config2.default.isGulpDebug, (0, _gulpDebug2.default)({ title: 'HTML Minified:' }))).pipe((0, _gulpIf2.default)(_config2.default.isProduction, (0, _gulpHtmlmin2.default)(_config2.default.htmlmin.options))).pipe(_gulp2.default.dest(_config2.default.paths.dst));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1odG1sbWluLmpzIl0sIm5hbWVzIjpbInRhc2siLCJzcmMiLCJodG1sbWluIiwicGlwZSIsImlzR3VscERlYnVnIiwidGl0bGUiLCJpc1Byb2R1Y3Rpb24iLCJvcHRpb25zIiwiZGVzdCIsInBhdGhzIiwiZHN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLGVBQUtBLElBQUwsQ0FBVSxlQUFWLEVBQTJCO0FBQUEsU0FDekIsZUFDR0MsR0FESCxDQUNPLGlCQUFPQyxPQUFQLENBQWVELEdBRHRCLEVBRUdFLElBRkgsQ0FFUSxzQkFBTyxpQkFBT0MsV0FBZCxFQUEyQix5QkFBTSxFQUFFQyxPQUFPLGdCQUFULEVBQU4sQ0FBM0IsQ0FGUixFQUdHRixJQUhILENBR1Esc0JBQU8saUJBQU9HLFlBQWQsRUFBNEIsMkJBQVEsaUJBQU9KLE9BQVAsQ0FBZUssT0FBdkIsQ0FBNUIsQ0FIUixFQUlHSixJQUpILENBSVEsZUFBS0ssSUFBTCxDQUFVLGlCQUFPQyxLQUFQLENBQWFDLEdBQXZCLENBSlIsQ0FEeUI7QUFBQSxDQUEzQiIsImZpbGUiOiJidWlsZC1odG1sbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBkZWJ1ZyBmcm9tICdndWxwLWRlYnVnJ1xuaW1wb3J0IGd1bHBpZiBmcm9tICdndWxwLWlmJ1xuaW1wb3J0IGh0bWxtaW4gZnJvbSAnZ3VscC1odG1sbWluJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmd1bHAudGFzaygnYnVpbGQtaHRtbG1pbicsICgpID0+IChcbiAgZ3VscFxuICAgIC5zcmMoY29uZmlnLmh0bWxtaW4uc3JjKVxuICAgIC5waXBlKGd1bHBpZihjb25maWcuaXNHdWxwRGVidWcsIGRlYnVnKHsgdGl0bGU6ICdIVE1MIE1pbmlmaWVkOicgfSkpKVxuICAgIC5waXBlKGd1bHBpZihjb25maWcuaXNQcm9kdWN0aW9uLCBodG1sbWluKGNvbmZpZy5odG1sbWluLm9wdGlvbnMpKSlcbiAgICAucGlwZShndWxwLmRlc3QoY29uZmlnLnBhdGhzLmRzdCkpXG4pKVxuIl19