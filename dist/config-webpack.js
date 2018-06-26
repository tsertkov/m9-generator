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

  if (isDevelopment && configWebpack.entry.length) {
    configWebpack.plugins.push(new _webpackVisualizerPlugin2.default({ filename: '../webpack-visualizer/index.html' }));

    configWebpack.entry['webpack-hot-middleware-client'] = 'webpack-hot-middleware/client';

    configWebpack.plugins.unshift(new _webpack2.default.HotModuleReplacementPlugin());
  }

  config.webpack = configWebpack;
  return config;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWctd2VicGFjay5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpc0RldmVsb3BtZW50IiwiY29uZmlnV2VicGFjayIsIm1vZGUiLCJjb250ZXh0IiwicGF0aHMiLCJzcmMiLCJvdXRwdXQiLCJmaWxlbmFtZSIsInBhdGgiLCJhc3NldHMiLCJkc3QiLCJwdWJsaWNQYXRoIiwibW9kdWxlIiwicnVsZXMiLCJ0ZXN0IiwidXNlIiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJsb2FkZXIiLCJvcHRpb25zIiwicGx1Z2lucyIsImhlbHBlckRpcnMiLCJzcmNIZWxwZXJzIiwicGFydGlhbERpcnMiLCJzcmNQYXJ0aWFscyIsImNodW5rRmlsZW5hbWUiLCJNYW5pZmVzdFBsdWdpbiIsIndyaXRlVG9GaWxlRW1pdCIsIm1hbmlmZXN0Iiwid2VicGFjayIsIkhhc2hlZE1vZHVsZUlkc1BsdWdpbiIsIm9wdGltaXplIiwiTW9kdWxlQ29uY2F0ZW5hdGlvblBsdWdpbiIsIm9wdGltaXphdGlvbiIsIm1pbmltaXplciIsIlVnbGlmeUpzUGx1Z2luIiwiY2FjaGUiLCJwYXJhbGxlbCIsInVnbGlmeU9wdGlvbnMiLCJjb21wcmVzcyIsImVjbWEiLCJtYW5nbGUiLCJzb3VyY2VNYXAiLCJPcHRpbWl6ZUNTU0Fzc2V0c1BsdWdpbiIsImVudHJ5IiwiZ2xvYiIsInN5bmMiLCJzY3JpcHRzIiwic3R5bGVzIiwicmVkdWNlIiwiYWNjIiwiZmlsZVBhdGgiLCJuYW1lIiwicGFyc2UiLCJsZW5ndGgiLCJwdXNoIiwiVmlzdWFsaXplciIsInVuc2hpZnQiLCJIb3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZ0JBLE1BQUQsSUFBWTtBQUN6QixRQUFNLEVBQUVDLGFBQUYsS0FBb0JE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QUFPRixNQUFQO0FBQ0QsQyIsImZpbGUiOiJjb25maWctd2VicGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBNaW5pQ3NzRXh0cmFjdFBsdWdpbiBmcm9tICdtaW5pLWNzcy1leHRyYWN0LXBsdWdpbidcbmltcG9ydCBVZ2xpZnlKc1BsdWdpbiBmcm9tICd1Z2xpZnlqcy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBPcHRpbWl6ZUNTU0Fzc2V0c1BsdWdpbiBmcm9tICdvcHRpbWl6ZS1jc3MtYXNzZXRzLXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IE1hbmlmZXN0UGx1Z2luIGZyb20gJ3dlYnBhY2stbWFuaWZlc3QtcGx1Z2luJ1xuaW1wb3J0IHBvc3Rjc3NJbXBvcnQgZnJvbSAncG9zdGNzcy1pbXBvcnQnXG5pbXBvcnQgcG9zdGNzc0Nzc25leHQgZnJvbSAncG9zdGNzcy1jc3NuZXh0J1xuaW1wb3J0IFZpc3VhbGl6ZXIgZnJvbSAnd2VicGFjay12aXN1YWxpemVyLXBsdWdpbidcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCB7IGlzRGV2ZWxvcG1lbnQgfSA9IGNvbmZpZ1xuICBjb25zdCBjb25maWdXZWJwYWNrID0ge1xuICAgIG1vZGU6ICdub25lJyxcbiAgICBjb250ZXh0OiBjb25maWcucGF0aHMuc3JjLFxuICAgIG91dHB1dDoge1xuICAgICAgZmlsZW5hbWU6IGlzRGV2ZWxvcG1lbnQgPyAnW25hbWVdLmpzJyA6ICdbbmFtZV0tW2NodW5raGFzaF0uanMnLFxuICAgICAgcGF0aDogY29uZmlnLmFzc2V0cy5kc3QsXG4gICAgICBwdWJsaWNQYXRoOiBjb25maWcuYXNzZXRzLnB1YmxpY1BhdGhcbiAgICB9LFxuICAgIG1vZHVsZToge1xuICAgICAgcnVsZXM6IFt7XG4gICAgICAgIHRlc3Q6IC9cXC5qcyQvLFxuICAgICAgICB1c2U6ICdiYWJlbC1sb2FkZXInXG4gICAgICB9LCB7XG4gICAgICAgIHRlc3Q6IC9cXC5jc3MkLyxcbiAgICAgICAgdXNlOiBbXG4gICAgICAgICAgaXNEZXZlbG9wbWVudFxuICAgICAgICAgICAgPyAnc3R5bGUtbG9hZGVyJ1xuICAgICAgICAgICAgOiBNaW5pQ3NzRXh0cmFjdFBsdWdpbi5sb2FkZXIsXG4gICAgICAgICAgJ2Nzcy1sb2FkZXInLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvYWRlcjogJ3Bvc3Rjc3MtbG9hZGVyJyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgcGx1Z2luczogKGxvYWRlcikgPT4gW1xuICAgICAgICAgICAgICAgIHBvc3Rjc3NJbXBvcnQoKSxcbiAgICAgICAgICAgICAgICBwb3N0Y3NzQ3NzbmV4dCgpXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sIHtcbiAgICAgICAgdGVzdDogL1xcLmhicyQvLFxuICAgICAgICB1c2U6IFt7XG4gICAgICAgICAgbG9hZGVyOiAnaGFuZGxlYmFycy1sb2FkZXInLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGhlbHBlckRpcnM6IFtjb25maWcucGF0aHMuc3JjSGVscGVyc10sXG4gICAgICAgICAgICBwYXJ0aWFsRGlyczogW2NvbmZpZy5wYXRocy5zcmNQYXJ0aWFsc11cbiAgICAgICAgICB9XG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgbmV3IE1pbmlDc3NFeHRyYWN0UGx1Z2luKHtcbiAgICAgICAgZmlsZW5hbWU6IGlzRGV2ZWxvcG1lbnQgPyAnW25hbWVdLmNzcycgOiAnW25hbWVdLVtoYXNoXS5jc3MnLFxuICAgICAgICBjaHVua0ZpbGVuYW1lOiBpc0RldmVsb3BtZW50ID8gJ1tpZF0uY3NzJyA6ICdbaWRdLVtoYXNoXS5jc3MnXG4gICAgICB9KSxcbiAgICAgIG5ldyBNYW5pZmVzdFBsdWdpbih7XG4gICAgICAgIHdyaXRlVG9GaWxlRW1pdDogdHJ1ZSxcbiAgICAgICAgZmlsZW5hbWU6IGNvbmZpZy5hc3NldHMubWFuaWZlc3RcbiAgICAgIH0pLFxuICAgICAgbmV3IHdlYnBhY2suSGFzaGVkTW9kdWxlSWRzUGx1Z2luKCksXG4gICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5Nb2R1bGVDb25jYXRlbmF0aW9uUGx1Z2luKClcbiAgICBdLFxuICAgIG9wdGltaXphdGlvbjoge1xuICAgICAgbWluaW1pemVyOiBbXG4gICAgICAgIG5ldyBVZ2xpZnlKc1BsdWdpbih7XG4gICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgcGFyYWxsZWw6IHRydWUsXG4gICAgICAgICAgdWdsaWZ5T3B0aW9uczoge1xuICAgICAgICAgICAgY29tcHJlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZWNtYTogNixcbiAgICAgICAgICAgIG1hbmdsZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc291cmNlTWFwOiBpc0RldmVsb3BtZW50XG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgT3B0aW1pemVDU1NBc3NldHNQbHVnaW4oe30pXG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgY29uZmlnV2VicGFjay5lbnRyeSA9IFtcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zY3JpcHRzKSxcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zdHlsZXMpXG4gIF0ucmVkdWNlKChhY2MsIGZpbGVQYXRoKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwYXRoLnBhcnNlKGZpbGVQYXRoKVxuICAgIGFjY1tuYW1lXSA9IGZpbGVQYXRoXG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSlcblxuICBpZiAoaXNEZXZlbG9wbWVudCAmJiBjb25maWdXZWJwYWNrLmVudHJ5Lmxlbmd0aCkge1xuICAgIGNvbmZpZ1dlYnBhY2sucGx1Z2lucy5wdXNoKFxuICAgICAgbmV3IFZpc3VhbGl6ZXIoeyBmaWxlbmFtZTogJy4uL3dlYnBhY2stdmlzdWFsaXplci9pbmRleC5odG1sJyB9KVxuICAgIClcblxuICAgIGNvbmZpZ1dlYnBhY2suZW50cnlbJ3dlYnBhY2staG90LW1pZGRsZXdhcmUtY2xpZW50J10gPVxuICAgICAgJ3dlYnBhY2staG90LW1pZGRsZXdhcmUvY2xpZW50J1xuXG4gICAgY29uZmlnV2VicGFjay5wbHVnaW5zLnVuc2hpZnQoXG4gICAgICBuZXcgd2VicGFjay5Ib3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbigpXG4gICAgKVxuICB9XG5cbiAgY29uZmlnLndlYnBhY2sgPSBjb25maWdXZWJwYWNrXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==