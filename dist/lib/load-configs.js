'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = loadConfigs;


function loadConfigs(config, dir) {
  const configJs = _path2.default.join(dir, 'config.js');
  if ((0, _fs.existsSync)(configJs)) {
    require(configJs)(config);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbG9hZC1jb25maWdzLmpzIl0sIm5hbWVzIjpbImxvYWRDb25maWdzIiwiY29uZmlnIiwiZGlyIiwiY29uZmlnSnMiLCJwYXRoIiwiam9pbiIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7Ozs7a0JBRWVBLFc7OztBQUVmLFNBQVNBLFdBQVQsQ0FBc0JDLE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQztBQUNqQyxRQUFNQyxXQUFXQyxlQUFLQyxJQUFMLENBQVVILEdBQVYsRUFBZSxXQUFmLENBQWpCO0FBQ0EsTUFBSSxvQkFBV0MsUUFBWCxDQUFKLEVBQTBCO0FBQ3hCRyxZQUFRSCxRQUFSLEVBQWtCRixNQUFsQjtBQUNEO0FBQ0YiLCJmaWxlIjoibG9hZC1jb25maWdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgbG9hZENvbmZpZ3NcblxuZnVuY3Rpb24gbG9hZENvbmZpZ3MgKGNvbmZpZywgZGlyKSB7XG4gIGNvbnN0IGNvbmZpZ0pzID0gcGF0aC5qb2luKGRpciwgJ2NvbmZpZy5qcycpXG4gIGlmIChleGlzdHNTeW5jKGNvbmZpZ0pzKSkge1xuICAgIHJlcXVpcmUoY29uZmlnSnMpKGNvbmZpZylcbiAgfVxufVxuIl19