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

  config.webpack = configWebpack;
  return config;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWctd2VicGFjay5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpc0RldmVsb3BtZW50IiwiY29uZmlnV2VicGFjayIsIm1vZGUiLCJjb250ZXh0IiwicGF0aHMiLCJzcmMiLCJvdXRwdXQiLCJmaWxlbmFtZSIsInBhdGgiLCJhc3NldHMiLCJkc3QiLCJwdWJsaWNQYXRoIiwibW9kdWxlIiwicnVsZXMiLCJ0ZXN0IiwidXNlIiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJsb2FkZXIiLCJvcHRpb25zIiwicGx1Z2lucyIsImhlbHBlckRpcnMiLCJzcmNIZWxwZXJzIiwicGFydGlhbERpcnMiLCJzcmNQYXJ0aWFscyIsImNodW5rRmlsZW5hbWUiLCJBc3NldHNQbHVnaW4iLCJtYW5pZmVzdCIsInByZXR0eVByaW50Iiwid2VicGFjayIsIm9wdGltaXplIiwiTW9kdWxlQ29uY2F0ZW5hdGlvblBsdWdpbiIsIm9wdGltaXphdGlvbiIsIm1pbmltaXplciIsIlVnbGlmeUpzUGx1Z2luIiwiY2FjaGUiLCJwYXJhbGxlbCIsInVnbGlmeU9wdGlvbnMiLCJjb21wcmVzcyIsImVjbWEiLCJtYW5nbGUiLCJzb3VyY2VNYXAiLCJPcHRpbWl6ZUNTU0Fzc2V0c1BsdWdpbiIsImVudHJ5IiwiZ2xvYiIsInN5bmMiLCJzY3JpcHRzIiwic3R5bGVzIiwicmVkdWNlIiwiYWNjIiwiZmlsZVBhdGgiLCJuYW1lIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVnQkEsTUFBRCxJQUFZO0FBQ3pCLFFBQU0sRUFBRUMsYUFBRixLQUFvQkQsTUFBMUI7QUFDQSxRQUFNRSxnQkFBZ0I7QUFDcEJDLFVBQU0sTUFEYztBQUVwQkMsYUFBU0osT0FBT0ssS0FBUCxDQUFhQyxHQUZGO0FBR3BCQyxZQUFRO0FBQ05DLGdCQUFVUCxnQkFBZ0IsV0FBaEIsR0FBOEIsdUJBRGxDO0FBRU5RLFlBQU1ULE9BQU9VLE1BQVAsQ0FBY0MsR0FGZDtBQUdOQyxrQkFBWVosT0FBT1UsTUFBUCxDQUFjRTtBQUhwQixLQUhZO0FBUXBCQyxZQUFRO0FBQ05DLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE9BREE7QUFFTkMsYUFBSztBQUZDLE9BQUQsRUFHSjtBQUNERCxjQUFNLFFBREw7QUFFREMsYUFBSyxDQUNIQywrQkFBcUJDLE1BRGxCLEVBRUg7QUFDRUEsa0JBQVE7QUFEVixTQUZHLEVBS0g7QUFDRUEsa0JBQVEsZ0JBRFY7QUFFRUMsbUJBQVM7QUFDUEMscUJBQVVGLE1BQUQsSUFBWSxDQUNuQiw4QkFEbUIsRUFFbkIsK0JBRm1CO0FBRGQ7QUFGWCxTQUxHO0FBRkosT0FISSxFQW9CSjtBQUNESCxjQUFNLFFBREw7QUFFREMsYUFBSyxDQUFDO0FBQ0pFLGtCQUFRLG1CQURKO0FBRUpDLG1CQUFTO0FBQ1BFLHdCQUFZLENBQUNyQixPQUFPSyxLQUFQLENBQWFpQixVQUFkLENBREw7QUFFUEMseUJBQWEsQ0FBQ3ZCLE9BQU9LLEtBQVAsQ0FBYW1CLFdBQWQ7QUFGTjtBQUZMLFNBQUQ7QUFGSixPQXBCSTtBQURELEtBUlk7QUF3Q3BCSixhQUFTLENBQ1AsSUFBSUgsOEJBQUosQ0FBeUI7QUFDdkJULGdCQUFVUCxnQkFBZ0IsWUFBaEIsR0FBK0IsbUJBRGxCO0FBRXZCd0IscUJBQWV4QixnQkFBZ0IsVUFBaEIsR0FBNkI7QUFGckIsS0FBekIsQ0FETyxFQUtQLElBQUl5Qiw2QkFBSixDQUFpQjtBQUNmakIsWUFBTVQsT0FBT0ssS0FBUCxDQUFhTSxHQURKO0FBRWZILGdCQUFVUixPQUFPVSxNQUFQLENBQWNpQixRQUZUO0FBR2ZDLG1CQUFhO0FBSEUsS0FBakIsQ0FMTyxFQVVQLElBQUlDLGtCQUFRQyxRQUFSLENBQWlCQyx5QkFBckIsRUFWTyxDQXhDVztBQW9EcEJDLGtCQUFjO0FBQ1pDLGlCQUFXLENBQ1QsSUFBSUMsK0JBQUosQ0FBbUI7QUFDakJDLGVBQU8sSUFEVTtBQUVqQkMsa0JBQVUsSUFGTztBQUdqQkMsdUJBQWU7QUFDYkMsb0JBQVUsS0FERztBQUViQyxnQkFBTSxDQUZPO0FBR2JDLGtCQUFRO0FBSEssU0FIRTtBQVFqQkMsbUJBQVd4QztBQVJNLE9BQW5CLENBRFMsRUFXVCxJQUFJeUMsd0NBQUosQ0FBNEIsRUFBNUIsQ0FYUztBQURDO0FBcERNLEdBQXRCOztBQXFFQXhDLGdCQUFjeUMsS0FBZCxHQUFzQixDQUNwQixHQUFHQyxlQUFLQyxJQUFMLENBQVU3QyxPQUFPVSxNQUFQLENBQWNvQyxPQUF4QixDQURpQixFQUVwQixHQUFHRixlQUFLQyxJQUFMLENBQVU3QyxPQUFPVSxNQUFQLENBQWNxQyxNQUF4QixDQUZpQixFQUdwQkMsTUFIb0IsQ0FHYixDQUFDQyxHQUFELEVBQU1DLFFBQU4sS0FBbUI7QUFDMUIsVUFBTSxFQUFFQyxJQUFGLEtBQVcxQyxlQUFLMkMsS0FBTCxDQUFXRixRQUFYLENBQWpCO0FBQ0FELFFBQUlFLElBQUosSUFBWUQsUUFBWjtBQUNBLFdBQU9ELEdBQVA7QUFDRCxHQVBxQixFQU9uQixFQVBtQixDQUF0Qjs7QUFTQWpELFNBQU82QixPQUFQLEdBQWlCM0IsYUFBakI7QUFDQSxTQUFPRixNQUFQO0FBQ0QsQyIsImZpbGUiOiJjb25maWctd2VicGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBNaW5pQ3NzRXh0cmFjdFBsdWdpbiBmcm9tICdtaW5pLWNzcy1leHRyYWN0LXBsdWdpbidcbmltcG9ydCBBc3NldHNQbHVnaW4gZnJvbSAnYXNzZXRzLXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IFVnbGlmeUpzUGx1Z2luIGZyb20gJ3VnbGlmeWpzLXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IE9wdGltaXplQ1NTQXNzZXRzUGx1Z2luIGZyb20gJ29wdGltaXplLWNzcy1hc3NldHMtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgcG9zdGNzc0ltcG9ydCBmcm9tICdwb3N0Y3NzLWltcG9ydCdcbmltcG9ydCBwb3N0Y3NzQ3NzbmV4dCBmcm9tICdwb3N0Y3NzLWNzc25leHQnXG5cbmV4cG9ydCBkZWZhdWx0IChjb25maWcpID0+IHtcbiAgY29uc3QgeyBpc0RldmVsb3BtZW50IH0gPSBjb25maWdcbiAgY29uc3QgY29uZmlnV2VicGFjayA9IHtcbiAgICBtb2RlOiAnbm9uZScsXG4gICAgY29udGV4dDogY29uZmlnLnBhdGhzLnNyYyxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIGZpbGVuYW1lOiBpc0RldmVsb3BtZW50ID8gJ1tuYW1lXS5qcycgOiAnW25hbWVdLVtjaHVua2hhc2hdLmpzJyxcbiAgICAgIHBhdGg6IGNvbmZpZy5hc3NldHMuZHN0LFxuICAgICAgcHVibGljUGF0aDogY29uZmlnLmFzc2V0cy5wdWJsaWNQYXRoXG4gICAgfSxcbiAgICBtb2R1bGU6IHtcbiAgICAgIHJ1bGVzOiBbe1xuICAgICAgICB0ZXN0OiAvXFwuanMkLyxcbiAgICAgICAgdXNlOiAnYmFiZWwtbG9hZGVyJ1xuICAgICAgfSwge1xuICAgICAgICB0ZXN0OiAvXFwuY3NzJC8sXG4gICAgICAgIHVzZTogW1xuICAgICAgICAgIE1pbmlDc3NFeHRyYWN0UGx1Z2luLmxvYWRlcixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsb2FkZXI6ICdjc3MtbG9hZGVyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9hZGVyOiAncG9zdGNzcy1sb2FkZXInLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBwbHVnaW5zOiAobG9hZGVyKSA9PiBbXG4gICAgICAgICAgICAgICAgcG9zdGNzc0ltcG9ydCgpLFxuICAgICAgICAgICAgICAgIHBvc3Rjc3NDc3NuZXh0KClcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSwge1xuICAgICAgICB0ZXN0OiAvXFwuaGJzJC8sXG4gICAgICAgIHVzZTogW3tcbiAgICAgICAgICBsb2FkZXI6ICdoYW5kbGViYXJzLWxvYWRlcicsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgaGVscGVyRGlyczogW2NvbmZpZy5wYXRocy5zcmNIZWxwZXJzXSxcbiAgICAgICAgICAgIHBhcnRpYWxEaXJzOiBbY29uZmlnLnBhdGhzLnNyY1BhcnRpYWxzXVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBuZXcgTWluaUNzc0V4dHJhY3RQbHVnaW4oe1xuICAgICAgICBmaWxlbmFtZTogaXNEZXZlbG9wbWVudCA/ICdbbmFtZV0uY3NzJyA6ICdbbmFtZV0tW2hhc2hdLmNzcycsXG4gICAgICAgIGNodW5rRmlsZW5hbWU6IGlzRGV2ZWxvcG1lbnQgPyAnW2lkXS5jc3MnIDogJ1tpZF0tW2hhc2hdLmNzcydcbiAgICAgIH0pLFxuICAgICAgbmV3IEFzc2V0c1BsdWdpbih7XG4gICAgICAgIHBhdGg6IGNvbmZpZy5wYXRocy5kc3QsXG4gICAgICAgIGZpbGVuYW1lOiBjb25maWcuYXNzZXRzLm1hbmlmZXN0LFxuICAgICAgICBwcmV0dHlQcmludDogdHJ1ZVxuICAgICAgfSksXG4gICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5Nb2R1bGVDb25jYXRlbmF0aW9uUGx1Z2luKClcbiAgICBdLFxuICAgIG9wdGltaXphdGlvbjoge1xuICAgICAgbWluaW1pemVyOiBbXG4gICAgICAgIG5ldyBVZ2xpZnlKc1BsdWdpbih7XG4gICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgcGFyYWxsZWw6IHRydWUsXG4gICAgICAgICAgdWdsaWZ5T3B0aW9uczoge1xuICAgICAgICAgICAgY29tcHJlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZWNtYTogNixcbiAgICAgICAgICAgIG1hbmdsZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc291cmNlTWFwOiBpc0RldmVsb3BtZW50XG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgT3B0aW1pemVDU1NBc3NldHNQbHVnaW4oe30pXG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgY29uZmlnV2VicGFjay5lbnRyeSA9IFtcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zY3JpcHRzKSxcbiAgICAuLi5nbG9iLnN5bmMoY29uZmlnLmFzc2V0cy5zdHlsZXMpXG4gIF0ucmVkdWNlKChhY2MsIGZpbGVQYXRoKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwYXRoLnBhcnNlKGZpbGVQYXRoKVxuICAgIGFjY1tuYW1lXSA9IGZpbGVQYXRoXG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSlcblxuICBjb25maWcud2VicGFjayA9IGNvbmZpZ1dlYnBhY2tcbiAgcmV0dXJuIGNvbmZpZ1xufVxuIl19