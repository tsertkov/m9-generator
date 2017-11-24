'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _requireDir2.default)(_path2.default.join(__dirname, '/tasks'));

_gulp2.default.task('default', ['help']);
_gulp2.default.task('deploy', ['build', 'deploy-aws']);

_gulp2.default.task('build', function (callback) {
  (0, _runSequence2.default)('build-clean', ['build-copy', 'build-webpack'], 'build-metalsmith', 'build-htmlmin', callback);
});

_gulp2.default.task('dev', function (callback) {
  (0, _runSequence2.default)('build-clean', ['build-copy', 'dev-webpack'], 'build-metalsmith', 'build-htmlmin', 'dev-browsersync', 'dev-watch', callback);
});

_gulp2.default.task('test', function (callback) {
  (0, _runSequence2.default)('test-standard', callback);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ndWxwZmlsZS5qcyJdLCJuYW1lcyI6WyJqb2luIiwiX19kaXJuYW1lIiwidGFzayIsImNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSwwQkFBVyxlQUFLQSxJQUFMLENBQVVDLFNBQVYsRUFBcUIsUUFBckIsQ0FBWDs7QUFFQSxlQUFLQyxJQUFMLENBQVUsU0FBVixFQUFxQixDQUFDLE1BQUQsQ0FBckI7QUFDQSxlQUFLQSxJQUFMLENBQVUsUUFBVixFQUFvQixDQUFDLE9BQUQsRUFBVSxZQUFWLENBQXBCOztBQUVBLGVBQUtBLElBQUwsQ0FBVSxPQUFWLEVBQW1CLFVBQUNDLFFBQUQsRUFBYztBQUMvQiw2QkFDRSxhQURGLEVBRUUsQ0FBQyxZQUFELEVBQWUsZUFBZixDQUZGLEVBR0Usa0JBSEYsRUFJRSxlQUpGLEVBS0VBLFFBTEY7QUFPRCxDQVJEOztBQVVBLGVBQUtELElBQUwsQ0FBVSxLQUFWLEVBQWlCLFVBQUNDLFFBQUQsRUFBYztBQUM3Qiw2QkFDRSxhQURGLEVBRUUsQ0FBQyxZQUFELEVBQWUsYUFBZixDQUZGLEVBR0Usa0JBSEYsRUFJRSxlQUpGLEVBS0UsaUJBTEYsRUFNRSxXQU5GLEVBT0VBLFFBUEY7QUFTRCxDQVZEOztBQVlBLGVBQUtELElBQUwsQ0FBVSxNQUFWLEVBQWtCLFVBQUNDLFFBQUQsRUFBYztBQUM5Qiw2QkFDRSxlQURGLEVBRUVBLFFBRkY7QUFJRCxDQUxEIiwiZmlsZSI6Imd1bHBmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgcmVxdWlyZURpciBmcm9tICdyZXF1aXJlLWRpcidcbmltcG9ydCBydW5TZXF1ZW5jZSBmcm9tICdydW4tc2VxdWVuY2UnXG5cbnJlcXVpcmVEaXIocGF0aC5qb2luKF9fZGlybmFtZSwgJy90YXNrcycpKVxuXG5ndWxwLnRhc2soJ2RlZmF1bHQnLCBbJ2hlbHAnXSlcbmd1bHAudGFzaygnZGVwbG95JywgWydidWlsZCcsICdkZXBsb3ktYXdzJ10pXG5cbmd1bHAudGFzaygnYnVpbGQnLCAoY2FsbGJhY2spID0+IHtcbiAgcnVuU2VxdWVuY2UoXG4gICAgJ2J1aWxkLWNsZWFuJyxcbiAgICBbJ2J1aWxkLWNvcHknLCAnYnVpbGQtd2VicGFjayddLFxuICAgICdidWlsZC1tZXRhbHNtaXRoJyxcbiAgICAnYnVpbGQtaHRtbG1pbicsXG4gICAgY2FsbGJhY2tcbiAgKVxufSlcblxuZ3VscC50YXNrKCdkZXYnLCAoY2FsbGJhY2spID0+IHtcbiAgcnVuU2VxdWVuY2UoXG4gICAgJ2J1aWxkLWNsZWFuJyxcbiAgICBbJ2J1aWxkLWNvcHknLCAnZGV2LXdlYnBhY2snXSxcbiAgICAnYnVpbGQtbWV0YWxzbWl0aCcsXG4gICAgJ2J1aWxkLWh0bWxtaW4nLFxuICAgICdkZXYtYnJvd3NlcnN5bmMnLFxuICAgICdkZXYtd2F0Y2gnLFxuICAgIGNhbGxiYWNrXG4gIClcbn0pXG5cbmd1bHAudGFzaygndGVzdCcsIChjYWxsYmFjaykgPT4ge1xuICBydW5TZXF1ZW5jZShcbiAgICAndGVzdC1zdGFuZGFyZCcsXG4gICAgY2FsbGJhY2tcbiAgKVxufSlcbiJdfQ==