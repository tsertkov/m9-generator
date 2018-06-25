'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _loadConfigs = require('./lib/load-configs');

var _loadConfigs2 = _interopRequireDefault(_loadConfigs);

var _configWebpack = require('./config-webpack');

var _configWebpack2 = _interopRequireDefault(_configWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isGulpDebug = process.env.GULP_DEBUG === 'true';
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const argv = _yargs2.default.parse(process.argv);
const cwd = argv['m9-initial-cwd'];
const src = _path2.default.resolve(cwd, argv.src || process.env.SRC || 'src');
const dst = _path2.default.resolve(cwd, argv.dst || process.env.DST || 'build');

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
  dstAssets: _path2.default.join(dst, DIR_ASSETS),
  srcPublic: _path2.default.join(src, DIR_PUBLIC),
  srcScripts: _path2.default.join(src, DIR_SCRIPTS),
  srcStyles: _path2.default.join(src, DIR_STYLES),
  srcLayouts: _path2.default.join(src, DIR_LAYOUTS),
  srcContent: _path2.default.join(src, DIR_CONTENT),
  srcPages: _path2.default.join(src, DIR_PAGES),
  srcHelpers: _path2.default.join(src, DIR_HELPERS),
  srcPartials: _path2.default.join(src, DIR_PARTIALS)
};

