"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _metalsmith = _interopRequireDefault(require("metalsmith"));

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _metalsmithInPlace = _interopRequireDefault(require("metalsmith-in-place"));

var _metalsmithLayouts = _interopRequireDefault(require("metalsmith-layouts"));

var _requireDir = _interopRequireDefault(require("require-dir"));

var _metalsmithRegisterHelpers = _interopRequireDefault(require("metalsmith-register-helpers"));

var _handlebarsHelpers = _interopRequireDefault(require("handlebars-helpers"));

var _metalsmithDebug = _interopRequireDefault(require("metalsmith-debug"));

var _metalsmithHtmlMinifier = _interopRequireDefault(require("metalsmith-html-minifier"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _gulpColor = _interopRequireDefault(require("gulp-color"));

var _fs = require("fs");

var _loadContent = _interopRequireDefault(require("../lib/load-content"));

var _m9MetaToFiles = _interopRequireDefault(require("../lib/metalsmith-plugins/m9-meta-to-files"));

var _m9MatterInterpolate = _interopRequireDefault(require("../lib/metalsmith-plugins/m9-matter-interpolate"));

var _m9Permalink = _interopRequireDefault(require("../lib/metalsmith-plugins/m9-permalink"));

var _readDirFiles = _interopRequireDefault(require("../lib/read-dir-files"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// register handlebars-helpers
(0, _handlebarsHelpers.default)();

function metalsmithInplaceConfig() {
  const inplaceConfig = _objectSpread({}, _config.default.inplace, {
    engineOptions: _objectSpread({}, _config.default.inplace.engineOptions)
  });

  if ((0, _fs.existsSync)(inplaceConfig.engineOptions['partials'])) {
    inplaceConfig.engineOptions['partials'] = (0, _readDirFiles.default)(inplaceConfig.engineOptions['partials']);
  }

  if ((0, _fs.existsSync)(inplaceConfig.engineOptions['helpers'])) {
    inplaceConfig.engineOptions['helpers'] = (0, _requireDir.default)(inplaceConfig.engineOptions['helpers']);
  }

  return inplaceConfig;
}

_gulp.default.task('build-metalsmith', callback => {
  if (!(0, _fs.existsSync)(_config.default.pages.directory)) {
    const msg = `No templates to compile found:\n - ${_config.default.pages.directory}`;

    _fancyLog.default.warn((0, _gulpColor.default)(msg, 'YELLOW'));

    callback();
    return;
  }

  const metalsmith = new _metalsmith.default(_config.default.paths.cwd).use((0, _metalsmithDebug.default)()).clean(false).source(_config.default.pages.directory).destination(_config.default.paths.dst).metadata(_objectSpread({}, (0, _loadContent.default)(_config.default.contentDir), {
    config: _config.default
  })).use((0, _m9MetaToFiles.default)(_config.default.metaToFiles || {})).use((0, _m9MatterInterpolate.default)());

  if ((0, _fs.existsSync)(_config.default.helpers.directory) && (0, _fs.readdirSync)(_config.default.helpers.directory).length) {
    metalsmith.use((0, _metalsmithRegisterHelpers.default)(_config.default.helpers));
  }

  metalsmith.use((0, _metalsmithInPlace.default)(metalsmithInplaceConfig()));

  if ((0, _fs.existsSync)(_config.default.layouts.directory) && (0, _fs.readdirSync)(_config.default.layouts.directory).length) {
    metalsmith.use((0, _metalsmithLayouts.default)(_config.default.layouts));
  }

  metalsmith.use((0, _m9Permalink.default)()).use((0, _metalsmithHtmlMinifier.default)(_config.default.htmlmin)).build(error => {
    if (error) return callback(error);

    _browserSync.default.reload();

    callback();
  });
  return metalsmith;
});