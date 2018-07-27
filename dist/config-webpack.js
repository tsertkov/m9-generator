"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

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


  const browserslistRcFile = _path.default.join(config.paths.src, '.browserslistrc');

  const browsers = (0, _fs.existsSync)(browserslistRcFile) ? (0, _fs.readFileSync)(browserslistRcFile).toString().trim().split(/\n|\r\n/) // default browserslist query if .browserslistcrc is missing
  : ['>0.25%', 'not ie 11', 'not op_mini all'];
  const configWebpack = {
    entry,
    mode: config.isDevelopment ? 'development' : 'production',
    context: config.paths.src,
    output: {
      filename: config.isDevelopment ? '[name].js' : '[name]-[chunkhash].js',
      path: config.assets.destinationPath,
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
          }]],
          plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-syntax-import-meta', ['@babel/plugin-proposal-class-properties', {
            'loose': false
          }], '@babel/plugin-proposal-json-strings']
        }
      }, {
        test: /\.css$/,
        use: [_miniCssExtractPlugin.default.loader, 'css-loader', {
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
            helperDirs: [config.templates.helpersPath],
            partialDirs: [config.templates.partialsPath]
          }
        }]
      }]
    },
    plugins: [new _webpackManifestPlugin.default({
      writeToFileEmit: true,
      fileName: config.assets.manifestFile
    }), new _miniCssExtractPlugin.default(config.isDevelopment ? {
      filename: '[name].css',
      chunkFilename: '[id].css'
    } : {
      filename: '[name]-[hash].css',
      chunkFilename: '[id]-[hash].css'
    })]
  };

  if (config.isDevelopment) {
    configWebpack.plugins.push(new _webpackVisualizerPlugin.default({
      filename: '../webpack-visualizer/index.html'
    }));
  }

  return configWebpack;
};

exports.default = _default;