'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yargs = require('yargs');

var _loadConfigs = require('./lib/load-configs');

var _loadConfigs2 = _interopRequireDefault(_loadConfigs);

var _readPartialsDir = require('./lib/read-partials-dir');

var _readPartialsDir2 = _interopRequireDefault(_readPartialsDir);

var _configWebpack = require('./config-webpack');

var _configWebpack2 = _interopRequireDefault(_configWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isGulpDebug = process.env.GULP_DEBUG === 'true';
var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = !isProduction;

var root = _yargs.argv.root;
var src = _path2.default.join(root, 'src');
var dst = _path2.default.join(root, 'build');

var DIR_PAGES = 'pages';
var DIR_CONTENT = 'content';
var DIR_HELPERS = 'helpers';
var DIR_PARTIALS = 'partials';
var DIR_LAYOUTS = 'layouts';
var DIR_SCRIPTS = 'scripts';
var DIR_STYLES = 'styles';
var DIR_ASSETS = 'assets';
var DIR_PUBLIC = 'public';
var TPL_ENGINE = 'handlebars';

var paths = {
  root: root,
  src: src,
  dst: dst,
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

var config = {
  isGulpDebug: isGulpDebug,
  isProduction: isProduction,
  isDevelopment: isDevelopment,
  paths: paths,
  metaToFiles: {
    slugOptions: {
      replace: /[^a-z0-9]/g
    }
  },
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
      partials: (0, _readPartialsDir2.default)(paths.srcPartials)
    }
  },
  copy: {
    src: _path2.default.join(paths.srcPublic, '**/*')
  },
  assets: {
    scripts: _path2.default.join(paths.srcScripts, '*.js'),
    styles: _path2.default.join(paths.srcStyles, '*.css'),
    manifest: 'assets.json',
    publicPath: '/' + DIR_ASSETS + '/',
    dst: paths.dstAssets
  },
  dev: {
    host: 'localhost',
    webpackPort: 9000,
    browsersyncPort: 3000
  }
};

config = (0, _configWebpack2.default)(config);
(0, _loadConfigs2.default)(config, root);

