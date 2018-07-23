"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _path = _interopRequireDefault(require("path"));

var _metalsmith = _interopRequireDefault(require("metalsmith"));

var _metalsmithInPlace = _interopRequireDefault(require("metalsmith-in-place"));

var _requireDir = _interopRequireDefault(require("require-dir"));

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

var _m9BuildManifest = _interopRequireDefault(require("../lib/metalsmith-plugins/m9-build-manifest"));

var _readDirFiles = _interopRequireDefault(require("../lib/read-dir-files"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// register handlebars-helpers
(0, _handlebarsHelpers.default)();

function metalsmithInplaceConfig() {
  const {
    partialsPath,
    helpersPath
  } = _config.default.templates;
  const inplaceConfig = {
    engineOptions: {}
  };

  if ((0, _fs.existsSync)(partialsPath)) {
    inplaceConfig.engineOptions.partials = (0, _readDirFiles.default)(partialsPath);
  }

  if ((0, _fs.existsSync)(helpersPath)) {
    inplaceConfig.engineOptions.helpers = (0, _requireDir.default)(helpersPath);
  }

  return inplaceConfig;
}

function getTplContext() {
  const context = _objectSpread({}, (0, _loadContent.default)(_config.default.content), {
    __config: _config.default
  });

  const assetsManifestFile = _path.default.join(_config.default.assets.destinationPath, _config.default.assets.manifestFile);

  if ((0, _fs.existsSync)(assetsManifestFile)) {
    context.__assets = require(assetsManifestFile);
  }

  return context;
}

_gulp.default.task('build-metalsmith', done => {
  if (!(0, _fs.existsSync)(_config.default.templates.pagesPath)) {
    const msg = `No templates to compile found:\n - ${_config.default.templates.pagesPath}`;

    _fancyLog.default.warn((0, _gulpColor.default)(msg, 'YELLOW'));

    done();
    return;
  }

  const inplaceConfig = metalsmithInplaceConfig();
  const metalsmith = new _metalsmith.default(_config.default.paths.cwd).use((0, _metalsmithDebug.default)()).clean(false).source(_config.default.templates.pagesPath).destination(_config.default.templates.destinationPath).metadata(getTplContext()).use((0, _m9MetaToFiles.default)(_config.default.templates.metaToFiles)).use((0, _m9MatterInterpolate.default)()).use((0, _metalsmithInPlace.default)(inplaceConfig));
  metalsmith.use((0, _m9Permalink.default)()).use((0, _metalsmithHtmlMinifier.default)(_config.default.templates.htmlmin)).use((0, _m9BuildManifest.default)(_config.default.templates.buildManifestFile)).build(done);
});