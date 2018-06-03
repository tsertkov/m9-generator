'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _pluginError = require('plugin-error');

var _pluginError2 = _interopRequireDefault(_pluginError);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('build-webpack', callback => {
  if (!Object.keys(_config2.default.webpack.entry).length) {
    _fancyLog2.default.warn(['webpack] nothing to compile yet...']);
    callback();
    return;
  }

  (0, _webpack2.default)(_config2.default.webpack, (err, stats) => {
    if (err) throw new _pluginError2.default('webpack', err);
    _fancyLog2.default.info('[webpack]', '\n' + stats.toString());
    callback();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC13ZWJwYWNrLmpzIl0sIm5hbWVzIjpbImd1bHAiLCJ0YXNrIiwiY2FsbGJhY2siLCJPYmplY3QiLCJrZXlzIiwiY29uZmlnIiwid2VicGFjayIsImVudHJ5IiwibGVuZ3RoIiwibG9nIiwid2FybiIsImVyciIsInN0YXRzIiwiUGx1Z2luRXJyb3IiLCJpbmZvIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLGVBQUtDLElBQUwsQ0FBVSxlQUFWLEVBQTRCQyxRQUFELElBQWM7QUFDdkMsTUFBSSxDQUFDQyxPQUFPQyxJQUFQLENBQVlDLGlCQUFPQyxPQUFQLENBQWVDLEtBQTNCLEVBQWtDQyxNQUF2QyxFQUErQztBQUM3Q0MsdUJBQUlDLElBQUosQ0FBUyxDQUFDLG9DQUFELENBQVQ7QUFDQVI7QUFDQTtBQUNEOztBQUVELHlCQUFRRyxpQkFBT0MsT0FBZixFQUF3QixDQUFDSyxHQUFELEVBQU1DLEtBQU4sS0FBZ0I7QUFDdEMsUUFBSUQsR0FBSixFQUFTLE1BQU0sSUFBSUUscUJBQUosQ0FBZ0IsU0FBaEIsRUFBMkJGLEdBQTNCLENBQU47QUFDVEYsdUJBQUlLLElBQUosQ0FBUyxXQUFULEVBQXNCLE9BQU9GLE1BQU1HLFFBQU4sRUFBN0I7QUFDQWI7QUFDRCxHQUpEO0FBS0QsQ0FaRCIsImZpbGUiOiJidWlsZC13ZWJwYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBsb2cgZnJvbSAnZmFuY3ktbG9nJ1xuaW1wb3J0IFBsdWdpbkVycm9yIGZyb20gJ3BsdWdpbi1lcnJvcidcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcblxuZ3VscC50YXNrKCdidWlsZC13ZWJwYWNrJywgKGNhbGxiYWNrKSA9PiB7XG4gIGlmICghT2JqZWN0LmtleXMoY29uZmlnLndlYnBhY2suZW50cnkpLmxlbmd0aCkge1xuICAgIGxvZy53YXJuKFsnd2VicGFja10gbm90aGluZyB0byBjb21waWxlIHlldC4uLiddKVxuICAgIGNhbGxiYWNrKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHdlYnBhY2soY29uZmlnLndlYnBhY2ssIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgaWYgKGVycikgdGhyb3cgbmV3IFBsdWdpbkVycm9yKCd3ZWJwYWNrJywgZXJyKVxuICAgIGxvZy5pbmZvKCdbd2VicGFja10nLCAnXFxuJyArIHN0YXRzLnRvU3RyaW5nKCkpXG4gICAgY2FsbGJhY2soKVxuICB9KVxufSlcbiJdfQ==