'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpStandard = require('gulp-standard');

var _gulpStandard2 = _interopRequireDefault(_gulpStandard);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('test-standard', () => {
  return _gulp2.default.src(_config2.default.paths.srcScripts + '/**/*.js').pipe((0, _gulpStandard2.default)()).pipe(_gulpStandard2.default.reporter('default', {
    breakOnError: true
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy90ZXN0LXN0YW5kYXJkLmpzIl0sIm5hbWVzIjpbImd1bHAiLCJ0YXNrIiwic3JjIiwiY29uZmlnIiwicGF0aHMiLCJzcmNTY3JpcHRzIiwicGlwZSIsInN0YW5kYXJkIiwicmVwb3J0ZXIiLCJicmVha09uRXJyb3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQUEsZUFBS0MsSUFBTCxDQUFVLGVBQVYsRUFBMkIsTUFBTTtBQUMvQixTQUFPRCxlQUNKRSxHQURJLENBQ0FDLGlCQUFPQyxLQUFQLENBQWFDLFVBQWIsR0FBMEIsVUFEMUIsRUFFSkMsSUFGSSxDQUVDLDZCQUZELEVBR0pBLElBSEksQ0FHQ0MsdUJBQVNDLFFBQVQsQ0FBa0IsU0FBbEIsRUFBNkI7QUFDakNDLGtCQUFjO0FBRG1CLEdBQTdCLENBSEQsQ0FBUDtBQU1ELENBUEQiLCJmaWxlIjoidGVzdC1zdGFuZGFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgc3RhbmRhcmQgZnJvbSAnZ3VscC1zdGFuZGFyZCdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG5ndWxwLnRhc2soJ3Rlc3Qtc3RhbmRhcmQnLCAoKSA9PiB7XG4gIHJldHVybiBndWxwXG4gICAgLnNyYyhjb25maWcucGF0aHMuc3JjU2NyaXB0cyArICcvKiovKi5qcycpXG4gICAgLnBpcGUoc3RhbmRhcmQoKSlcbiAgICAucGlwZShzdGFuZGFyZC5yZXBvcnRlcignZGVmYXVsdCcsIHtcbiAgICAgIGJyZWFrT25FcnJvcjogdHJ1ZVxuICAgIH0pKVxufSlcbiJdfQ==