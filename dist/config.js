"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _yargs = _interopRequireDefault(require("yargs"));

var _loadConfigs = _interopRequireDefault(require("./lib/load-configs"));

var _loadTasks = _interopRequireDefault(require("./lib/load-tasks"));

var _configWebpack = _interopRequireDefault(require("./config-webpack"));

var _registry = _interopRequireDefault(require("../registry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NB! Gulp has changed cwd to m9-generator package directory
// Get original cwd
const {
  cwd,
  isDevelopment
} = _registry.default;

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
  srcEmbeddedHelpers: _path.default.join(__dirname, './lib/helpers'),
  srcPartials: _path.default.join(src, DIR_PARTIALS)
};
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
    embeddedHelpersPath: paths.srcEmbeddedHelpers,
    plugins: ['matter-parse', {
      name: 'handlebars-compile',
      options: {
        partials: paths.srcPartials,
        helpers: [paths.srcEmbeddedHelpers, paths.srcHelpers]
      }
    }, 'multifile', 'handlebars-execute', 'path', {
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
    }, 'transform-wp-json', 'assets-manifest', {
      name: 'js-dir',
      options: _path.default.join(paths.srcContent, 'dynamic')
    }]
  },
  assets: {
    scripts: _path.default.join(paths.srcScripts, '*.js'),
    styles: _path.default.join(paths.srcStyles, '*.css'),
    manifestFile: 'assets.json',
    publicPath: `/${DIR_ASSETS}/`,
    destinationPath: paths.dstAssets
  },
  deploy: {
    src: dst
  }
};
config.__webpack = (0, _configWebpack.default)(config);
config = (0, _loadConfigs.default)(src, config);
(0, _loadTasks.default)(src, config);
var _default = config;
exports.default = _default;