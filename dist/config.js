"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _yargs = _interopRequireDefault(require("yargs"));

var _fs = require("fs");

var _requireDir = _interopRequireDefault(require("require-dir"));

var _loadConfigs = _interopRequireDefault(require("./lib/load-configs"));

var _loadTasks = _interopRequireDefault(require("./lib/load-tasks"));

var _readDirFiles = _interopRequireDefault(require("./lib/read-dir-files"));

var _configWebpack = _interopRequireDefault(require("./config-webpack"));

var _gulpRunner = require("./gulp-runner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NB! Gulp has changed cwd to m9-generator package directory
// Get original cwd
const {
  cwd,
  isDevelopment
} = _gulpRunner.registry;

const argv = _yargs.default.parse(process.argv); // A stage site is building for


const stage = argv.stage || process.env.STAGE || 'development';

const src = _path.default.resolve(cwd, argv.src || process.env.SRC || 'src');

const dst = _path.default.resolve(cwd, argv.dst || process.env.DST || 'build');

const DIR_PAGES = 'pages';
const DIR_CONTENT = 'content';
const DIR_HELPERS = 'helpers';
const DIR_PARTIALS = 'partials';
const DIR_SCRIPTS = 'scripts';
const DIR_STYLES = 'styles';
const DIR_ASSETS = 'assets';
const DIR_PUBLIC = 'public';
const paths = {
  cwd,
  src,
  dst,
  dstAssets: _path.default.join(dst, DIR_ASSETS),
  srcPublic: _path.default.join(src, DIR_PUBLIC),
  srcScripts: _path.default.join(src, DIR_SCRIPTS),
  srcStyles: _path.default.join(src, DIR_STYLES),
  srcContent: _path.default.join(src, DIR_CONTENT),
  srcPages: _path.default.join(src, DIR_PAGES),
  srcHelpers: _path.default.join(src, DIR_HELPERS),
  srcPartials: _path.default.join(src, DIR_PARTIALS)
};

const metalsmithInPlaceOptions = ((options = {
  engineOptions: {}
}) => {
  if ((0, _fs.existsSync)(paths.srcPartials)) {
    options.engineOptions.partials = (0, _readDirFiles.default)(paths.srcPartials);
  }

  if ((0, _fs.existsSync)(paths.srcHelpers)) {
    options.engineOptions.helpers = (0, _requireDir.default)(paths.srcHelpers);
  }

  return options;
})();

let config = {
  stage,
  isDevelopment,
  paths,
  templates: {
    destinationPath: paths.dst,
    publicPath: paths.srcPublic,
    pagesPath: paths.srcPages,
    partialsPath: paths.srcPartials,
    helpersPath: paths.srcHelpers,
    plugins: ['meta-to-files', 'matter-interpolate', {
      name: 'metalsmith-in-place',
      options: metalsmithInPlaceOptions
    }, 'permalink', {
      name: 'build-manifest',
      options: {
        manifestFile: 'build.json'
      }
    }]
  },
  content: {
    contentPath: paths.srcContent,
    plugins: [{
      name: 'json-dir',
      options: _path.default.join(paths.srcContent, 'static')
    }, {
      name: 'js-dir',
      options: _path.default.join(paths.srcContent, 'dynamic')
    }, 'assets-manifest', 'transform-wp-json']
  },
  assets: {
    scripts: _path.default.join(paths.srcScripts, '*.js'),
    styles: _path.default.join(paths.srcStyles, '*.css'),
    manifestFile: 'assets.json',
    publicPath: `/${DIR_ASSETS}/`,
    destinationPath: paths.dstAssets
  }
};
config.__webpack = (0, _configWebpack.default)(config);
(0, _loadConfigs.default)(src, config);
(0, _loadTasks.default)(src, config);
var _default = config;
exports.default = _default;