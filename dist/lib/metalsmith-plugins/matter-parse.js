"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _toml = _interopRequireDefault(require("toml"));

var _matterInterpolate = _interopRequireDefault(require("../matter-interpolate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DELIMITER = '---';
const EOLS = ['\n', '\r\n'];

function _default() {
  return function matterParse(files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    Object.keys(files).forEach(fileName => {
      const file = files[fileName];
      const {
        frontmatter,
        body
      } = frontMatterExtract(file.contents, DELIMITER);
      file.contents = body;
      if (!frontmatter) return;
      const parsedFrontmatter = parseTomlFrontmatter(frontmatter, metadata);
      Object.assign(file, parsedFrontmatter);
    });
    done();
  };
}

function parseTomlFrontmatter(buffer, metadata) {
  const parsed = _toml.default.parse(buffer);

  return Object.keys(parsed).reduce((acc, propName) => {
    const propValue = parsed[propName];
    acc[propName] = typeof propValue === 'string' ? (0, _matterInterpolate.default)(propValue, metadata) : propValue;
    return acc;
  }, {});
}

function findStartDelimiter(buffer, delimiter) {
  const delimiterLength = delimiter.length;
  const longestDelimiterLength = delimiterLength + 2;
  const beginning = buffer.slice(0, longestDelimiterLength).toString();

  for (const eol of EOLS) {
    if (beginning.startsWith(delimiter + eol)) {
      return [0, delimiterLength + eol.length];
    }
  }

  return [-1, -1];
}

function findEndDelimiter(buffer, delimiter, startDelimiterEnd) {
  const delimiterLength = delimiter.length;
  let searchStart = startDelimiterEnd;

  while (true) {
    let endDelimiterStart = buffer.indexOf('\n' + delimiter, searchStart);
    if (endDelimiterStart === -1) return [-1, -1]; // compensate newline before delimiter

    endDelimiterStart += 1; // check if this is the end of buffer

    if (typeof buffer[endDelimiterStart + delimiterLength + 1] === 'undefined') {
      return [endDelimiterStart, endDelimiterStart + delimiterLength];
    }

    for (const eol of EOLS) {
      const start = endDelimiterStart + delimiterLength;
      const end = start + eol.length;

      if (buffer.slice(start, end).toString() === eol) {
        return [endDelimiterStart, end];
      }
    }

    searchStart = endDelimiterStart + delimiterLength;
  }
}

function frontMatterExtract(buffer, delimiter) {
  const extracted = {
    body: buffer
  };
  const [, startDelimiterEnd] = findStartDelimiter(buffer, delimiter);
  if (startDelimiterEnd === -1) return extracted;
  const [endDelimiterStart, endDelimiterEnd] = findEndDelimiter(buffer, delimiter, startDelimiterEnd);
  if (endDelimiterStart === -1) return extracted;
  const frontmatter = buffer.slice(startDelimiterEnd, endDelimiterStart);
  const body = buffer.slice(endDelimiterEnd);
  return {
    frontmatter,
    body
  };
}