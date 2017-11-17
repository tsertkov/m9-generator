'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _assetsWebpackPlugin = require('assets-webpack-plugin');

var _assetsWebpackPlugin2 = _interopRequireDefault(_assetsWebpackPlugin);

var _postcssImport = require('postcss-import');

var _postcssImport2 = _interopRequireDefault(_postcssImport);

var _postcssCssnext = require('postcss-cssnext');

var _postcssCssnext2 = _interopRequireDefault(_postcssCssnext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (config) {
  var isDevelopment = config.isDevelopment;

  var configWebpack = {
    context: config.paths.src,
    output: {
      filename: isDevelopment ? '[name].js' : '[name]-[chunkhash].js',
      path: config.assets.dst,
      publicPath: config.assets.publicPath
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      }, {
        test: /\.css$/,
        use: _extractTextWebpackPlugin2.default.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function plugins(loader) {
                return [(0, _postcssImport2.default)(), (0, _postcssCssnext2.default)()];
              }
            }
          }]
        })
      }]
    },
    plugins: [new _extractTextWebpackPlugin2.default(isDevelopment ? '[name].css' : '[name]-[contenthash].css'), new _assetsWebpackPlugin2.default({
      path: config.paths.dst,
      filename: config.assets.manifest,
      prettyPrint: true
    }), new _webpack2.default.optimize.ModuleConcatenationPlugin(), new _webpack2.default.LoaderOptionsPlugin({
      minimize: !isDevelopment
    })]
  };

  configWebpack.entry = [].concat(_toConsumableArray(_glob2.default.sync(config.assets.scripts)), _toConsumableArray(_glob2.default.sync(config.assets.styles))).reduce(function (acc, filePath) {
    var _path$parse = _path2.default.parse(filePath),
        name = _path$parse.name;

    acc[name] = filePath;
    return acc;
  }, {});

  if (isDevelopment) {
    configWebpack.devtool = 'inline-source-map';
  } else {
    configWebpack.plugins.push(new _webpack2.default.optimize.UglifyJsPlugin());
  }

  config.webpack = configWebpack;
  return config;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWctd2VicGFjay5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpc0RldmVsb3BtZW50IiwiY29uZmlnV2VicGFjayIsImNvbnRleHQiLCJwYXRocyIsInNyYyIsIm91dHB1dCIsImZpbGVuYW1lIiwicGF0aCIsImFzc2V0cyIsImRzdCIsInB1YmxpY1BhdGgiLCJtb2R1bGUiLCJydWxlcyIsInRlc3QiLCJ1c2UiLCJleHRyYWN0IiwibG9hZGVyIiwib3B0aW9ucyIsInBsdWdpbnMiLCJtYW5pZmVzdCIsInByZXR0eVByaW50Iiwib3B0aW1pemUiLCJNb2R1bGVDb25jYXRlbmF0aW9uUGx1Z2luIiwiTG9hZGVyT3B0aW9uc1BsdWdpbiIsIm1pbmltaXplIiwiZW50cnkiLCJzeW5jIiwic2NyaXB0cyIsInN0eWxlcyIsInJlZHVjZSIsImFjYyIsImZpbGVQYXRoIiwicGFyc2UiLCJuYW1lIiwiZGV2dG9vbCIsInB1c2giLCJVZ2xpZnlKc1BsdWdpbiIsIndlYnBhY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztrQkFFZSxVQUFDQSxNQUFELEVBQVk7QUFBQSxNQUNqQkMsYUFEaUIsR0FDQ0QsTUFERCxDQUNqQkMsYUFEaUI7O0FBRXpCLE1BQU1DLGdCQUFnQjtBQUNwQkMsYUFBU0gsT0FBT0ksS0FBUCxDQUFhQyxHQURGO0FBRXBCQyxZQUFRO0FBQ05DLGdCQUFVTixnQkFBZ0IsV0FBaEIsR0FBOEIsdUJBRGxDO0FBRU5PLFlBQU1SLE9BQU9TLE1BQVAsQ0FBY0MsR0FGZDtBQUdOQyxrQkFBWVgsT0FBT1MsTUFBUCxDQUFjRTtBQUhwQixLQUZZO0FBT3BCQyxZQUFRO0FBQ05DLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE9BREE7QUFFTkMsYUFBSztBQUZDLE9BQUQsRUFHSjtBQUNERCxjQUFNLFFBREw7QUFFREMsYUFBSyxtQ0FBa0JDLE9BQWxCLENBQTBCO0FBQzdCRCxlQUFLLENBQUM7QUFDSkUsb0JBQVE7QUFESixXQUFELEVBRUY7QUFDREEsb0JBQVEsZ0JBRFA7QUFFREMscUJBQVM7QUFDUEMsdUJBQVMsaUJBQUNGLE1BQUQ7QUFBQSx1QkFBWSxDQUNuQiw4QkFEbUIsRUFFbkIsK0JBRm1CLENBQVo7QUFBQTtBQURGO0FBRlIsV0FGRTtBQUR3QixTQUExQjtBQUZKLE9BSEk7QUFERCxLQVBZO0FBNEJwQkUsYUFBUyxDQUNQLHVDQUFzQmxCLGdCQUFnQixZQUFoQixHQUErQiwwQkFBckQsQ0FETyxFQUVQLGtDQUFpQjtBQUNmTyxZQUFNUixPQUFPSSxLQUFQLENBQWFNLEdBREo7QUFFZkgsZ0JBQVVQLE9BQU9TLE1BQVAsQ0FBY1csUUFGVDtBQUdmQyxtQkFBYTtBQUhFLEtBQWpCLENBRk8sRUFPUCxJQUFJLGtCQUFRQyxRQUFSLENBQWlCQyx5QkFBckIsRUFQTyxFQVFQLElBQUksa0JBQVFDLG1CQUFaLENBQWdDO0FBQzlCQyxnQkFBVSxDQUFDeEI7QUFEbUIsS0FBaEMsQ0FSTztBQTVCVyxHQUF0Qjs7QUEwQ0FDLGdCQUFjd0IsS0FBZCxHQUFzQiw2QkFDakIsZUFBS0MsSUFBTCxDQUFVM0IsT0FBT1MsTUFBUCxDQUFjbUIsT0FBeEIsQ0FEaUIsc0JBRWpCLGVBQUtELElBQUwsQ0FBVTNCLE9BQU9TLE1BQVAsQ0FBY29CLE1BQXhCLENBRmlCLEdBR3BCQyxNQUhvQixDQUdiLFVBQUNDLEdBQUQsRUFBTUMsUUFBTixFQUFtQjtBQUFBLHNCQUNULGVBQUtDLEtBQUwsQ0FBV0QsUUFBWCxDQURTO0FBQUEsUUFDbEJFLElBRGtCLGVBQ2xCQSxJQURrQjs7QUFFMUJILFFBQUlHLElBQUosSUFBWUYsUUFBWjtBQUNBLFdBQU9ELEdBQVA7QUFDRCxHQVBxQixFQU9uQixFQVBtQixDQUF0Qjs7QUFTQSxNQUFJOUIsYUFBSixFQUFtQjtBQUNqQkMsa0JBQWNpQyxPQUFkLEdBQXdCLG1CQUF4QjtBQUNELEdBRkQsTUFFTztBQUNMakMsa0JBQWNpQixPQUFkLENBQXNCaUIsSUFBdEIsQ0FBMkIsSUFBSSxrQkFBUWQsUUFBUixDQUFpQmUsY0FBckIsRUFBM0I7QUFDRDs7QUFFRHJDLFNBQU9zQyxPQUFQLEdBQWlCcEMsYUFBakI7QUFDQSxTQUFPRixNQUFQO0FBQ0QsQyIsImZpbGUiOiJjb25maWctd2VicGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBFeHRyYWN0VGV4dFBsdWdpbiBmcm9tICdleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgQXNzZXRzUGx1Z2luIGZyb20gJ2Fzc2V0cy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBwb3N0Y3NzSW1wb3J0IGZyb20gJ3Bvc3Rjc3MtaW1wb3J0J1xuaW1wb3J0IHBvc3Rjc3NDc3NuZXh0IGZyb20gJ3Bvc3Rjc3MtY3NzbmV4dCdcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCB7IGlzRGV2ZWxvcG1lbnQgfSA9IGNvbmZpZ1xuICBjb25zdCBjb25maWdXZWJwYWNrID0ge1xuICAgIGNvbnRleHQ6IGNvbmZpZy5wYXRocy5zcmMsXG4gICAgb3V0cHV0OiB7XG4gICAgICBmaWxlbmFtZTogaXNEZXZlbG9wbWVudCA/ICdbbmFtZV0uanMnIDogJ1tuYW1lXS1bY2h1bmtoYXNoXS5qcycsXG4gICAgICBwYXRoOiBjb25maWcuYXNzZXRzLmRzdCxcbiAgICAgIHB1YmxpY1BhdGg6IGNvbmZpZy5hc3NldHMucHVibGljUGF0aFxuICAgIH0sXG4gICAgbW9kdWxlOiB7XG4gICAgICBydWxlczogW3tcbiAgICAgICAgdGVzdDogL1xcLmpzJC8sXG4gICAgICAgIHVzZTogJ2JhYmVsLWxvYWRlcidcbiAgICAgIH0sIHtcbiAgICAgICAgdGVzdDogL1xcLmNzcyQvLFxuICAgICAgICB1c2U6IEV4dHJhY3RUZXh0UGx1Z2luLmV4dHJhY3Qoe1xuICAgICAgICAgIHVzZTogW3tcbiAgICAgICAgICAgIGxvYWRlcjogJ2Nzcy1sb2FkZXInXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbG9hZGVyOiAncG9zdGNzcy1sb2FkZXInLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBwbHVnaW5zOiAobG9hZGVyKSA9PiBbXG4gICAgICAgICAgICAgICAgcG9zdGNzc0ltcG9ydCgpLFxuICAgICAgICAgICAgICAgIHBvc3Rjc3NDc3NuZXh0KClcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pXG4gICAgICB9XVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgbmV3IEV4dHJhY3RUZXh0UGx1Z2luKGlzRGV2ZWxvcG1lbnQgPyAnW25hbWVdLmNzcycgOiAnW25hbWVdLVtjb250ZW50aGFzaF0uY3NzJyksXG4gICAgICBuZXcgQXNzZXRzUGx1Z2luKHtcbiAgICAgICAgcGF0aDogY29uZmlnLnBhdGhzLmRzdCxcbiAgICAgICAgZmlsZW5hbWU6IGNvbmZpZy5hc3NldHMubWFuaWZlc3QsXG4gICAgICAgIHByZXR0eVByaW50OiB0cnVlXG4gICAgICB9KSxcbiAgICAgIG5ldyB3ZWJwYWNrLm9wdGltaXplLk1vZHVsZUNvbmNhdGVuYXRpb25QbHVnaW4oKSxcbiAgICAgIG5ldyB3ZWJwYWNrLkxvYWRlck9wdGlvbnNQbHVnaW4oe1xuICAgICAgICBtaW5pbWl6ZTogIWlzRGV2ZWxvcG1lbnRcbiAgICAgIH0pXG4gICAgXVxuICB9XG5cbiAgY29uZmlnV2VicGFjay5lbnRyeSA9IFtcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zY3JpcHRzKSxcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zdHlsZXMpXG4gIF0ucmVkdWNlKChhY2MsIGZpbGVQYXRoKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwYXRoLnBhcnNlKGZpbGVQYXRoKVxuICAgIGFjY1tuYW1lXSA9IGZpbGVQYXRoXG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSlcblxuICBpZiAoaXNEZXZlbG9wbWVudCkge1xuICAgIGNvbmZpZ1dlYnBhY2suZGV2dG9vbCA9ICdpbmxpbmUtc291cmNlLW1hcCdcbiAgfSBlbHNlIHtcbiAgICBjb25maWdXZWJwYWNrLnBsdWdpbnMucHVzaChuZXcgd2VicGFjay5vcHRpbWl6ZS5VZ2xpZnlKc1BsdWdpbigpKVxuICB9XG5cbiAgY29uZmlnLndlYnBhY2sgPSBjb25maWdXZWJwYWNrXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==