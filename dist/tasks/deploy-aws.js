"use strict";

var _path = _interopRequireDefault(require("path"));

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpAwspublish = _interopRequireDefault(require("gulp-awspublish"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('deploy-aws', () => {
  const publisher = _gulpAwspublish.default.create(_config.default.awspublish);

  const headers = {};
  return _gulp.default.src(_path.default.join(_config.default.paths.dst, '**/*')).pipe(_gulpAwspublish.default.gzip({
    ext: '.gz'
  })).pipe(publisher.publish(headers)).pipe(publisher.cache()).pipe(_gulpAwspublish.default.reporter());
});