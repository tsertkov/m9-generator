"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContentTypes = fetchContentTypes;
exports.fetchWpContent = fetchWpContent;
exports.fetchWpContentType = fetchWpContentType;

var _https = _interopRequireDefault(require("https"));

var _http = _interopRequireDefault(require("http"));

var _url = require("url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetchUrl = fetcUrlFactory({
  concurrency: 3
});

async function fetchContentTypes({
  endpoint,
  exclude = [],
  include = []
}) {
  return Object.keys((await fetchWpContentType(endpoint, 'types'))).filter(type => !exclude.includes(type)).concat(include);
}

async function fetchWpContent(options) {
  const {
    endpoint
  } = options;
  const types = await fetchContentTypes(options);
  const contentArr = await Promise.all(types.map(type => fetchWpContentType(endpoint, type)));
  const content = contentArr.reduce((acc, cur, idx) => {
    const type = types[idx];
    acc[type] = cur;
    return acc;
  }, {});
  return content;
}

function fetchWpContentType(endpoint, contentType, {
  page = null,
  perPage = 100
} = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const params = new _url.URLSearchParams([['per_page', perPage]]);

      if (page !== null) {
        params.append('page', page);
      }

      const url = endpoint + '/' + contentType;
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

        (await Promise.all(pages.map(page => fetchWpContentType(endpoint, contentType, {
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
    console.log(`Downloading ${url}`);
    const client = url.startsWith('https') ? _https.default : _http.default;
    const req = client.get(url, res => {
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