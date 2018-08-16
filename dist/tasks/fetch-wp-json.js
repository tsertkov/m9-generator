"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _util = _interopRequireDefault(require("util"));

var _fs = _interopRequireDefault(require("fs"));

var _https = _interopRequireDefault(require("https"));

var _url = require("url");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const contentDir = path.join(__dirname, '../content/static')
const writeFile = _util.default.promisify(_fs.default.writeFile);

const fetchUrl = fetcUrlFactory({
  concurrency: 3
});

_gulp.default.task('update-content', async () => {
  const {
    content: contentConfig
  } = _config.default;

  if (!contentConfig.apiEndpoint) {
    _fancyLog.default.warn('No valid content config given');

    return;
  }

  return fetchWpJson(contentConfig);
});

async function fetchWpJson(config) {
  let contentTypes = Object.keys((await fetchWordpressJson(`${config.wpApiEndpoint}/types`)));

  if (config.excludedTypes) {
    contentTypes = contentTypes.filter(type => !config.excludedTypes.includes(type));
  }

  if (config.additionalTypes) {
    contentTypes = contentTypes.concat(config.additionalTypes);
  }

  await Promise.all(contentTypes.map(type => fetchWordpressJson(`${config.apiEndpoint}/${type}`).then(data => writeFile(`${config.staticPath}/${type}.json`, JSON.stringify(data, null, 2)).then(() => (0, _fancyLog.default)(type, data.length)))));
}

function fetchWordpressJson(url, {
  page = null,
  perPage = 100
} = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const params = new _url.URLSearchParams([['per_page', perPage]]);

      if (page !== null) {
        params.append('page', page);
      }

      const pageUrl = `${url}?${params}`;
      const {
        content: pageContent,
        headers
      } = await fetchUrl(pageUrl);
      let data = JSON.parse(pageContent);
      const totalPages = headers['x-wp-totalpages'];

      if (page === null && totalPages > 1) {
        const pages = [];

        for (let pageNum = 2; pageNum <= totalPages; pages.push(pageNum++));

        (await Promise.all(pages.map(page => fetchWordpressJson(url, {
          page
        })))).forEach(pageData => data = data.concat(pageData));
      }

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

function fetcUrlFactory({
  concurrency
}) {
  let running = 0;
  let queue = [];

  function processQueue() {
    if (running >= concurrency) return;
    if (!queue.length) return;
    const getUrlTask = queue.shift();
    running++;
    if (running.length < concurrency) processQueue();
    getUrl(getUrlTask);
  }

  function getUrl({
    url,
    resolve,
    reject
  }) {
    const req = _https.default.get(url, res => {
      const {
        statusCode
      } = res;

      if (statusCode !== 200) {
        reject(new Error(`Unexpected status code: ${statusCode}`));
        return;
      }

      let content = '';
      res.setEncoding('utf8');
      res.on('data', chunk => content += chunk);
      res.on('end', () => resolve({
        content,
        headers: res.headers
      }));
    });

    req.on('error', reject);
  }

  return function fetchUrl(url) {
    return new Promise((resolve, reject) => {
      const resolveFn = (...args) => {
        running--;
        resolve(...args);
        processQueue();
      };

      const rejectFn = (...args) => {
        running--;
        reject(...args); // eslint-disable-line

        processQueue();
      };

      queue.push({
        url,
        resolve: resolveFn,
        reject: rejectFn
      });
      processQueue();
    });
  };
}