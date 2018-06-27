"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('build-copy', () => _gulp.default.src(_config.default.copy.src, {}).pipe(_gulp.default.dest(_config.default.paths.dst)));