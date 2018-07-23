"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _yargs = _interopRequireDefault(require("yargs"));

var _loadConfigs = _interopRequireDefault(require("./lib/load-configs"));

var _configWebpack = _interopRequireDefault(require("./config-webpack"));

var _gulpRunner = require("./gulp-runner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get original cwd
const {
  cwd,
  isDevelopment
} = _gulpRunner.registry;

const argv = _yargs.default.parse(process.argv); // Stage site is building for


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
let config = {
  stage,
  isDevelopment,
  paths,
  templates: {
    destinationPath: paths.dst,
    pagesPath: paths.srcPages,
    publicPath: paths.srcPublic,
    partialsPath: paths.srcPartials,
    helpersPath: paths.srcHelpers,
    metaToFiles: {},
    buildManifestFile: 'build.json',
    // TODO pluggable metalsmith plugins
    htmlmin: {
      pattern: '**/*.html'
    }
  },
  content: {
    contentPath: paths.srcContent,
    // TODO pluggable content sync gulp task
    // TODO pluggable content plugins
    transformer: 'wordpress'
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
(0, _loadConfigs.default)(config, src);
var _default = config;
exports.default = _default;