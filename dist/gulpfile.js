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
  (0, _runSequence2.default)('build-clean', ['build-copy', 'dev-webpack'], 'build-metalsmith', 'dev-browsersync', 'dev-watch', callback);
});

_gulp2.default.task('test', function (callback) {
  (0, _runSequence2.default)('test-standard', callback);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ndWxwZmlsZS5qcyJdLCJuYW1lcyI6WyJqb2luIiwiX19kaXJuYW1lIiwidGFzayIsImNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSwwQkFBVyxlQUFLQSxJQUFMLENBQVVDLFNBQVYsRUFBcUIsUUFBckIsQ0FBWDs7QUFFQSxlQUFLQyxJQUFMLENBQVUsU0FBVixFQUFxQixDQUFDLE1BQUQsQ0FBckI7QUFDQSxlQUFLQSxJQUFMLENBQVUsUUFBVixFQUFvQixDQUFDLE9BQUQsRUFBVSxZQUFWLENBQXBCOztBQUVBLGVBQUtBLElBQUwsQ0FBVSxPQUFWLEVBQW1CLFVBQUNDLFFBQUQsRUFBYztBQUMvQiw2QkFDRSxhQURGLEVBRUUsQ0FBQyxZQUFELEVBQWUsZUFBZixDQUZGLEVBR0Usa0JBSEYsRUFJRSxlQUpGLEVBS0VBLFFBTEY7QUFPRCxDQVJEOztBQVVBLGVBQUtELElBQUwsQ0FBVSxLQUFWLEVBQWlCLFVBQUNDLFFBQUQsRUFBYztBQUM3Qiw2QkFDRSxhQURGLEVBRUUsQ0FBQyxZQUFELEVBQWUsYUFBZixDQUZGLEVBR0Usa0JBSEYsRUFJRSxpQkFKRixFQUtFLFdBTEYsRUFNRUEsUUFORjtBQVFELENBVEQ7O0FBV0EsZUFBS0QsSUFBTCxDQUFVLE1BQVYsRUFBa0IsVUFBQ0MsUUFBRCxFQUFjO0FBQzlCLDZCQUNFLGVBREYsRUFFRUEsUUFGRjtBQUlELENBTEQiLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ3VscCBmcm9tICdndWxwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCByZXF1aXJlRGlyIGZyb20gJ3JlcXVpcmUtZGlyJ1xuaW1wb3J0IHJ1blNlcXVlbmNlIGZyb20gJ3J1bi1zZXF1ZW5jZSdcblxucmVxdWlyZURpcihwYXRoLmpvaW4oX19kaXJuYW1lLCAnL3Rhc2tzJykpXG5cbmd1bHAudGFzaygnZGVmYXVsdCcsIFsnaGVscCddKVxuZ3VscC50YXNrKCdkZXBsb3knLCBbJ2J1aWxkJywgJ2RlcGxveS1hd3MnXSlcblxuZ3VscC50YXNrKCdidWlsZCcsIChjYWxsYmFjaykgPT4ge1xuICBydW5TZXF1ZW5jZShcbiAgICAnYnVpbGQtY2xlYW4nLFxuICAgIFsnYnVpbGQtY29weScsICdidWlsZC13ZWJwYWNrJ10sXG4gICAgJ2J1aWxkLW1ldGFsc21pdGgnLFxuICAgICdidWlsZC1odG1sbWluJyxcbiAgICBjYWxsYmFja1xuICApXG59KVxuXG5ndWxwLnRhc2soJ2RldicsIChjYWxsYmFjaykgPT4ge1xuICBydW5TZXF1ZW5jZShcbiAgICAnYnVpbGQtY2xlYW4nLFxuICAgIFsnYnVpbGQtY29weScsICdkZXYtd2VicGFjayddLFxuICAgICdidWlsZC1tZXRhbHNtaXRoJyxcbiAgICAnZGV2LWJyb3dzZXJzeW5jJyxcbiAgICAnZGV2LXdhdGNoJyxcbiAgICBjYWxsYmFja1xuICApXG59KVxuXG5ndWxwLnRhc2soJ3Rlc3QnLCAoY2FsbGJhY2spID0+IHtcbiAgcnVuU2VxdWVuY2UoXG4gICAgJ3Rlc3Qtc3RhbmRhcmQnLFxuICAgIGNhbGxiYWNrXG4gIClcbn0pXG4iXX0=