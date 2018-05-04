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

var _miniCssExtractPlugin = require('mini-css-extract-plugin');

var _miniCssExtractPlugin2 = _interopRequireDefault(_miniCssExtractPlugin);

var _assetsWebpackPlugin = require('assets-webpack-plugin');

var _assetsWebpackPlugin2 = _interopRequireDefault(_assetsWebpackPlugin);

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _postcssImport = require('postcss-import');

var _postcssImport2 = _interopRequireDefault(_postcssImport);

var _postcssCssnext = require('postcss-cssnext');

var _postcssCssnext2 = _interopRequireDefault(_postcssCssnext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (config) {
  var isDevelopment = config.isDevelopment;

  var configWebpack = {
    mode: 'none',
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
        use: [_miniCssExtractPlugin2.default.loader, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function plugins(loader) {
              return [(0, _postcssImport2.default)(), (0, _postcssCssnext2.default)()];
            }
          }
        }]
      }]
    },
    plugins: [new _miniCssExtractPlugin2.default({
      filename: isDevelopment ? '[name].css' : '[name]-[contenthash].css'
    }), new _assetsWebpackPlugin2.default({
      path: config.paths.dst,
      filename: config.assets.manifest,
      prettyPrint: true
    }), new _webpack2.default.optimize.ModuleConcatenationPlugin(), new _webpack2.default.LoaderOptionsPlugin({
      minimize: !isDevelopment
    })],
    optimization: {
      minimizer: [new _uglifyjsWebpackPlugin2.default({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: isDevelopment
      })]
    }
  };

  configWebpack.entry = [].concat(_toConsumableArray(_glob2.default.sync(config.assets.scripts)), _toConsumableArray(_glob2.default.sync(config.assets.styles))).reduce(function (acc, filePath) {
    var _path$parse = _path2.default.parse(filePath),
        name = _path$parse.name;

    acc[name] = filePath;
    return acc;
  }, {});

  config.webpack = configWebpack;
  return config;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWctd2VicGFjay5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpc0RldmVsb3BtZW50IiwiY29uZmlnV2VicGFjayIsIm1vZGUiLCJjb250ZXh0IiwicGF0aHMiLCJzcmMiLCJvdXRwdXQiLCJmaWxlbmFtZSIsInBhdGgiLCJhc3NldHMiLCJkc3QiLCJwdWJsaWNQYXRoIiwibW9kdWxlIiwicnVsZXMiLCJ0ZXN0IiwidXNlIiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJsb2FkZXIiLCJvcHRpb25zIiwicGx1Z2lucyIsIkFzc2V0c1BsdWdpbiIsIm1hbmlmZXN0IiwicHJldHR5UHJpbnQiLCJ3ZWJwYWNrIiwib3B0aW1pemUiLCJNb2R1bGVDb25jYXRlbmF0aW9uUGx1Z2luIiwiTG9hZGVyT3B0aW9uc1BsdWdpbiIsIm1pbmltaXplIiwib3B0aW1pemF0aW9uIiwibWluaW1pemVyIiwiVWdsaWZ5SnNQbHVnaW4iLCJjYWNoZSIsInBhcmFsbGVsIiwidWdsaWZ5T3B0aW9ucyIsImNvbXByZXNzIiwiZWNtYSIsIm1hbmdsZSIsInNvdXJjZU1hcCIsImVudHJ5IiwiZ2xvYiIsInN5bmMiLCJzY3JpcHRzIiwic3R5bGVzIiwicmVkdWNlIiwiYWNjIiwiZmlsZVBhdGgiLCJwYXJzZSIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O2tCQUVlLFVBQUNBLE1BQUQsRUFBWTtBQUFBLE1BQ2pCQyxhQURpQixHQUNDRCxNQURELENBQ2pCQyxhQURpQjs7QUFFekIsTUFBTUMsZ0JBQWdCO0FBQ3BCQyxVQUFNLE1BRGM7QUFFcEJDLGFBQVNKLE9BQU9LLEtBQVAsQ0FBYUMsR0FGRjtBQUdwQkMsWUFBUTtBQUNOQyxnQkFBVVAsZ0JBQWdCLFdBQWhCLEdBQThCLHVCQURsQztBQUVOUSxZQUFNVCxPQUFPVSxNQUFQLENBQWNDLEdBRmQ7QUFHTkMsa0JBQVlaLE9BQU9VLE1BQVAsQ0FBY0U7QUFIcEIsS0FIWTtBQVFwQkMsWUFBUTtBQUNOQyxhQUFPLENBQUM7QUFDTkMsY0FBTSxPQURBO0FBRU5DLGFBQUs7QUFGQyxPQUFELEVBR0o7QUFDREQsY0FBTSxRQURMO0FBRURDLGFBQUssQ0FDSEMsK0JBQXFCQyxNQURsQixFQUVIO0FBQ0VBLGtCQUFRO0FBRFYsU0FGRyxFQUtIO0FBQ0VBLGtCQUFRLGdCQURWO0FBRUVDLG1CQUFTO0FBQ1BDLHFCQUFTLGlCQUFDRixNQUFEO0FBQUEscUJBQVksQ0FDbkIsOEJBRG1CLEVBRW5CLCtCQUZtQixDQUFaO0FBQUE7QUFERjtBQUZYLFNBTEc7QUFGSixPQUhJO0FBREQsS0FSWTtBQStCcEJFLGFBQVMsQ0FDUCxJQUFJSCw4QkFBSixDQUF5QjtBQUN2QlQsZ0JBQVVQLGdCQUFnQixZQUFoQixHQUErQjtBQURsQixLQUF6QixDQURPLEVBSVAsSUFBSW9CLDZCQUFKLENBQWlCO0FBQ2ZaLFlBQU1ULE9BQU9LLEtBQVAsQ0FBYU0sR0FESjtBQUVmSCxnQkFBVVIsT0FBT1UsTUFBUCxDQUFjWSxRQUZUO0FBR2ZDLG1CQUFhO0FBSEUsS0FBakIsQ0FKTyxFQVNQLElBQUlDLGtCQUFRQyxRQUFSLENBQWlCQyx5QkFBckIsRUFUTyxFQVVQLElBQUlGLGtCQUFRRyxtQkFBWixDQUFnQztBQUM5QkMsZ0JBQVUsQ0FBQzNCO0FBRG1CLEtBQWhDLENBVk8sQ0EvQlc7QUE2Q3BCNEIsa0JBQWM7QUFDWkMsaUJBQVcsQ0FDVCxJQUFJQywrQkFBSixDQUFtQjtBQUNqQkMsZUFBTyxJQURVO0FBRWpCQyxrQkFBVSxJQUZPO0FBR2pCQyx1QkFBZTtBQUNiQyxvQkFBVSxLQURHO0FBRWJDLGdCQUFNLENBRk87QUFHYkMsa0JBQVE7QUFISyxTQUhFO0FBUWpCQyxtQkFBV3JDO0FBUk0sT0FBbkIsQ0FEUztBQURDO0FBN0NNLEdBQXRCOztBQTZEQUMsZ0JBQWNxQyxLQUFkLEdBQXNCLDZCQUNqQkMsZUFBS0MsSUFBTCxDQUFVekMsT0FBT1UsTUFBUCxDQUFjZ0MsT0FBeEIsQ0FEaUIsc0JBRWpCRixlQUFLQyxJQUFMLENBQVV6QyxPQUFPVSxNQUFQLENBQWNpQyxNQUF4QixDQUZpQixHQUdwQkMsTUFIb0IsQ0FHYixVQUFDQyxHQUFELEVBQU1DLFFBQU4sRUFBbUI7QUFBQSxzQkFDVHJDLGVBQUtzQyxLQUFMLENBQVdELFFBQVgsQ0FEUztBQUFBLFFBQ2xCRSxJQURrQixlQUNsQkEsSUFEa0I7O0FBRTFCSCxRQUFJRyxJQUFKLElBQVlGLFFBQVo7QUFDQSxXQUFPRCxHQUFQO0FBQ0QsR0FQcUIsRUFPbkIsRUFQbUIsQ0FBdEI7O0FBU0E3QyxTQUFPd0IsT0FBUCxHQUFpQnRCLGFBQWpCO0FBQ0EsU0FBT0YsTUFBUDtBQUNELEMiLCJmaWxlIjoiY29uZmlnLXdlYnBhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snXG5pbXBvcnQgTWluaUNzc0V4dHJhY3RQbHVnaW4gZnJvbSAnbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4nXG5pbXBvcnQgQXNzZXRzUGx1Z2luIGZyb20gJ2Fzc2V0cy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBVZ2xpZnlKc1BsdWdpbiBmcm9tICd1Z2xpZnlqcy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBwb3N0Y3NzSW1wb3J0IGZyb20gJ3Bvc3Rjc3MtaW1wb3J0J1xuaW1wb3J0IHBvc3Rjc3NDc3NuZXh0IGZyb20gJ3Bvc3Rjc3MtY3NzbmV4dCdcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCB7IGlzRGV2ZWxvcG1lbnQgfSA9IGNvbmZpZ1xuICBjb25zdCBjb25maWdXZWJwYWNrID0ge1xuICAgIG1vZGU6ICdub25lJyxcbiAgICBjb250ZXh0OiBjb25maWcucGF0aHMuc3JjLFxuICAgIG91dHB1dDoge1xuICAgICAgZmlsZW5hbWU6IGlzRGV2ZWxvcG1lbnQgPyAnW25hbWVdLmpzJyA6ICdbbmFtZV0tW2NodW5raGFzaF0uanMnLFxuICAgICAgcGF0aDogY29uZmlnLmFzc2V0cy5kc3QsXG4gICAgICBwdWJsaWNQYXRoOiBjb25maWcuYXNzZXRzLnB1YmxpY1BhdGhcbiAgICB9LFxuICAgIG1vZHVsZToge1xuICAgICAgcnVsZXM6IFt7XG4gICAgICAgIHRlc3Q6IC9cXC5qcyQvLFxuICAgICAgICB1c2U6ICdiYWJlbC1sb2FkZXInXG4gICAgICB9LCB7XG4gICAgICAgIHRlc3Q6IC9cXC5jc3MkLyxcbiAgICAgICAgdXNlOiBbXG4gICAgICAgICAgTWluaUNzc0V4dHJhY3RQbHVnaW4ubG9hZGVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvYWRlcjogJ2Nzcy1sb2FkZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2FkZXI6ICdwb3N0Y3NzLWxvYWRlcicsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIHBsdWdpbnM6IChsb2FkZXIpID0+IFtcbiAgICAgICAgICAgICAgICBwb3N0Y3NzSW1wb3J0KCksXG4gICAgICAgICAgICAgICAgcG9zdGNzc0Nzc25leHQoKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgbmV3IE1pbmlDc3NFeHRyYWN0UGx1Z2luKHtcbiAgICAgICAgZmlsZW5hbWU6IGlzRGV2ZWxvcG1lbnQgPyAnW25hbWVdLmNzcycgOiAnW25hbWVdLVtjb250ZW50aGFzaF0uY3NzJ1xuICAgICAgfSksXG4gICAgICBuZXcgQXNzZXRzUGx1Z2luKHtcbiAgICAgICAgcGF0aDogY29uZmlnLnBhdGhzLmRzdCxcbiAgICAgICAgZmlsZW5hbWU6IGNvbmZpZy5hc3NldHMubWFuaWZlc3QsXG4gICAgICAgIHByZXR0eVByaW50OiB0cnVlXG4gICAgICB9KSxcbiAgICAgIG5ldyB3ZWJwYWNrLm9wdGltaXplLk1vZHVsZUNvbmNhdGVuYXRpb25QbHVnaW4oKSxcbiAgICAgIG5ldyB3ZWJwYWNrLkxvYWRlck9wdGlvbnNQbHVnaW4oe1xuICAgICAgICBtaW5pbWl6ZTogIWlzRGV2ZWxvcG1lbnRcbiAgICAgIH0pXG4gICAgXSxcbiAgICBvcHRpbWl6YXRpb246IHtcbiAgICAgIG1pbmltaXplcjogW1xuICAgICAgICBuZXcgVWdsaWZ5SnNQbHVnaW4oe1xuICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgIHBhcmFsbGVsOiB0cnVlLFxuICAgICAgICAgIHVnbGlmeU9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbXByZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVjbWE6IDYsXG4gICAgICAgICAgICBtYW5nbGU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNvdXJjZU1hcDogaXNEZXZlbG9wbWVudFxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIGNvbmZpZ1dlYnBhY2suZW50cnkgPSBbXG4gICAgLi4uZ2xvYi5zeW5jKGNvbmZpZy5hc3NldHMuc2NyaXB0cyksXG4gICAgLi4uZ2xvYi5zeW5jKGNvbmZpZy5hc3NldHMuc3R5bGVzKVxuICBdLnJlZHVjZSgoYWNjLCBmaWxlUGF0aCkgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcGF0aC5wYXJzZShmaWxlUGF0aClcbiAgICBhY2NbbmFtZV0gPSBmaWxlUGF0aFxuICAgIHJldHVybiBhY2NcbiAgfSwge30pXG5cbiAgY29uZmlnLndlYnBhY2sgPSBjb25maWdXZWJwYWNrXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==