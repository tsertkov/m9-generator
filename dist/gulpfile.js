'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _requireDir2.default)(_path2.default.join(__dirname, '/tasks'));

_gulp2.default.task('build', _gulp2.default.series('build-clean', 'build-copy', 'build-webpack', 'build-metalsmith'));

_gulp2.default.task('dev', _gulp2.default.series('build-clean', 'build-copy', 'dev-webpack', 'build-metalsmith', _gulp2.default.parallel('dev-browsersync', 'dev-watch')));

_gulp2.default.task('deploy', _gulp2.default.series('build', 'deploy-aws'));

_gulp2.default.task('test', _gulp2.default.series('test-standard'));

_gulp2.default.task('default', _gulp2.default.series('dev'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ndWxwZmlsZS5qcyJdLCJuYW1lcyI6WyJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImd1bHAiLCJ0YXNrIiwic2VyaWVzIiwicGFyYWxsZWwiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSwwQkFBV0EsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFFBQXJCLENBQVg7O0FBRUFDLGVBQUtDLElBQUwsQ0FBVSxPQUFWLEVBQW1CRCxlQUFLRSxNQUFMLENBQ2pCLGFBRGlCLEVBRWpCLFlBRmlCLEVBR2pCLGVBSGlCLEVBSWpCLGtCQUppQixDQUFuQjs7QUFPQUYsZUFBS0MsSUFBTCxDQUFVLEtBQVYsRUFBaUJELGVBQUtFLE1BQUwsQ0FDZixhQURlLEVBRWYsWUFGZSxFQUdmLGFBSGUsRUFJZixrQkFKZSxFQUtmRixlQUFLRyxRQUFMLENBQ0UsaUJBREYsRUFFRSxXQUZGLENBTGUsQ0FBakI7O0FBV0FILGVBQUtDLElBQUwsQ0FBVSxRQUFWLEVBQW9CRCxlQUFLRSxNQUFMLENBQ2xCLE9BRGtCLEVBRWxCLFlBRmtCLENBQXBCOztBQUtBRixlQUFLQyxJQUFMLENBQVUsTUFBVixFQUFrQkQsZUFBS0UsTUFBTCxDQUNoQixlQURnQixDQUFsQjs7QUFJQUYsZUFBS0MsSUFBTCxDQUFVLFNBQVYsRUFBcUJELGVBQUtFLE1BQUwsQ0FDbkIsS0FEbUIsQ0FBckIiLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ3VscCBmcm9tICdndWxwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCByZXF1aXJlRGlyIGZyb20gJ3JlcXVpcmUtZGlyJ1xuXG5yZXF1aXJlRGlyKHBhdGguam9pbihfX2Rpcm5hbWUsICcvdGFza3MnKSlcblxuZ3VscC50YXNrKCdidWlsZCcsIGd1bHAuc2VyaWVzKFxuICAnYnVpbGQtY2xlYW4nLFxuICAnYnVpbGQtY29weScsXG4gICdidWlsZC13ZWJwYWNrJyxcbiAgJ2J1aWxkLW1ldGFsc21pdGgnXG4pKVxuXG5ndWxwLnRhc2soJ2RldicsIGd1bHAuc2VyaWVzKFxuICAnYnVpbGQtY2xlYW4nLFxuICAnYnVpbGQtY29weScsXG4gICdkZXYtd2VicGFjaycsXG4gICdidWlsZC1tZXRhbHNtaXRoJyxcbiAgZ3VscC5wYXJhbGxlbChcbiAgICAnZGV2LWJyb3dzZXJzeW5jJyxcbiAgICAnZGV2LXdhdGNoJ1xuICApXG4pKVxuXG5ndWxwLnRhc2soJ2RlcGxveScsIGd1bHAuc2VyaWVzKFxuICAnYnVpbGQnLFxuICAnZGVwbG95LWF3cydcbikpXG5cbmd1bHAudGFzaygndGVzdCcsIGd1bHAuc2VyaWVzKFxuICAndGVzdC1zdGFuZGFyZCdcbikpXG5cbmd1bHAudGFzaygnZGVmYXVsdCcsIGd1bHAuc2VyaWVzKFxuICAnZGV2J1xuKSlcbiJdfQ==