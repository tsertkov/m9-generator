'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('dev-watch', () => {
  _gulp2.default.watch(_config2.default.copy.src, ['dev-copy']);
  _gulp2.default.watch([_path2.default.join(_config2.default.contentDir.directory, '**/*'), _path2.default.join(_config2.default.pages.directory, '**/*'), _path2.default.join(_config2.default.layouts.directory, '**/*'), _path2.default.join(_config2.default.layouts.partials, '**/*'), _path2.default.join(_config2.default.helpers.directory, '**/*.js')], ['build-metalsmith']);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kZXYtd2F0Y2guanMiXSwibmFtZXMiOlsiZ3VscCIsInRhc2siLCJ3YXRjaCIsImNvbmZpZyIsImNvcHkiLCJzcmMiLCJwYXRoIiwiam9pbiIsImNvbnRlbnREaXIiLCJkaXJlY3RvcnkiLCJwYWdlcyIsImxheW91dHMiLCJwYXJ0aWFscyIsImhlbHBlcnMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQUEsZUFBS0MsSUFBTCxDQUFVLFdBQVYsRUFBdUIsTUFBTTtBQUMzQkQsaUJBQUtFLEtBQUwsQ0FBV0MsaUJBQU9DLElBQVAsQ0FBWUMsR0FBdkIsRUFBNEIsQ0FBQyxVQUFELENBQTVCO0FBQ0FMLGlCQUFLRSxLQUFMLENBQVcsQ0FDVEksZUFBS0MsSUFBTCxDQUFVSixpQkFBT0ssVUFBUCxDQUFrQkMsU0FBNUIsRUFBdUMsTUFBdkMsQ0FEUyxFQUVUSCxlQUFLQyxJQUFMLENBQVVKLGlCQUFPTyxLQUFQLENBQWFELFNBQXZCLEVBQWtDLE1BQWxDLENBRlMsRUFHVEgsZUFBS0MsSUFBTCxDQUFVSixpQkFBT1EsT0FBUCxDQUFlRixTQUF6QixFQUFvQyxNQUFwQyxDQUhTLEVBSVRILGVBQUtDLElBQUwsQ0FBVUosaUJBQU9RLE9BQVAsQ0FBZUMsUUFBekIsRUFBbUMsTUFBbkMsQ0FKUyxFQUtUTixlQUFLQyxJQUFMLENBQVVKLGlCQUFPVSxPQUFQLENBQWVKLFNBQXpCLEVBQW9DLFNBQXBDLENBTFMsQ0FBWCxFQU1HLENBQUMsa0JBQUQsQ0FOSDtBQU9ELENBVEQiLCJmaWxlIjoiZGV2LXdhdGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBndWxwIGZyb20gJ2d1bHAnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcblxuZ3VscC50YXNrKCdkZXYtd2F0Y2gnLCAoKSA9PiB7XG4gIGd1bHAud2F0Y2goY29uZmlnLmNvcHkuc3JjLCBbJ2Rldi1jb3B5J10pXG4gIGd1bHAud2F0Y2goW1xuICAgIHBhdGguam9pbihjb25maWcuY29udGVudERpci5kaXJlY3RvcnksICcqKi8qJyksXG4gICAgcGF0aC5qb2luKGNvbmZpZy5wYWdlcy5kaXJlY3RvcnksICcqKi8qJyksXG4gICAgcGF0aC5qb2luKGNvbmZpZy5sYXlvdXRzLmRpcmVjdG9yeSwgJyoqLyonKSxcbiAgICBwYXRoLmpvaW4oY29uZmlnLmxheW91dHMucGFydGlhbHMsICcqKi8qJyksXG4gICAgcGF0aC5qb2luKGNvbmZpZy5oZWxwZXJzLmRpcmVjdG9yeSwgJyoqLyouanMnKVxuICBdLCBbJ2J1aWxkLW1ldGFsc21pdGgnXSlcbn0pXG4iXX0=