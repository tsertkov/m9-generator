'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('dev-watch', function () {
  _gulp2.default.watch(_config2.default.copy.src, ['dev-copy']);
  _gulp2.default.watch([_path2.default.join(_config2.default.contentDir.directory, '**/*'), _path2.default.join(_config2.default.pages.directory, '**/*'), _path2.default.join(_config2.default.layouts.directory, '**/*'), _path2.default.join(_config2.default.layouts.partials, '**/*'), _path2.default.join(_config2.default.helpers.directory, '**/*.js')], ['build-metalsmith']);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kZXYtd2F0Y2guanMiXSwibmFtZXMiOlsidGFzayIsIndhdGNoIiwiY29weSIsInNyYyIsImpvaW4iLCJjb250ZW50RGlyIiwiZGlyZWN0b3J5IiwicGFnZXMiLCJsYXlvdXRzIiwicGFydGlhbHMiLCJoZWxwZXJzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsZUFBS0EsSUFBTCxDQUFVLFdBQVYsRUFBdUIsWUFBTTtBQUMzQixpQkFBS0MsS0FBTCxDQUFXLGlCQUFPQyxJQUFQLENBQVlDLEdBQXZCLEVBQTRCLENBQUMsVUFBRCxDQUE1QjtBQUNBLGlCQUFLRixLQUFMLENBQVcsQ0FDVCxlQUFLRyxJQUFMLENBQVUsaUJBQU9DLFVBQVAsQ0FBa0JDLFNBQTVCLEVBQXVDLE1BQXZDLENBRFMsRUFFVCxlQUFLRixJQUFMLENBQVUsaUJBQU9HLEtBQVAsQ0FBYUQsU0FBdkIsRUFBa0MsTUFBbEMsQ0FGUyxFQUdULGVBQUtGLElBQUwsQ0FBVSxpQkFBT0ksT0FBUCxDQUFlRixTQUF6QixFQUFvQyxNQUFwQyxDQUhTLEVBSVQsZUFBS0YsSUFBTCxDQUFVLGlCQUFPSSxPQUFQLENBQWVDLFFBQXpCLEVBQW1DLE1BQW5DLENBSlMsRUFLVCxlQUFLTCxJQUFMLENBQVUsaUJBQU9NLE9BQVAsQ0FBZUosU0FBekIsRUFBb0MsU0FBcEMsQ0FMUyxDQUFYLEVBTUcsQ0FBQyxrQkFBRCxDQU5IO0FBT0QsQ0FURCIsImZpbGUiOiJkZXYtd2F0Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG5ndWxwLnRhc2soJ2Rldi13YXRjaCcsICgpID0+IHtcbiAgZ3VscC53YXRjaChjb25maWcuY29weS5zcmMsIFsnZGV2LWNvcHknXSlcbiAgZ3VscC53YXRjaChbXG4gICAgcGF0aC5qb2luKGNvbmZpZy5jb250ZW50RGlyLmRpcmVjdG9yeSwgJyoqLyonKSxcbiAgICBwYXRoLmpvaW4oY29uZmlnLnBhZ2VzLmRpcmVjdG9yeSwgJyoqLyonKSxcbiAgICBwYXRoLmpvaW4oY29uZmlnLmxheW91dHMuZGlyZWN0b3J5LCAnKiovKicpLFxuICAgIHBhdGguam9pbihjb25maWcubGF5b3V0cy5wYXJ0aWFscywgJyoqLyonKSxcbiAgICBwYXRoLmpvaW4oY29uZmlnLmhlbHBlcnMuZGlyZWN0b3J5LCAnKiovKi5qcycpXG4gIF0sIFsnYnVpbGQtbWV0YWxzbWl0aCddKVxufSlcbiJdfQ==