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

var _optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

var _optimizeCssAssetsWebpackPlugin2 = _interopRequireDefault(_optimizeCssAssetsWebpackPlugin);

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
      filename: isDevelopment ? '[name].css' : '[name]-[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id]-[hash].css'
    }), new _assetsWebpackPlugin2.default({
      path: config.paths.dst,
      filename: config.assets.manifest,
      prettyPrint: true
    }), new _webpack2.default.optimize.ModuleConcatenationPlugin()],
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
      }), new _optimizeCssAssetsWebpackPlugin2.default({})]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWctd2VicGFjay5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpc0RldmVsb3BtZW50IiwiY29uZmlnV2VicGFjayIsIm1vZGUiLCJjb250ZXh0IiwicGF0aHMiLCJzcmMiLCJvdXRwdXQiLCJmaWxlbmFtZSIsInBhdGgiLCJhc3NldHMiLCJkc3QiLCJwdWJsaWNQYXRoIiwibW9kdWxlIiwicnVsZXMiLCJ0ZXN0IiwidXNlIiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJsb2FkZXIiLCJvcHRpb25zIiwicGx1Z2lucyIsImNodW5rRmlsZW5hbWUiLCJBc3NldHNQbHVnaW4iLCJtYW5pZmVzdCIsInByZXR0eVByaW50Iiwid2VicGFjayIsIm9wdGltaXplIiwiTW9kdWxlQ29uY2F0ZW5hdGlvblBsdWdpbiIsIm9wdGltaXphdGlvbiIsIm1pbmltaXplciIsIlVnbGlmeUpzUGx1Z2luIiwiY2FjaGUiLCJwYXJhbGxlbCIsInVnbGlmeU9wdGlvbnMiLCJjb21wcmVzcyIsImVjbWEiLCJtYW5nbGUiLCJzb3VyY2VNYXAiLCJPcHRpbWl6ZUNTU0Fzc2V0c1BsdWdpbiIsImVudHJ5IiwiZ2xvYiIsInN5bmMiLCJzY3JpcHRzIiwic3R5bGVzIiwicmVkdWNlIiwiYWNjIiwiZmlsZVBhdGgiLCJwYXJzZSIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7a0JBRWUsVUFBQ0EsTUFBRCxFQUFZO0FBQUEsTUFDakJDLGFBRGlCLEdBQ0NELE1BREQsQ0FDakJDLGFBRGlCOztBQUV6QixNQUFNQyxnQkFBZ0I7QUFDcEJDLFVBQU0sTUFEYztBQUVwQkMsYUFBU0osT0FBT0ssS0FBUCxDQUFhQyxHQUZGO0FBR3BCQyxZQUFRO0FBQ05DLGdCQUFVUCxnQkFBZ0IsV0FBaEIsR0FBOEIsdUJBRGxDO0FBRU5RLFlBQU1ULE9BQU9VLE1BQVAsQ0FBY0MsR0FGZDtBQUdOQyxrQkFBWVosT0FBT1UsTUFBUCxDQUFjRTtBQUhwQixLQUhZO0FBUXBCQyxZQUFRO0FBQ05DLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE9BREE7QUFFTkMsYUFBSztBQUZDLE9BQUQsRUFHSjtBQUNERCxjQUFNLFFBREw7QUFFREMsYUFBSyxDQUNIQywrQkFBcUJDLE1BRGxCLEVBRUg7QUFDRUEsa0JBQVE7QUFEVixTQUZHLEVBS0g7QUFDRUEsa0JBQVEsZ0JBRFY7QUFFRUMsbUJBQVM7QUFDUEMscUJBQVMsaUJBQUNGLE1BQUQ7QUFBQSxxQkFBWSxDQUNuQiw4QkFEbUIsRUFFbkIsK0JBRm1CLENBQVo7QUFBQTtBQURGO0FBRlgsU0FMRztBQUZKLE9BSEk7QUFERCxLQVJZO0FBK0JwQkUsYUFBUyxDQUNQLElBQUlILDhCQUFKLENBQXlCO0FBQ3ZCVCxnQkFBVVAsZ0JBQWdCLFlBQWhCLEdBQStCLG1CQURsQjtBQUV2Qm9CLHFCQUFlcEIsZ0JBQWdCLFVBQWhCLEdBQTZCO0FBRnJCLEtBQXpCLENBRE8sRUFLUCxJQUFJcUIsNkJBQUosQ0FBaUI7QUFDZmIsWUFBTVQsT0FBT0ssS0FBUCxDQUFhTSxHQURKO0FBRWZILGdCQUFVUixPQUFPVSxNQUFQLENBQWNhLFFBRlQ7QUFHZkMsbUJBQWE7QUFIRSxLQUFqQixDQUxPLEVBVVAsSUFBSUMsa0JBQVFDLFFBQVIsQ0FBaUJDLHlCQUFyQixFQVZPLENBL0JXO0FBMkNwQkMsa0JBQWM7QUFDWkMsaUJBQVcsQ0FDVCxJQUFJQywrQkFBSixDQUFtQjtBQUNqQkMsZUFBTyxJQURVO0FBRWpCQyxrQkFBVSxJQUZPO0FBR2pCQyx1QkFBZTtBQUNiQyxvQkFBVSxLQURHO0FBRWJDLGdCQUFNLENBRk87QUFHYkMsa0JBQVE7QUFISyxTQUhFO0FBUWpCQyxtQkFBV3BDO0FBUk0sT0FBbkIsQ0FEUyxFQVdULElBQUlxQyx3Q0FBSixDQUE0QixFQUE1QixDQVhTO0FBREM7QUEzQ00sR0FBdEI7O0FBNERBcEMsZ0JBQWNxQyxLQUFkLEdBQXNCLDZCQUNqQkMsZUFBS0MsSUFBTCxDQUFVekMsT0FBT1UsTUFBUCxDQUFjZ0MsT0FBeEIsQ0FEaUIsc0JBRWpCRixlQUFLQyxJQUFMLENBQVV6QyxPQUFPVSxNQUFQLENBQWNpQyxNQUF4QixDQUZpQixHQUdwQkMsTUFIb0IsQ0FHYixVQUFDQyxHQUFELEVBQU1DLFFBQU4sRUFBbUI7QUFBQSxzQkFDVHJDLGVBQUtzQyxLQUFMLENBQVdELFFBQVgsQ0FEUztBQUFBLFFBQ2xCRSxJQURrQixlQUNsQkEsSUFEa0I7O0FBRTFCSCxRQUFJRyxJQUFKLElBQVlGLFFBQVo7QUFDQSxXQUFPRCxHQUFQO0FBQ0QsR0FQcUIsRUFPbkIsRUFQbUIsQ0FBdEI7O0FBU0E3QyxTQUFPeUIsT0FBUCxHQUFpQnZCLGFBQWpCO0FBQ0EsU0FBT0YsTUFBUDtBQUNELEMiLCJmaWxlIjoiY29uZmlnLXdlYnBhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snXG5pbXBvcnQgTWluaUNzc0V4dHJhY3RQbHVnaW4gZnJvbSAnbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4nXG5pbXBvcnQgQXNzZXRzUGx1Z2luIGZyb20gJ2Fzc2V0cy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBVZ2xpZnlKc1BsdWdpbiBmcm9tICd1Z2xpZnlqcy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBPcHRpbWl6ZUNTU0Fzc2V0c1BsdWdpbiBmcm9tICdvcHRpbWl6ZS1jc3MtYXNzZXRzLXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IHBvc3Rjc3NJbXBvcnQgZnJvbSAncG9zdGNzcy1pbXBvcnQnXG5pbXBvcnQgcG9zdGNzc0Nzc25leHQgZnJvbSAncG9zdGNzcy1jc3NuZXh0J1xuXG5leHBvcnQgZGVmYXVsdCAoY29uZmlnKSA9PiB7XG4gIGNvbnN0IHsgaXNEZXZlbG9wbWVudCB9ID0gY29uZmlnXG4gIGNvbnN0IGNvbmZpZ1dlYnBhY2sgPSB7XG4gICAgbW9kZTogJ25vbmUnLFxuICAgIGNvbnRleHQ6IGNvbmZpZy5wYXRocy5zcmMsXG4gICAgb3V0cHV0OiB7XG4gICAgICBmaWxlbmFtZTogaXNEZXZlbG9wbWVudCA/ICdbbmFtZV0uanMnIDogJ1tuYW1lXS1bY2h1bmtoYXNoXS5qcycsXG4gICAgICBwYXRoOiBjb25maWcuYXNzZXRzLmRzdCxcbiAgICAgIHB1YmxpY1BhdGg6IGNvbmZpZy5hc3NldHMucHVibGljUGF0aFxuICAgIH0sXG4gICAgbW9kdWxlOiB7XG4gICAgICBydWxlczogW3tcbiAgICAgICAgdGVzdDogL1xcLmpzJC8sXG4gICAgICAgIHVzZTogJ2JhYmVsLWxvYWRlcidcbiAgICAgIH0sIHtcbiAgICAgICAgdGVzdDogL1xcLmNzcyQvLFxuICAgICAgICB1c2U6IFtcbiAgICAgICAgICBNaW5pQ3NzRXh0cmFjdFBsdWdpbi5sb2FkZXIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9hZGVyOiAnY3NzLWxvYWRlcidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvYWRlcjogJ3Bvc3Rjc3MtbG9hZGVyJyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgcGx1Z2luczogKGxvYWRlcikgPT4gW1xuICAgICAgICAgICAgICAgIHBvc3Rjc3NJbXBvcnQoKSxcbiAgICAgICAgICAgICAgICBwb3N0Y3NzQ3NzbmV4dCgpXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1dXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBuZXcgTWluaUNzc0V4dHJhY3RQbHVnaW4oe1xuICAgICAgICBmaWxlbmFtZTogaXNEZXZlbG9wbWVudCA/ICdbbmFtZV0uY3NzJyA6ICdbbmFtZV0tW2hhc2hdLmNzcycsXG4gICAgICAgIGNodW5rRmlsZW5hbWU6IGlzRGV2ZWxvcG1lbnQgPyAnW2lkXS5jc3MnIDogJ1tpZF0tW2hhc2hdLmNzcydcbiAgICAgIH0pLFxuICAgICAgbmV3IEFzc2V0c1BsdWdpbih7XG4gICAgICAgIHBhdGg6IGNvbmZpZy5wYXRocy5kc3QsXG4gICAgICAgIGZpbGVuYW1lOiBjb25maWcuYXNzZXRzLm1hbmlmZXN0LFxuICAgICAgICBwcmV0dHlQcmludDogdHJ1ZVxuICAgICAgfSksXG4gICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5Nb2R1bGVDb25jYXRlbmF0aW9uUGx1Z2luKClcbiAgICBdLFxuICAgIG9wdGltaXphdGlvbjoge1xuICAgICAgbWluaW1pemVyOiBbXG4gICAgICAgIG5ldyBVZ2xpZnlKc1BsdWdpbih7XG4gICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgcGFyYWxsZWw6IHRydWUsXG4gICAgICAgICAgdWdsaWZ5T3B0aW9uczoge1xuICAgICAgICAgICAgY29tcHJlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZWNtYTogNixcbiAgICAgICAgICAgIG1hbmdsZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc291cmNlTWFwOiBpc0RldmVsb3BtZW50XG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgT3B0aW1pemVDU1NBc3NldHNQbHVnaW4oe30pXG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgY29uZmlnV2VicGFjay5lbnRyeSA9IFtcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zY3JpcHRzKSxcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zdHlsZXMpXG4gIF0ucmVkdWNlKChhY2MsIGZpbGVQYXRoKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwYXRoLnBhcnNlKGZpbGVQYXRoKVxuICAgIGFjY1tuYW1lXSA9IGZpbGVQYXRoXG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSlcblxuICBjb25maWcud2VicGFjayA9IGNvbmZpZ1dlYnBhY2tcbiAgcmV0dXJuIGNvbmZpZ1xufVxuIl19