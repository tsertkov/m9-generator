'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dst = _config2.default.paths.dst;


_gulp2.default.task('build-clean', function () {
  return (0, _del2.default)([dst], { force: true });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9idWlsZC1jbGVhbi5qcyJdLCJuYW1lcyI6WyJkc3QiLCJwYXRocyIsInRhc2siLCJmb3JjZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVRQSxHLEdBQVEsaUJBQU9DLEssQ0FBZkQsRzs7O0FBRVIsZUFBS0UsSUFBTCxDQUFVLGFBQVYsRUFBeUI7QUFBQSxTQUN2QixtQkFBSSxDQUFDRixHQUFELENBQUosRUFBVyxFQUFFRyxPQUFPLElBQVQsRUFBWCxDQUR1QjtBQUFBLENBQXpCIiwiZmlsZSI6ImJ1aWxkLWNsZWFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGd1bHAgZnJvbSAnZ3VscCdcbmltcG9ydCBkZWwgZnJvbSAnZGVsJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IHsgZHN0IH0gPSBjb25maWcucGF0aHNcblxuZ3VscC50YXNrKCdidWlsZC1jbGVhbicsICgpID0+IChcbiAgZGVsKFtkc3RdLCB7IGZvcmNlOiB0cnVlIH0pXG4pKVxuIl19