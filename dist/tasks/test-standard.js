"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpStandard = _interopRequireDefault(require("gulp-standard"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('test-standard', () => {
  return _gulp.default.src([`${_config.default.paths.src}/**/*.js`, `!${_config.default.paths.srcPublic}/**/*`]).pipe((0, _gulpStandard.default)()).pipe(_gulpStandard.default.reporter('default', {
    breakOnError: true
  }));
});