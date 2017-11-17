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
  var configJs = _path2.default.join(dir, 'config.js');
  if ((0, _fs.existsSync)(configJs)) {
    require(configJs)(config);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbG9hZC1jb25maWdzLmpzIl0sIm5hbWVzIjpbImxvYWRDb25maWdzIiwiY29uZmlnIiwiZGlyIiwiY29uZmlnSnMiLCJqb2luIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztrQkFFZUEsVzs7O0FBRWYsU0FBU0EsV0FBVCxDQUFzQkMsTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DO0FBQ2pDLE1BQU1DLFdBQVcsZUFBS0MsSUFBTCxDQUFVRixHQUFWLEVBQWUsV0FBZixDQUFqQjtBQUNBLE1BQUksb0JBQVdDLFFBQVgsQ0FBSixFQUEwQjtBQUN4QkUsWUFBUUYsUUFBUixFQUFrQkYsTUFBbEI7QUFDRDtBQUNGIiwiZmlsZSI6ImxvYWQtY29uZmlncy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRDb25maWdzXG5cbmZ1bmN0aW9uIGxvYWRDb25maWdzIChjb25maWcsIGRpcikge1xuICBjb25zdCBjb25maWdKcyA9IHBhdGguam9pbihkaXIsICdjb25maWcuanMnKVxuICBpZiAoZXhpc3RzU3luYyhjb25maWdKcykpIHtcbiAgICByZXF1aXJlKGNvbmZpZ0pzKShjb25maWcpXG4gIH1cbn1cbiJdfQ==