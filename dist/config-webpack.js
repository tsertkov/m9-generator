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

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

var _optimizeCssAssetsWebpackPlugin2 = _interopRequireDefault(_optimizeCssAssetsWebpackPlugin);

var _webpackManifestPlugin = require('webpack-manifest-plugin');

var _webpackManifestPlugin2 = _interopRequireDefault(_webpackManifestPlugin);

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
        use: [isDevelopment ? 'style-loader' : _miniCssExtractPlugin2.default.loader, 'css-loader', {
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
    }), new _webpackManifestPlugin2.default({
      writeToFileEmit: true,
      filename: config.assets.manifest
    }), new _webpack2.default.HashedModuleIdsPlugin(), new _webpack2.default.optimize.ModuleConcatenationPlugin()],
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

    configWebpack.entry['webpack-hot-middleware-client'] = 'webpack-hot-middleware/client';

    configWebpack.plugins.unshift(new _webpack2.default.HotModuleReplacementPlugin());
  }

  config.webpack = configWebpack;
  return config;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWctd2VicGFjay5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpc0RldmVsb3BtZW50IiwiY29uZmlnV2VicGFjayIsIm1vZGUiLCJjb250ZXh0IiwicGF0aHMiLCJzcmMiLCJvdXRwdXQiLCJmaWxlbmFtZSIsInBhdGgiLCJhc3NldHMiLCJkc3QiLCJwdWJsaWNQYXRoIiwibW9kdWxlIiwicnVsZXMiLCJ0ZXN0IiwidXNlIiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJsb2FkZXIiLCJvcHRpb25zIiwicGx1Z2lucyIsImhlbHBlckRpcnMiLCJzcmNIZWxwZXJzIiwicGFydGlhbERpcnMiLCJzcmNQYXJ0aWFscyIsImNodW5rRmlsZW5hbWUiLCJNYW5pZmVzdFBsdWdpbiIsIndyaXRlVG9GaWxlRW1pdCIsIm1hbmlmZXN0Iiwid2VicGFjayIsIkhhc2hlZE1vZHVsZUlkc1BsdWdpbiIsIm9wdGltaXplIiwiTW9kdWxlQ29uY2F0ZW5hdGlvblBsdWdpbiIsIm9wdGltaXphdGlvbiIsIm1pbmltaXplciIsIlVnbGlmeUpzUGx1Z2luIiwiY2FjaGUiLCJwYXJhbGxlbCIsInVnbGlmeU9wdGlvbnMiLCJjb21wcmVzcyIsImVjbWEiLCJtYW5nbGUiLCJzb3VyY2VNYXAiLCJPcHRpbWl6ZUNTU0Fzc2V0c1BsdWdpbiIsImVudHJ5IiwiZ2xvYiIsInN5bmMiLCJzY3JpcHRzIiwic3R5bGVzIiwicmVkdWNlIiwiYWNjIiwiZmlsZVBhdGgiLCJuYW1lIiwicGFyc2UiLCJwdXNoIiwiVmlzdWFsaXplciIsInVuc2hpZnQiLCJIb3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZ0JBLE1BQUQsSUFBWTtBQUN6QixRQUFNLEVBQUVDLGFBQUYsS0FBb0JELE1BQTFCO0FB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Y2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snXG5pbXBvcnQgTWluaUNzc0V4dHJhY3RQbHVnaW4gZnJvbSAnbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4nXG5pbXBvcnQgVWdsaWZ5SnNQbHVnaW4gZnJvbSAndWdsaWZ5anMtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgT3B0aW1pemVDU1NBc3NldHNQbHVnaW4gZnJvbSAnb3B0aW1pemUtY3NzLWFzc2V0cy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBNYW5pZmVzdFBsdWdpbiBmcm9tICd3ZWJwYWNrLW1hbmlmZXN0LXBsdWdpbidcbmltcG9ydCBwb3N0Y3NzSW1wb3J0IGZyb20gJ3Bvc3Rjc3MtaW1wb3J0J1xuaW1wb3J0IHBvc3Rjc3NDc3NuZXh0IGZyb20gJ3Bvc3Rjc3MtY3NzbmV4dCdcbmltcG9ydCBWaXN1YWxpemVyIGZyb20gJ3dlYnBhY2stdmlzdWFsaXplci1wbHVnaW4nXG5cbmV4cG9ydCBkZWZhdWx0IChjb25maWcpID0+IHtcbiAgY29uc3QgeyBpc0RldmVsb3BtZW50IH0gPSBjb25maWdcbiAgY29uc3QgY29uZmlnV2VicGFjayA9IHtcbiAgICBtb2RlOiAnbm9uZScsXG4gICAgY29udGV4dDogY29uZmlnLnBhdGhzLnNyYyxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIGZpbGVuYW1lOiBpc0RldmVsb3BtZW50ID8gJ1tuYW1lXS5qcycgOiAnW25hbWVdLVtjaHVua2hhc2hdLmpzJyxcbiAgICAgIHBhdGg6IGNvbmZpZy5hc3NldHMuZHN0LFxuICAgICAgcHVibGljUGF0aDogY29uZmlnLmFzc2V0cy5wdWJsaWNQYXRoXG4gICAgfSxcbiAgICBtb2R1bGU6IHtcbiAgICAgIHJ1bGVzOiBbe1xuICAgICAgICB0ZXN0OiAvXFwuanMkLyxcbiAgICAgICAgdXNlOiAnYmFiZWwtbG9hZGVyJ1xuICAgICAgfSwge1xuICAgICAgICB0ZXN0OiAvXFwuY3NzJC8sXG4gICAgICAgIHVzZTogW1xuICAgICAgICAgIGlzRGV2ZWxvcG1lbnRcbiAgICAgICAgICAgID8gJ3N0eWxlLWxvYWRlcidcbiAgICAgICAgICAgIDogTWluaUNzc0V4dHJhY3RQbHVnaW4ubG9hZGVyLFxuICAgICAgICAgICdjc3MtbG9hZGVyJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2FkZXI6ICdwb3N0Y3NzLWxvYWRlcicsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIHBsdWdpbnM6IChsb2FkZXIpID0+IFtcbiAgICAgICAgICAgICAgICBwb3N0Y3NzSW1wb3J0KCksXG4gICAgICAgICAgICAgICAgcG9zdGNzc0Nzc25leHQoKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LCB7XG4gICAgICAgIHRlc3Q6IC9cXC5oYnMkLyxcbiAgICAgICAgdXNlOiBbe1xuICAgICAgICAgIGxvYWRlcjogJ2hhbmRsZWJhcnMtbG9hZGVyJyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBoZWxwZXJEaXJzOiBbY29uZmlnLnBhdGhzLnNyY0hlbHBlcnNdLFxuICAgICAgICAgICAgcGFydGlhbERpcnM6IFtjb25maWcucGF0aHMuc3JjUGFydGlhbHNdXG4gICAgICAgICAgfVxuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIG5ldyBNaW5pQ3NzRXh0cmFjdFBsdWdpbih7XG4gICAgICAgIGZpbGVuYW1lOiBpc0RldmVsb3BtZW50ID8gJ1tuYW1lXS5jc3MnIDogJ1tuYW1lXS1baGFzaF0uY3NzJyxcbiAgICAgICAgY2h1bmtGaWxlbmFtZTogaXNEZXZlbG9wbWVudCA/ICdbaWRdLmNzcycgOiAnW2lkXS1baGFzaF0uY3NzJ1xuICAgICAgfSksXG4gICAgICBuZXcgTWFuaWZlc3RQbHVnaW4oe1xuICAgICAgICB3cml0ZVRvRmlsZUVtaXQ6IHRydWUsXG4gICAgICAgIGZpbGVuYW1lOiBjb25maWcuYXNzZXRzLm1hbmlmZXN0XG4gICAgICB9KSxcbiAgICAgIG5ldyB3ZWJwYWNrLkhhc2hlZE1vZHVsZUlkc1BsdWdpbigpLFxuICAgICAgbmV3IHdlYnBhY2sub3B0aW1pemUuTW9kdWxlQ29uY2F0ZW5hdGlvblBsdWdpbigpXG4gICAgXSxcbiAgICBvcHRpbWl6YXRpb246IHtcbiAgICAgIG1pbmltaXplcjogW1xuICAgICAgICBuZXcgVWdsaWZ5SnNQbHVnaW4oe1xuICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgIHBhcmFsbGVsOiB0cnVlLFxuICAgICAgICAgIHVnbGlmeU9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbXByZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVjbWE6IDYsXG4gICAgICAgICAgICBtYW5nbGU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNvdXJjZU1hcDogaXNEZXZlbG9wbWVudFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IE9wdGltaXplQ1NTQXNzZXRzUGx1Z2luKHt9KVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIGNvbmZpZ1dlYnBhY2suZW50cnkgPSBbXG4gICAgLi4uZ2xvYi5zeW5jKGNvbmZpZy5hc3NldHMuc2NyaXB0cyksXG4gICAgLi4uZ2xvYi5zeW5jKGNvbmZpZy5hc3NldHMuc3R5bGVzKVxuICBdLnJlZHVjZSgoYWNjLCBmaWxlUGF0aCkgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcGF0aC5wYXJzZShmaWxlUGF0aClcbiAgICBhY2NbbmFtZV0gPSBmaWxlUGF0aFxuICAgIHJldHVybiBhY2NcbiAgfSwge30pXG5cbiAgaWYgKGlzRGV2ZWxvcG1lbnQpIHtcbiAgICBjb25maWdXZWJwYWNrLnBsdWdpbnMucHVzaChcbiAgICAgIG5ldyBWaXN1YWxpemVyKHsgZmlsZW5hbWU6ICcuLi93ZWJwYWNrLXZpc3VhbGl6ZXIvaW5kZXguaHRtbCcgfSlcbiAgICApXG5cbiAgICBjb25maWdXZWJwYWNrLmVudHJ5Wyd3ZWJwYWNrLWhvdC1taWRkbGV3YXJlLWNsaWVudCddID1cbiAgICAgICd3ZWJwYWNrLWhvdC1taWRkbGV3YXJlL2NsaWVudCdcblxuICAgIGNvbmZpZ1dlYnBhY2sucGx1Z2lucy51bnNoaWZ0KFxuICAgICAgbmV3IHdlYnBhY2suSG90TW9kdWxlUmVwbGFjZW1lbnRQbHVnaW4oKVxuICAgIClcbiAgfVxuXG4gIGNvbmZpZy53ZWJwYWNrID0gY29uZmlnV2VicGFja1xuICByZXR1cm4gY29uZmlnXG59XG4iXX0=