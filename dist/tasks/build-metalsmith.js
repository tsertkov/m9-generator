"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _path = _interopRequireDefault(require("path"));

var _metalsmith = _interopRequireDefault(require("metalsmith"));

var _handlebarsHelpers = _interopRequireDefault(require("handlebars-helpers"));

var _metalsmithDebug = _interopRequireDefault(require("metalsmith-debug"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _gulpColor = _interopRequireDefault(require("gulp-color"));

var _fs = require("fs");

var _pluginLoader = _interopRequireDefault(require("../lib/plugin-loader"));

var _content = _interopRequireDefault(require("../lib/content"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// register handlebars-helpers
(0, _handlebarsHelpers.default)();

_gulp.default.task('build-metalsmith', async done => {
  if (!(0, _fs.existsSync)(_config.default.templates.pagesPath)) {
    const msg = `No templates to compile found:\n - ${_config.default.templates.pagesPath}`;

    _fancyLog.default.warn((0, _gulpColor.default)(msg, 'YELLOW'));

    done();
    return;
  }

  const metalsmith = new _metalsmith.default(_config.default.paths.cwd).use((0, _metalsmithDebug.default)()).clean(false).source(_config.default.templates.pagesPath).destination(_config.default.templates.destinationPath).metadata((await getDataContext()));

  const metalsmithPluginsDir = _path.default.join(__dirname, '../lib/metalsmith-plugins');

  _config.default.templates.plugins.forEach(pluginMeta => {
    metalsmith.use((0, _pluginLoader.default)(pluginMeta, metalsmithPluginsDir));
  });

  metalsmith.build(done);
});

async function getDataContext() {
  const content = new _content.default(_config.default.content);

  const contentPluginsDir = _path.default.join(__dirname, '../lib/content-plugins');

  _config.default.content.plugins.forEach(pluginMeta => {
    content.use((0, _pluginLoader.default)(pluginMeta, contentPluginsDir));
  });

  return content.getContext();
}