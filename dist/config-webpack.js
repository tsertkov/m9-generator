"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _webpack = _interopRequireDefault(require("webpack"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _webpackManifestPlugin = _interopRequireDefault(require("webpack-manifest-plugin"));

var _postcssImport = _interopRequireDefault(require("postcss-import"));

var _postcssPresetEnv = _interopRequireDefault(require("postcss-preset-env"));

var _webpackVisualizerPlugin = _interopRequireDefault(require("webpack-visualizer-plugin"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = config => {
  const entry = [..._glob.default.sync(config.assets.scripts), ..._glob.default.sync(config.assets.styles)].reduce((acc, filePath) => {
    const {
      name
    } = _path.default.parse(filePath);

    acc[name] = filePath;
    return acc;
  }, {}); // Return null config when no entrypoints found

  if (!Object.keys(entry).length) {
    return null;
  } // For some reason babel seems to ignore .browserlistrc files. Manually
  // loading .browserslistrc from site src to use it by babel and posstcss.


  const browsers = (0, _fs.existsSync)(_path.default.join(config.paths.src, '.browserslistrc')) ? (0, _fs.readFileSync)(_path.default.join(config.paths.src, '.browserslistrc')).toString().trim().split(/\n|\r\n/) // default browserslist query if .browserslistcrc is missing
  : ['>0.25%', 'not ie 11', 'not op_mini all'];
  const isDevelopment = config.isDevTask;
  const configWebpack = {
    entry,
    mode: isDevelopment ? 'development' : 'production',
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
          presets: [['@babel/preset-env', {
            targets: {
              browsers
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
              browsers,
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
    plugins: [new _webpackManifestPlugin.default({
      writeToFileEmit: true,
      filename: config.assets.manifest
    })]
  };

  if (isDevelopment) {
    configWebpack.entry['webpack-hot-middleware-client'] = 'webpack-hot-middleware/client';
    configWebpack.plugins.push(new _webpack.default.HotModuleReplacementPlugin(), new _webpackVisualizerPlugin.default({
      filename: '../webpack-visualizer/index.html'
    }));
  } else {
    configWebpack.plugins.push(new _miniCssExtractPlugin.default({
      filename: '[name]-[hash].css',
      chunkFilename: '[id]-[hash].css'
    }));
  }

  return configWebpack;
};

exports.default = _default;