let config = {
  isGulpDebug,
  isProduction,
  isDevelopment,
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
    src: _path2.default.join(paths.srcPublic, '**/*')
  },
  assets: {
    scripts: _path2.default.join(paths.srcScripts, '*.js'),
    styles: _path2.default.join(paths.srcStyles, '*.css'),
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

config = (0, _configWebpack2.default)(config);
(0, _loadConfigs2.default)(config, src);

exports.default = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOlsiaXNHdWxwRGVidWciLCJwcm9jZXNzIiwiZW52IiwiR1VMUF9ERUJVRyIsImlzUHJvZHVjdGlvbiIsIk5PREVfRU5WIiwiaXNEZXZlbG9wbWVudCIsImFyZ3YiLCJ5YXJncyIsInBhcnNlIiwiY3dkIiwic3JjIiwicGF0aCIsInJlc29sdmUiLCJTUkMiLCJkc3QiLCJEU1QiLCJESVJfUEFHRVMiLCJESVJfQ09OVEVOVCIsIkRJUl9IRUxQRVJTIiwiRElSX1BBUlRJQUxTIiwiRElSX0xBWU9VVFMiLCJESVJfU0NSSVBUUyIsIkRJUl9TVFlMRVMiLCJESVJfQVNTRVRTIiwiRElSX1BVQkxJQyIsIlRQTF9FTkdJTkUiLCJwYXRocyIsImRzdEFzc2V0cyIsImpvaW4iLCJzcmNQdWJsaWMiLCJzcmNTY3JpcHRzIiwic3JjU3R5bGVzIiwic3JjTGF5b3V0cyIsInNyY0NvbnRlbnQiLCJzcmNQYWdlcyIsInNyY0hlbHBlcnMiLCJzcmNQYXJ0aWFscyIsImNvbmZpZyIsImh0bWxtaW4iLCJwYXR0ZXJuIiwicGFnZXMiLCJkaXJlY3RvcnkiLCJjb250ZW50RGlyIiwidHJhbnNmb3JtZXIiLCJoZWxwZXJzIiwibGF5b3V0cyIsImVuZ2luZSIsInBhcnRpYWxzIiwiaW5wbGFjZSIsImVuZ2luZU9wdGlvbnMiLCJjb3B5IiwiYXNzZXRzIiwic2NyaXB0cyIsInN0eWxlcyIsIm1hbmlmZXN0IiwicHVibGljUGF0aCIsImRldiIsImhvc3QiLCJ3ZWJwYWNrUG9ydCIsImJyb3dzZXJzeW5jUG9ydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLGNBQWNDLFFBQVFDLEdBQVIsQ0FBWUMsVUFBWixLQUEyQixNQUEvQztBQUNBLE1BQU1DLGVBQWVILFFBQVFDLEdBQVIsQ0FBWUcsUUFBWixLQUF5QixZQUE5QztBQUNBLE1BQU1DLGdCQUFnQixDQUFDRixZQUF2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QUF2Q00sQ0FBYjs7QUE4Q0F0QixTQUFTLDZCQUFjQSxNQUFkLENBQVQ7QUFDQSwyQkFBWUEsTUFBWixFQUFvQjNCLEdBQXBCOztrQkFFZTJCLE0iLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB5YXJncyBmcm9tICd5YXJncydcbmltcG9ydCBsb2FkQ29uZmlncyBmcm9tICcuL2xpYi9sb2FkLWNvbmZpZ3MnXG5pbXBvcnQgd2VicGFja0NvbmZpZyBmcm9tICcuL2NvbmZpZy13ZWJwYWNrJ1xuXG5jb25zdCBpc0d1bHBEZWJ1ZyA9IHByb2Nlc3MuZW52LkdVTFBfREVCVUcgPT09ICd0cnVlJ1xuY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuY29uc3QgaXNEZXZlbG9wbWVudCA9ICFpc1Byb2R1Y3Rpb25cblxuY29uc3QgYXJndiA9IHlhcmdzLnBhcnNlKHByb2Nlc3MuYXJndilcbmNvbnN0IGN3ZCA9IGFyZ3ZbJ205LWluaXRpYWwtY3dkJ11cbmNvbnN0IHNyYyA9IHBhdGgucmVzb2x2ZShjd2QsIGFyZ3Yuc3JjIHx8IHByb2Nlc3MuZW52LlNSQyB8fCAnc3JjJylcbmNvbnN0IGRzdCA9IHBhdGgucmVzb2x2ZShjd2QsIGFyZ3YuZHN0IHx8IHByb2Nlc3MuZW52LkRTVCB8fCAnYnVpbGQnKVxuXG5jb25zdCBESVJfUEFHRVMgPSAncGFnZXMnXG5jb25zdCBESVJfQ09OVEVOVCA9ICdjb250ZW50J1xuY29uc3QgRElSX0hFTFBFUlMgPSAnaGVscGVycydcbmNvbnN0IERJUl9QQVJUSUFMUyA9ICdwYXJ0aWFscydcbmNvbnN0IERJUl9MQVlPVVRTID0gJ2xheW91dHMnXG5jb25zdCBESVJfU0NSSVBUUyA9ICdzY3JpcHRzJ1xuY29uc3QgRElSX1NUWUxFUyA9ICdzdHlsZXMnXG5jb25zdCBESVJfQVNTRVRTID0gJ2Fzc2V0cydcbmNvbnN0IERJUl9QVUJMSUMgPSAncHVibGljJ1xuY29uc3QgVFBMX0VOR0lORSA9ICdoYW5kbGViYXJzJ1xuXG5jb25zdCBwYXRocyA9IHtcbiAgY3dkLFxuICBzcmMsXG4gIGRzdCxcbiAgZHN0QXNzZXRzOiBwYXRoLmpvaW4oZHN0LCBESVJfQVNTRVRTKSxcbiAgc3JjUHVibGljOiBwYXRoLmpvaW4oc3JjLCBESVJfUFVCTElDKSxcbiAgc3JjU2NyaXB0czogcGF0aC5qb2luKHNyYywgRElSX1NDUklQVFMpLFxuICBzcmNTdHlsZXM6IHBhdGguam9pbihzcmMsIERJUl9TVFlMRVMpLFxuICBzcmNMYXlvdXRzOiBwYXRoLmpvaW4oc3JjLCBESVJfTEFZT1VUUyksXG4gIHNyY0NvbnRlbnQ6IHBhdGguam9pbihzcmMsIERJUl9DT05URU5UKSxcbiAgc3JjUGFnZXM6IHBhdGguam9pbihzcmMsIERJUl9QQUdFUyksXG4gIHNyY0hlbHBlcnM6IHBhdGguam9pbihzcmMsIERJUl9IRUxQRVJTKSxcbiAgc3JjUGFydGlhbHM6IHBhdGguam9pbihzcmMsIERJUl9QQVJUSUFMUylcbn1cblxubGV0IGNvbmZpZyA9IHtcbiAgaXNHdWxwRGVidWcsXG4gIGlzUHJvZHVjdGlvbixcbiAgaXNEZXZlbG9wbWVudCxcbiAgcGF0aHMsXG4gIGh0bWxtaW46IHtcbiAgICBwYXR0ZXJuOiAnKiovKi5odG1sJ1xuICB9LFxuICBwYWdlczoge1xuICAgIGRpcmVjdG9yeTogcGF0aHMuc3JjUGFnZXNcbiAgfSxcbiAgY29udGVudERpcjoge1xuICAgIGRpcmVjdG9yeTogcGF0aHMuc3JjQ29udGVudCxcbiAgICB0cmFuc2Zvcm1lcjogJ3dvcmRwcmVzcydcbiAgfSxcbiAgaGVscGVyczoge1xuICAgIGRpcmVjdG9yeTogcGF0aHMuc3JjSGVscGVyc1xuICB9LFxuICBsYXlvdXRzOiB7XG4gICAgZW5naW5lOiBUUExfRU5HSU5FLFxuICAgIGRpcmVjdG9yeTogcGF0aHMuc3JjTGF5b3V0cyxcbiAgICBwYXJ0aWFsczogcGF0aHMuc3JjUGFydGlhbHNcbiAgfSxcbiAgaW5wbGFjZToge1xuICAgIGVuZ2luZU9wdGlvbnM6IHtcbiAgICAgIHBhcnRpYWxzOiBwYXRocy5zcmNQYXJ0aWFscyxcbiAgICAgIGhlbHBlcnM6IHBhdGhzLnNyY0hlbHBlcnNcbiAgICB9XG4gIH0sXG4gIGNvcHk6IHtcbiAgICBzcmM6IHBhdGguam9pbihwYXRocy5zcmNQdWJsaWMsICcqKi8qJylcbiAgfSxcbiAgYXNzZXRzOiB7XG4gICAgc2NyaXB0czogcGF0aC5qb2luKHBhdGhzLnNyY1NjcmlwdHMsICcqLmpzJyksXG4gICAgc3R5bGVzOiBwYXRoLmpvaW4ocGF0aHMuc3JjU3R5bGVzLCAnKi5jc3MnKSxcbiAgICBtYW5pZmVzdDogJ21hbmlmZXN0Lmpzb24nLFxuICAgIHB1YmxpY1BhdGg6IGAvJHtESVJfQVNTRVRTfS9gLFxuICAgIGRzdDogcGF0aHMuZHN0QXNzZXRzXG4gIH0sXG4gIGRldjoge1xuICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgIHdlYnBhY2tQb3J0OiA5MDAwLFxuICAgIGJyb3dzZXJzeW5jUG9ydDogMzAwMFxuICB9XG59XG5cbmNvbmZpZyA9IHdlYnBhY2tDb25maWcoY29uZmlnKVxubG9hZENvbmZpZ3MoY29uZmlnLCBzcmMpXG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ1xuIl19