"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _webpack = _interopRequireDefault(require("webpack"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _uglifyjsWebpackPlugin = _interopRequireDefault(require("uglifyjs-webpack-plugin"));

var _optimizeCssAssetsWebpackPlugin = _interopRequireDefault(require("optimize-css-assets-webpack-plugin"));

var _webpackManifestPlugin = _interopRequireDefault(require("webpack-manifest-plugin"));

var _postcssImport = _interopRequireDefault(require("postcss-import"));

var _postcssPresetEnv = _interopRequireDefault(require("postcss-preset-env"));

var _webpackVisualizerPlugin = _interopRequireDefault(require("webpack-visualizer-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = config => {
  const {
    isDevelopment
  } = config;
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
        loader: 'babel-loader',
        options: {
          'presets': [['@babel/preset-env', {
            'targets': {
              'browsers': ['>0.25%', 'not ie 11', 'not op_mini all']
            }
          }], '@babel/preset-stage-3']
        }
      }, {
        test: /\.css$/,
        use: [isDevelopment ? 'style-loader' : _miniCssExtractPlugin.default.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [(0, _postcssImport.default)(), (0, _postcssPresetEnv.default)({
              stage: 2,
              features: {
                'custom-properties': {
                  preserve: false
                },
                'nesting-rules': true,
                'custom-media-queries': true
              }
            })]
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
    plugins: [new _miniCssExtractPlugin.default({
      filename: isDevelopment ? '[name].css' : '[name]-[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id]-[hash].css'
    }), new _webpackManifestPlugin.default({
      writeToFileEmit: true,
      filename: config.assets.manifest
    }), new _webpack.default.HashedModuleIdsPlugin(), new _webpack.default.optimize.ModuleConcatenationPlugin()],
    optimization: {
      minimizer: [new _uglifyjsWebpackPlugin.default({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: isDevelopment
      }), new _optimizeCssAssetsWebpackPlugin.default({})]
    }
  };
  configWebpack.entry = [..._glob.default.sync(config.assets.scripts), ..._glob.default.sync(config.assets.styles)].reduce((acc, filePath) => {
    const {
      name
    } = _path.default.parse(filePath);

    acc[name] = filePath;
    return acc;
  }, {});

  if (isDevelopment && Object.keys(configWebpack.entry).length) {
    configWebpack.plugins.push(new _webpackVisualizerPlugin.default({
      filename: '../webpack-visualizer/index.html'
    }));
    configWebpack.entry['webpack-hot-middleware-client'] = 'webpack-hot-middleware/client';
    configWebpack.plugins.unshift(new _webpack.default.HotModuleReplacementPlugin());
  }

  config.webpack = configWebpack;
  return config;
};

exports.default = _default;