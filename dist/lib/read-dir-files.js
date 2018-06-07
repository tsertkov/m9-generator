'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = readDirFiles;


function readDirFiles(dir) {
  if (!_fs2.default.existsSync(dir)) {
    return {};
  }

  return _fs2.default.readdirSync(dir).reduce((partials, filename) => {
    const partialName = _path2.default.parse(filename)['name'];
    const filePath = _path2.default.join(dir, filename);
    partials[partialName] = _fs2.default.readFileSync(filePath, { encoding: 'utf8' });
    return partials;
  }, {});
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcmVhZC1kaXItZmlsZXMuanMiXSwibmFtZXMiOlsicmVhZERpckZpbGVzIiwiZGlyIiwiZnMiLCJleGlzdHNTeW5jIiwicmVhZGRpclN5bmMiLCJyZWR1Y2UiLCJwYXJ0aWFscyIsImZpbGVuYW1lIiwicGFydGlhbE5hbWUiLCJwYXRoIiwicGFyc2UiLCJmaWxlUGF0aCIsImpvaW4iLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O2tCQUVlQSxZOzs7QUFFZixTQUFTQSxZQUFULENBQXVCQyxHQUF2QixFQUE0QjtBQUMxQixNQUFJLENBQUNDLGFBQUdDLFVBQUgsQ0FBY0YsR0FBZCxDQUFMLEVBQXlCO0FBQ3ZCLFdBQU8sRUFBUDtBQUNEOztBQUVELFNBQU9DLGFBQUdFLFdBQUgsQ0FBZUgsR0FBZixFQUFvQkksTUFBcEIsQ0FBMkIsQ0FBQ0MsUUFBRCxFQUFXQyxRQUFYLEtBQXdCO0FBQ3hELFVBQU1DLGNBQWNDLGVBQUtDLEtBQUwsQ0FBV0gsUUFBWCxFQUFxQixNQUFyQixDQUFwQjtBQUNBLFVBQU1JLFdBQVdGLGVBQUtHLElBQUwsQ0FBVVgsR0FBVixFQUFlTSxRQUFmLENBQWpCO0FBQ0FELGFBQVNFLFdBQVQsSUFBd0JOLGFBQUdXLFlBQUgsQ0FBZ0JGLFFBQWhCLEVBQTBCLEVBQUVHLFVBQVUsTUFBWixFQUExQixDQUF4QjtBQUNBLFdBQU9SLFFBQVA7QUFDRCxHQUxNLEVBS0osRUFMSSxDQUFQO0FBTUQiLCJmaWxlIjoicmVhZC1kaXItZmlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuXG5leHBvcnQgZGVmYXVsdCByZWFkRGlyRmlsZXNcblxuZnVuY3Rpb24gcmVhZERpckZpbGVzIChkaXIpIHtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICByZXR1cm4ge31cbiAgfVxuXG4gIHJldHVybiBmcy5yZWFkZGlyU3luYyhkaXIpLnJlZHVjZSgocGFydGlhbHMsIGZpbGVuYW1lKSA9PiB7XG4gICAgY29uc3QgcGFydGlhbE5hbWUgPSBwYXRoLnBhcnNlKGZpbGVuYW1lKVsnbmFtZSddXG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oZGlyLCBmaWxlbmFtZSlcbiAgICBwYXJ0aWFsc1twYXJ0aWFsTmFtZV0gPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuICAgIHJldHVybiBwYXJ0aWFsc1xuICB9LCB7fSlcbn1cbiJdfQ==