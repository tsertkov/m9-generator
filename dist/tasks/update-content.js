"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

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
    console.log('No valid content config given');
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
  const stats = {};
  await Promise.all(contentTypes.map(type => (0, _fetchWp.fetchWpContentType)(endpoint, type).then(data => {
    stats[type] = data.length;
    return writeFile(`${staticPath}/${type}.json`, JSON.stringify(data, null, 2));
  })));
  console.log('Downloaded content stats:');
  Object.keys(stats).forEach(type => {
    console.log(type, stats[type]);
  });
}