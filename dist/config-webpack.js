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

var _webpackVisualizerPlugin = require('webpack-visualizer-plugin');

var _webpackVisualizerPlugin2 = _interopRequireDefault(_webpackVisualizerPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = config => {
  const { isDevelopment } = config;
  const configWebpack = {
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
            plugins: loader => [(0, _postcssImport2.default)(), (0, _postcssCssnext2.default)()]
          }
        }]
      }, {
        test: /\.hbs$/,
        use: [{
          loader: 'handlebars-loader',
          options: {
            helperDirs: [config.paths.srcHelpers],
            partialDirs: [config.paths.srcPartials]
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

  configWebpack.entry = [..._glob2.default.sync(config.assets.scripts), ..._glob2.default.sync(config.assets.styles)].reduce((acc, filePath) => {
    const { name } = _path2.default.parse(filePath);
    acc[name] = filePath;
    return acc;
  }, {});

  if (isDevelopment) {
    configWebpack.plugins.push(new _webpackVisualizerPlugin2.default({ filename: '../webpack-visualizer/index.html' }));
  }

  config.webpack = configWebpack;
  return config;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWctd2VicGFjay5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpc0RldmVsb3BtZW50IiwiY29uZmlnV2VicGFjayIsIm1vZGUiLCJjb250ZXh0IiwicGF0aHMiLCJzcmMiLCJvdXRwdXQiLCJmaWxlbmFtZSIsInBhdGgiLCJhc3NldHMiLCJkc3QiLCJwdWJsaWNQYXRoIiwibW9kdWxlIiwicnVsZXMiLCJ0ZXN0IiwidXNlIiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJsb2FkZXIiLCJvcHRpb25zIiwicGx1Z2lucyIsImhlbHBlckRpcnMiLCJzcmNIZWxwZXJzIiwicGFydGlhbERpcnMiLCJzcmNQYXJ0aWFscyIsImNodW5rRmlsZW5hbWUiLCJBc3NldHNQbHVnaW4iLCJtYW5pZmVzdCIsInByZXR0eVByaW50Iiwid2VicGFjayIsIm9wdGltaXplIiwiTW9kdWxlQ29uY2F0ZW5hdGlvblBsdWdpbiIsIm9wdGltaXphdGlvbiIsIm1pbmltaXplciIsIlVnbGlmeUpzUGx1Z2luIiwiY2FjaGUiLCJwYXJhbGxlbCIsInVnbGlmeU9wdGlvbnMiLCJjb21wcmVzcyIsImVjbWEiLCJtYW5nbGUiLCJzb3VyY2VNYXAiLCJPcHRpbWl6ZUNTU0Fzc2V0c1BsdWdpbiIsImVudHJ5IiwiZ2xvYiIsInN5bmMiLCJzY3JpcHRzIiwic3R5bGVzIiwicmVkdWNlIiwiYWNjIiwiZmlsZVBhdGgiLCJuYW1lIiwicGFyc2UiLCJwdXNoIiwiVmlzdWFsaXplciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZ0JBLE1BQUQsSUFBWTtBQUN6QixRQUFNLEVBQUVDLGFBQUYsS0FBb0JELE1BQTFCO0FBQ0EsUUFBTUUsZ0JBQWdCO0FBQ3BCQyxVQUFNLE1BRGM7QUFFcEJDLGFBQVNKLE9BQU9LLEtBQVAsQ0FBYUMsR0FGRjtBQUdwQkMsWUFBUTtBQUNOQyxnQkFBVVAsZ0JBQWdCLFdBQWhCLEdBQThCLHVCQURsQztBQUVOUSxZQUFNVCxPQUFPVSxNQUFQLENBQWNDLEdBRmQ7QUFHTkMsa0JBQVlaLE9BQU9VLE1BQVAsQ0FBY0U7QUFIcEIsS0FIWTtBQVFwQkMsWUFBUTtBQUNOQyxhQUFPLENBQUM7QUFDTkMsY0FBTSxPQURBO0FBRU5DLGFBQUs7QUFGQyxPQUFELEVBR0o7QUFDREQsY0FBTSxRQURMO0FBRURDLGFBQUssQ0FDSEMsK0JBQXFCQyxNQURsQixFQUVIO0FBQ0VBLGtCQUFRO0FBRFYsU0FGRyxFQUtIO0FBQ0VBLGtCQUFRLGdCQURWO0FBRUVDLG1CQUFTO0FBQ1BDLHFCQUFVRixNQUFELElBQVksQ0FDbkIsOEJBRG1CLEVBRW5CLCtCQUZtQjtBQURkO0FBRlgsU0FMRztBQUZKLE9BSEksRUFvQko7QUFDREgsY0FBTSxRQURMO0FBRURDLGFBQUssQ0FBQztBQUNKRSxrQkFBUSxtQkFESjtBQUVKQyxtQkFBUztBQUNQRSx3QkFBWSxDQUFDckIsT0FBT0ssS0FBUCxDQUFhaUIsVUFBZCxDQURMO0FBRVBDLHlCQUFhLENBQUN2QixPQUFPSyxLQUFQLENBQWFtQixXQUFkO0FBRk47QUFGTCxTQUFEO0FBRkosT0FwQkk7QUFERCxLQVJZO0FBd0NwQkosYUFBUyxDQUNQLElBQUlILDhCQUFKLENBQXlCO0FBQ3ZCVCxnQkFBVVAsZ0JBQWdCLFlBQWhCLEdBQStCLG1CQURsQjtBQUV2QndCLHFCQUFleEIsZ0JBQWdCLFVBQWhCLEdBQTZCO0FBRnJCLEtBQXpCLENBRE8sRUFLUCxJQUFJeUIsNkJBQUosQ0FBaUI7QUFDZmpCLFlBQU1ULE9BQU9LLEtBQVAsQ0FBYU0sR0FESjtBQUVmSCxnQkFBVVIsT0FBT1UsTUFBUCxDQUFjaUIsUUFGVDtBQUdmQyxtQkFBYTtBQUhFLEtBQWpCLENBTE8sRUFVUCxJQUFJQyxrQkFBUUMsUUFBUixDQUFpQkMseUJBQXJCLEVBVk8sQ0F4Q1c7QUFvRHBCQyxrQkFBYztBQUNaQyxpQkFBVyxDQUNULElBQUlDLCtCQUFKLENBQW1CO0FBQ2pCQyxlQUFPLElBRFU7QUFFakJDLGtCQUFVLElBRk87QUFHakJDLHVCQUFlO0FBQ2JDLG9CQUFVLEtBREc7QUFFYkMsZ0JBQU0sQ0FGTztBQUdiQyxrQkFBUTtBQUhLLFNBSEU7QUFRakJDLG1CQUFXeEM7QUFSTSxPQUFuQixDQURTLEVBV1QsSUFBSXlDLHdDQUFKLENBQTRCLEVBQTVCLENBWFM7QUFEQztBQXBETSxHQUF0Qjs7QUFxRUF4QyxnQkFBY3lDLEtBQWQsR0FBc0IsQ0FDcEIsR0FBR0MsZUFBS0MsSUFBTCxDQUFVN0MsT0FBT1UsTUFBUCxDQUFjb0MsT0FBeEIsQ0FEaUIsRUFFcEIsR0FBR0YsZUFBS0MsSUFBTCxDQUFVN0MsT0FBT1UsTUFBUCxDQUFjcUMsTUFBeEIsQ0FGaUIsRUFHcEJDLE1BSG9CLENBR2IsQ0FBQ0MsR0FBRCxFQUFNQyxRQUFOLEtBQW1CO0FBQzFCLFVBQU0sRUFBRUMsSUFBRixLQUFXMUMsZUFBSzJDLEtBQUwsQ0FBV0YsUUFBWCxDQUFqQjtBQUNBRCxRQUFJRSxJQUFKLElBQVlELFFBQVo7QUFDQSxXQUFPRCxHQUFQO0FBQ0QsR0FQcUIsRUFPbkIsRUFQbUIsQ0FBdEI7O0FBU0EsTUFBSWhELGFBQUosRUFBbUI7QUFDakJDLGtCQUFja0IsT0FBZCxDQUFzQmlDLElBQXRCLENBQ0UsSUFBSUMsaUNBQUosQ0FBZSxFQUFFOUMsVUFBVSxrQ0FBWixFQUFmLENBREY7QUFHRDs7QUFFRFIsU0FBTzZCLE9BQVAsR0FBaUIzQixhQUFqQjtBQUNBLFNBQU9GLE1BQVA7QUFDRCxDIiwiZmlsZSI6ImNvbmZpZy13ZWJwYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IE1pbmlDc3NFeHRyYWN0UGx1Z2luIGZyb20gJ21pbmktY3NzLWV4dHJhY3QtcGx1Z2luJ1xuaW1wb3J0IEFzc2V0c1BsdWdpbiBmcm9tICdhc3NldHMtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgVWdsaWZ5SnNQbHVnaW4gZnJvbSAndWdsaWZ5anMtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgT3B0aW1pemVDU1NBc3NldHNQbHVnaW4gZnJvbSAnb3B0aW1pemUtY3NzLWFzc2V0cy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBwb3N0Y3NzSW1wb3J0IGZyb20gJ3Bvc3Rjc3MtaW1wb3J0J1xuaW1wb3J0IHBvc3Rjc3NDc3NuZXh0IGZyb20gJ3Bvc3Rjc3MtY3NzbmV4dCdcbmltcG9ydCBWaXN1YWxpemVyIGZyb20gJ3dlYnBhY2stdmlzdWFsaXplci1wbHVnaW4nXG5cbmV4cG9ydCBkZWZhdWx0IChjb25maWcpID0+IHtcbiAgY29uc3QgeyBpc0RldmVsb3BtZW50IH0gPSBjb25maWdcbiAgY29uc3QgY29uZmlnV2VicGFjayA9IHtcbiAgICBtb2RlOiAnbm9uZScsXG4gICAgY29udGV4dDogY29uZmlnLnBhdGhzLnNyYyxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIGZpbGVuYW1lOiBpc0RldmVsb3BtZW50ID8gJ1tuYW1lXS5qcycgOiAnW25hbWVdLVtjaHVua2hhc2hdLmpzJyxcbiAgICAgIHBhdGg6IGNvbmZpZy5hc3NldHMuZHN0LFxuICAgICAgcHVibGljUGF0aDogY29uZmlnLmFzc2V0cy5wdWJsaWNQYXRoXG4gICAgfSxcbiAgICBtb2R1bGU6IHtcbiAgICAgIHJ1bGVzOiBbe1xuICAgICAgICB0ZXN0OiAvXFwuanMkLyxcbiAgICAgICAgdXNlOiAnYmFiZWwtbG9hZGVyJ1xuICAgICAgfSwge1xuICAgICAgICB0ZXN0OiAvXFwuY3NzJC8sXG4gICAgICAgIHVzZTogW1xuICAgICAgICAgIE1pbmlDc3NFeHRyYWN0UGx1Z2luLmxvYWRlcixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2FkZXI6ICdjc3MtbG9hZGVyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9hZGVyOiAncG9zdGNzcy1sb2FkZXInLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBwbHVnaW5zOiAobG9hZGVyKSA9PiBbXG4gICAgICAgICAgICAgICAgcG9zdGNzc0ltcG9ydCgpLFxuICAgICAgICAgICAgICAgIHBvc3Rjc3NDc3NuZXh0KClcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSwge1xuICAgICAgICB0ZXN0OiAvXFwuaGJzJC8sXG4gICAgICAgIHVzZTogW3tcbiAgICAgICAgICBsb2FkZXI6ICdoYW5kbGViYXJzLWxvYWRlcicsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgaGVscGVyRGlyczogW2NvbmZpZy5wYXRocy5zcmNIZWxwZXJzXSxcbiAgICAgICAgICAgIHBhcnRpYWxEaXJzOiBbY29uZmlnLnBhdGhzLnNyY1BhcnRpYWxzXVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBuZXcgTWluaUNzc0V4dHJhY3RQbHVnaW4oe1xuICAgICAgICBmaWxlbmFtZTogaXNEZXZlbG9wbWVudCA/ICdbbmFtZV0uY3NzJyA6ICdbbmFtZV0tW2hhc2hdLmNzcycsXG4gICAgICAgIGNodW5rRmlsZW5hbWU6IGlzRGV2ZWxvcG1lbnQgPyAnW2lkXS5jc3MnIDogJ1tpZF0tW2hhc2hdLmNzcydcbiAgICAgIH0pLFxuICAgICAgbmV3IEFzc2V0c1BsdWdpbih7XG4gICAgICAgIHBhdGg6IGNvbmZpZy5wYXRocy5kc3QsXG4gICAgICAgIGZpbGVuYW1lOiBjb25maWcuYXNzZXRzLm1hbmlmZXN0LFxuICAgICAgICBwcmV0dHlQcmludDogdHJ1ZVxuICAgICAgfSksXG4gICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5Nb2R1bGVDb25jYXRlbmF0aW9uUGx1Z2luKClcbiAgICBdLFxuICAgIG9wdGltaXphdGlvbjoge1xuICAgICAgbWluaW1pemVyOiBbXG4gICAgICAgIG5ldyBVZ2xpZnlKc1BsdWdpbih7XG4gICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgcGFyYWxsZWw6IHRydWUsXG4gICAgICAgICAgdWdsaWZ5T3B0aW9uczoge1xuICAgICAgICAgICAgY29tcHJlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZWNtYTogNixcbiAgICAgICAgICAgIG1hbmdsZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc291cmNlTWFwOiBpc0RldmVsb3BtZW50XG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgT3B0aW1pemVDU1NBc3NldHNQbHVnaW4oe30pXG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgY29uZmlnV2VicGFjay5lbnRyeSA9IFtcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zY3JpcHRzKSxcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zdHlsZXMpXG4gIF0ucmVkdWNlKChhY2MsIGZpbGVQYXRoKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwYXRoLnBhcnNlKGZpbGVQYXRoKVxuICAgIGFjY1tuYW1lXSA9IGZpbGVQYXRoXG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSlcblxuICBpZiAoaXNEZXZlbG9wbWVudCkge1xuICAgIGNvbmZpZ1dlYnBhY2sucGx1Z2lucy5wdXNoKFxuICAgICAgbmV3IFZpc3VhbGl6ZXIoeyBmaWxlbmFtZTogJy4uL3dlYnBhY2stdmlzdWFsaXplci9pbmRleC5odG1sJyB9KVxuICAgIClcbiAgfVxuXG4gIGNvbmZpZy53ZWJwYWNrID0gY29uZmlnV2VicGFja1xuICByZXR1cm4gY29uZmlnXG59XG4iXX0=