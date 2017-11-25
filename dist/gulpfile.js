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
  (0, _runSequence2.default)('build-clean', ['build-copy', 'build-webpack'], 'build-metalsmith', callback);
});

_gulp2.default.task('dev', function (callback) {
  (0, _runSequence2.default)('build-clean', ['build-copy', 'dev-webpack'], 'build-metalsmith', 'dev-browsersync', 'dev-watch', callback);
});

_gulp2.default.task('test', function (callback) {
  (0, _runSequence2.default)('test-standard', callback);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ndWxwZmlsZS5qcyJdLCJuYW1lcyI6WyJqb2luIiwiX19kaXJuYW1lIiwidGFzayIsImNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSwwQkFBVyxlQUFLQSxJQUFMLENBQVVDLFNBQVYsRUFBcUIsUUFBckIsQ0FBWDs7QUFFQSxlQUFLQyxJQUFMLENBQVUsU0FBVixFQUFxQixDQUFDLE1BQUQsQ0FBckI7QUFDQSxlQUFLQSxJQUFMLENBQVUsUUFBVixFQUFvQixDQUFDLE9BQUQsRUFBVSxZQUFWLENBQXBCOztBQUVBLGVBQUtBLElBQUwsQ0FBVSxPQUFWLEVBQW1CLFVBQUNDLFFBQUQsRUFBYztBQUMvQiw2QkFDRSxhQURGLEVBRUUsQ0FBQyxZQUFELEVBQWUsZUFBZixDQUZGLEVBR0Usa0JBSEYsRUFJRUEsUUFKRjtBQU1ELENBUEQ7O0FBU0EsZUFBS0QsSUFBTCxDQUFVLEtBQVYsRUFBaUIsVUFBQ0MsUUFBRCxFQUFjO0FBQzdCLDZCQUNFLGFBREYsRUFFRSxDQUFDLFlBQUQsRUFBZSxhQUFmLENBRkYsRUFHRSxrQkFIRixFQUlFLGlCQUpGLEVBS0UsV0FMRixFQU1FQSxRQU5GO0FBUUQsQ0FURDs7QUFXQSxlQUFLRCxJQUFMLENBQVUsTUFBVixFQUFrQixVQUFDQyxRQUFELEVBQWM7QUFDOUIsNkJBQ0UsZUFERixFQUVFQSxRQUZGO0FBSUQsQ0FMRCIsImZpbGUiOiJndWxwZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHJlcXVpcmVEaXIgZnJvbSAncmVxdWlyZS1kaXInXG5pbXBvcnQgcnVuU2VxdWVuY2UgZnJvbSAncnVuLXNlcXVlbmNlJ1xuXG5yZXF1aXJlRGlyKHBhdGguam9pbihfX2Rpcm5hbWUsICcvdGFza3MnKSlcblxuZ3VscC50YXNrKCdkZWZhdWx0JywgWydoZWxwJ10pXG5ndWxwLnRhc2soJ2RlcGxveScsIFsnYnVpbGQnLCAnZGVwbG95LWF3cyddKVxuXG5ndWxwLnRhc2soJ2J1aWxkJywgKGNhbGxiYWNrKSA9PiB7XG4gIHJ1blNlcXVlbmNlKFxuICAgICdidWlsZC1jbGVhbicsXG4gICAgWydidWlsZC1jb3B5JywgJ2J1aWxkLXdlYnBhY2snXSxcbiAgICAnYnVpbGQtbWV0YWxzbWl0aCcsXG4gICAgY2FsbGJhY2tcbiAgKVxufSlcblxuZ3VscC50YXNrKCdkZXYnLCAoY2FsbGJhY2spID0+IHtcbiAgcnVuU2VxdWVuY2UoXG4gICAgJ2J1aWxkLWNsZWFuJyxcbiAgICBbJ2J1aWxkLWNvcHknLCAnZGV2LXdlYnBhY2snXSxcbiAgICAnYnVpbGQtbWV0YWxzbWl0aCcsXG4gICAgJ2Rldi1icm93c2Vyc3luYycsXG4gICAgJ2Rldi13YXRjaCcsXG4gICAgY2FsbGJhY2tcbiAgKVxufSlcblxuZ3VscC50YXNrKCd0ZXN0JywgKGNhbGxiYWNrKSA9PiB7XG4gIHJ1blNlcXVlbmNlKFxuICAgICd0ZXN0LXN0YW5kYXJkJyxcbiAgICBjYWxsYmFja1xuICApXG59KVxuIl19