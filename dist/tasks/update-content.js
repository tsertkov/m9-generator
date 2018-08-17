"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _gulpColor = _interopRequireDefault(require("gulp-color"));

var _util = _interopRequireDefault(require("util"));

var _fs = _interopRequireDefault(require("fs"));

var _fetchWp = require("../lib/fetch-wp");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const writeFile = _util.default.promisify(_fs.default.writeFile);

_gulp.default.task('update-content', () => {
  const {
    wpJson
  } = _config.default.content;

  if (!wpJson.endpoint) {
    _fancyLog.default.warn((0, _gulpColor.default)('No valid content config given', 'YELLOW'));

    return;
  }

  return fetchWpJson(wpJson);
});

async function fetchWpJson(config) {
  const {
    endpoint,
    exclude = [],
    include = [],
    staticPath
  } = config;
  let contentTypes = await (0, _fetchWp.fetchContentTypes)({
    endpoint,
    exclude,
    include
  });
  await Promise.all(contentTypes.map(type => (0, _fetchWp.fetchWpContentType)(endpoint, type).then(data => writeFile(`${staticPath}/${type}.json`, JSON.stringify(data, null, 2)).then(() => (0, _fancyLog.default)(type, data.length)))));
}