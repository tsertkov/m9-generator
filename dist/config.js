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
  isDevTask
} = _gulpRunner.registry; // Stage site is building for

const stage = process.env.STAGE || 'development';

const argv = _yargs.default.parse(process.argv);

const src = _path.default.resolve(cwd, argv.src || process.env.SRC || 'src');

const dst = _path.default.resolve(cwd, argv.dst || process.env.DST || 'build');

const DIR_PAGES = 'pages';
const DIR_CONTENT = 'content';
const DIR_HELPERS = 'helpers';
const DIR_PARTIALS = 'partials';
const DIR_LAYOUTS = 'layouts';
const DIR_SCRIPTS = 'scripts';
const DIR_STYLES = 'styles';
const DIR_ASSETS = 'assets';
const DIR_PUBLIC = 'public';
const TPL_ENGINE = 'handlebars';
const paths = {
  cwd,
  src,
  dst,
  dstAssets: _path.default.join(dst, DIR_ASSETS),
  srcPublic: _path.default.join(src, DIR_PUBLIC),
  srcScripts: _path.default.join(src, DIR_SCRIPTS),
  srcStyles: _path.default.join(src, DIR_STYLES),
  srcLayouts: _path.default.join(src, DIR_LAYOUTS),
  srcContent: _path.default.join(src, DIR_CONTENT),
  srcPages: _path.default.join(src, DIR_PAGES),
  srcHelpers: _path.default.join(src, DIR_HELPERS),
  srcPartials: _path.default.join(src, DIR_PARTIALS)
};
let config = {
  stage,
  isDevTask,
  paths,
  htmlmin: {
    pattern: '**/*.html'
  },
  pages: {
    directory: paths.srcPages
  },
  contentDir: {
    directory: paths.srcContent,
    transformer: 'wordpress'
  },
  helpers: {
    directory: paths.srcHelpers
  },
  layouts: {
    engine: TPL_ENGINE,
    directory: paths.srcLayouts,
    partials: paths.srcPartials
  },
  inplace: {
    engineOptions: {
      partials: paths.srcPartials,
      helpers: paths.srcHelpers
    }
  },
  copy: {
    src: _path.default.join(paths.srcPublic, '**/*')
  },
  assets: {
    scripts: _path.default.join(paths.srcScripts, '*.js'),
    styles: _path.default.join(paths.srcStyles, '*.css'),
    manifest: 'manifest.json',
    publicPath: `/${DIR_ASSETS}/`,
    dst: paths.dstAssets
  },
  dev: {
    host: 'localhost',
    webpackPort: 9000,
    browsersyncPort: 3000
  }
};
config = (0, _configWebpack.default)(config);
(0, _loadConfigs.default)(config, src);
var _default = config;
exports.default = _default;