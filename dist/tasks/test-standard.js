'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpStandard = require('gulp-standard');

var _gulpStandard2 = _interopRequireDefault(_gulpStandard);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('test-standard', function () {
  return _gulp2.default.src(_config2.default.paths.srcScripts + '/**/*.js').pipe((0, _gulpStandard2.default)()).pipe(_gulpStandard2.default.reporter('default', {
    breakOnError: true
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy90ZXN0LXN0YW5kYXJkLmpzIl0sIm5hbWVzIjpbInRhc2siLCJzcmMiLCJwYXRocyIsInNyY1NjcmlwdHMiLCJwaXBlIiwicmVwb3J0ZXIiLCJicmVha09uRXJyb3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxlQUFLQSxJQUFMLENBQVUsZUFBVixFQUEyQixZQUFNO0FBQy9CLFNBQU8sZUFDSkMsR0FESSxDQUNBLGlCQUFPQyxLQUFQLENBQWFDLFVBQWIsR0FBMEIsVUFEMUIsRUFFSkMsSUFGSSxDQUVDLDZCQUZELEVBR0pBLElBSEksQ0FHQyx1QkFBU0MsUUFBVCxDQUFrQixTQUFsQixFQUE2QjtBQUNqQ0Msa0JBQWM7QUFEbUIsR0FBN0IsQ0FIRCxDQUFQO0FBTUQsQ0FQRCIsImZpbGUiOiJ0ZXN0LXN0YW5kYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBzdGFuZGFyZCBmcm9tICdndWxwLXN0YW5kYXJkJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmd1bHAudGFzaygndGVzdC1zdGFuZGFyZCcsICgpID0+IHtcbiAgcmV0dXJuIGd1bHBcbiAgICAuc3JjKGNvbmZpZy5wYXRocy5zcmNTY3JpcHRzICsgJy8qKi8qLmpzJylcbiAgICAucGlwZShzdGFuZGFyZCgpKVxuICAgIC5waXBlKHN0YW5kYXJkLnJlcG9ydGVyKCdkZWZhdWx0Jywge1xuICAgICAgYnJlYWtPbkVycm9yOiB0cnVlXG4gICAgfSkpXG59KVxuIl19