exports.default = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOlsiaXNHdWxwRGVidWciLCJwcm9jZXNzIiwiZW52IiwiR1VMUF9ERUJVRyIsImlzUHJvZHVjdGlvbiIsIk5PREVfRU5WIiwiaXNEZXZlbG9wbWVudCIsInJvb3QiLCJhcmd2Iiwic3JjIiwicGF0aCIsImpvaW4iLCJkc3QiLCJESVJfUEFHRVMiLCJESVJfQ09OVEVOVCIsIkRJUl9IRUxQRVJTIiwiRElSX1BBUlRJQUxTIiwiRElSX0xBWU9VVFMiLCJESVJfU0NSSVBUUyIsIkRJUl9TVFlMRVMiLCJESVJfQVNTRVRTIiwiRElSX1BVQkxJQyIsIlRQTF9FTkdJTkUiLCJwYXRocyIsImRzdEFzc2V0cyIsInNyY1B1YmxpYyIsInNyY1NjcmlwdHMiLCJzcmNTdHlsZXMiLCJzcmNMYXlvdXRzIiwic3JjQ29udGVudCIsInNyY1BhZ2VzIiwic3JjSGVscGVycyIsInNyY1BhcnRpYWxzIiwiY29uZmlnIiwibWV0YVRvRmlsZXMiLCJzbHVnT3B0aW9ucyIsInJlcGxhY2UiLCJodG1sbWluIiwicGF0dGVybiIsInBhZ2VzIiwiZGlyZWN0b3J5IiwiY29udGVudERpciIsInRyYW5zZm9ybWVyIiwiaGVscGVycyIsImxheW91dHMiLCJlbmdpbmUiLCJwYXJ0aWFscyIsImlucGxhY2UiLCJlbmdpbmVPcHRpb25zIiwiY29weSIsImFzc2V0cyIsInNjcmlwdHMiLCJzdHlsZXMiLCJtYW5pZmVzdCIsInB1YmxpY1BhdGgiLCJkZXYiLCJob3N0Iiwid2VicGFja1BvcnQiLCJicm93c2Vyc3luY1BvcnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxjQUFjQyxRQUFRQyxHQUFSLENBQVlDLFVBQVosS0FBMkIsTUFBL0M7QUFDQSxJQUFNQyxlQUFlSCxRQUFRQyxHQUFSLENBQVlHLFFBQVosS0FBeUIsWUFBOUM7QUFDQSxJQUFNQyxnQkFBZ0IsQ0FB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dCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgYXJndiB9IGZyb20gJ3lhcmdzJ1xuaW1wb3J0IGxvYWRDb25maWdzIGZyb20gJy4vbGliL2xvYWQtY29uZmlncydcbmltcG9ydCByZWFkUGFydGlhbHNEaXIgZnJvbSAnLi9saWIvcmVhZC1wYXJ0aWFscy1kaXInXG5pbXBvcnQgd2VicGFja0NvbmZpZyBmcm9tICcuL2NvbmZpZy13ZWJwYWNrJ1xuXG5jb25zdCBpc0d1bHBEZWJ1ZyA9IHByb2Nlc3MuZW52LkdVTFBfREVCVUcgPT09ICd0cnVlJ1xuY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuY29uc3QgaXNEZXZlbG9wbWVudCA9ICFpc1Byb2R1Y3Rpb25cblxuY29uc3Qgcm9vdCA9IGFyZ3Yucm9vdFxuY29uc3Qgc3JjID0gcGF0aC5qb2luKHJvb3QsICdzcmMnKVxuY29uc3QgZHN0ID0gcGF0aC5qb2luKHJvb3QsICdidWlsZCcpXG5cbmNvbnN0IERJUl9QQUdFUyA9ICdwYWdlcydcbmNvbnN0IERJUl9DT05URU5UID0gJ2NvbnRlbnQnXG5jb25zdCBESVJfSEVMUEVSUyA9ICdoZWxwZXJzJ1xuY29uc3QgRElSX1BBUlRJQUxTID0gJ3BhcnRpYWxzJ1xuY29uc3QgRElSX0xBWU9VVFMgPSAnbGF5b3V0cydcbmNvbnN0IERJUl9TQ1JJUFRTID0gJ3NjcmlwdHMnXG5jb25zdCBESVJfU1RZTEVTID0gJ3N0eWxlcydcbmNvbnN0IERJUl9BU1NFVFMgPSAnYXNzZXRzJ1xuY29uc3QgRElSX1BVQkxJQyA9ICdwdWJsaWMnXG5jb25zdCBUUExfRU5HSU5FID0gJ2hhbmRsZWJhcnMnXG5cbmNvbnN0IHBhdGhzID0ge1xuICByb290LFxuICBzcmMsXG4gIGRzdCxcbiAgZHN0QXNzZXRzOiBwYXRoLmpvaW4oZHN0LCBESVJfQVNTRVRTKSxcbiAgc3JjUHVibGljOiBwYXRoLmpvaW4oc3JjLCBESVJfUFVCTElDKSxcbiAgc3JjU2NyaXB0czogcGF0aC5qb2luKHNyYywgRElSX1NDUklQVFMpLFxuICBzcmNTdHlsZXM6IHBhdGguam9pbihzcmMsIERJUl9TVFlMRVMpLFxuICBzcmNMYXlvdXRzOiBwYXRoLmpvaW4oc3JjLCBESVJfTEFZT1VUUyksXG4gIHNyY0NvbnRlbnQ6IHBhdGguam9pbihzcmMsIERJUl9DT05URU5UKSxcbiAgc3JjUGFnZXM6IHBhdGguam9pbihzcmMsIERJUl9QQUdFUyksXG4gIHNyY0hlbHBlcnM6IHBhdGguam9pbihzcmMsIERJUl9IRUxQRVJTKSxcbiAgc3JjUGFydGlhbHM6IHBhdGguam9pbihzcmMsIERJUl9QQVJUSUFMUylcbn1cblxubGV0IGNvbmZpZyA9IHtcbiAgaXNHdWxwRGVidWcsXG4gIGlzUHJvZHVjdGlvbixcbiAgaXNEZXZlbG9wbWVudCxcbiAgcGF0aHMsXG4gIG1ldGFUb0ZpbGVzOiB7XG4gICAgc2x1Z09wdGlvbnM6IHtcbiAgICAgIHJlcGxhY2U6IC9bXmEtejAtOV0vZ1xuICAgIH1cbiAgfSxcbiAgaHRtbG1pbjoge1xuICAgIHBhdHRlcm46ICcqKi8qLmh0bWwnXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgZGlyZWN0b3J5OiBwYXRocy5zcmNQYWdlc1xuICB9LFxuICBjb250ZW50RGlyOiB7XG4gICAgZGlyZWN0b3J5OiBwYXRocy5zcmNDb250ZW50LFxuICAgIHRyYW5zZm9ybWVyOiAnd29yZHByZXNzJ1xuICB9LFxuICBoZWxwZXJzOiB7XG4gICAgZGlyZWN0b3J5OiBwYXRocy5zcmNIZWxwZXJzXG4gIH0sXG4gIGxheW91dHM6IHtcbiAgICBlbmdpbmU6IFRQTF9FTkdJTkUsXG4gICAgZGlyZWN0b3J5OiBwYXRocy5zcmNMYXlvdXRzLFxuICAgIHBhcnRpYWxzOiBwYXRocy5zcmNQYXJ0aWFsc1xuICB9LFxuICBpbnBsYWNlOiB7XG4gICAgZW5naW5lT3B0aW9uczoge1xuICAgICAgcGFydGlhbHM6IHJlYWRQYXJ0aWFsc0RpcihwYXRocy5zcmNQYXJ0aWFscylcbiAgICB9XG4gIH0sXG4gIGNvcHk6IHtcbiAgICBzcmM6IHBhdGguam9pbihwYXRocy5zcmNQdWJsaWMsICcqKi8qJylcbiAgfSxcbiAgYXNzZXRzOiB7XG4gICAgc2NyaXB0czogcGF0aC5qb2luKHBhdGhzLnNyY1NjcmlwdHMsICcqLmpzJyksXG4gICAgc3R5bGVzOiBwYXRoLmpvaW4ocGF0aHMuc3JjU3R5bGVzLCAnKi5jc3MnKSxcbiAgICBtYW5pZmVzdDogJ2Fzc2V0cy5qc29uJyxcbiAgICBwdWJsaWNQYXRoOiBgLyR7RElSX0FTU0VUU30vYCxcbiAgICBkc3Q6IHBhdGhzLmRzdEFzc2V0c1xuICB9LFxuICBkZXY6IHtcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICB3ZWJwYWNrUG9ydDogOTAwMCxcbiAgICBicm93c2Vyc3luY1BvcnQ6IDMwMDBcbiAgfVxufVxuXG5jb25maWcgPSB3ZWJwYWNrQ29uZmlnKGNvbmZpZylcbmxvYWRDb25maWdzKGNvbmZpZywgcm9vdClcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnXG4iXX0=