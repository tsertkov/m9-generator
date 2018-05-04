'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slugComponent = require('slug-component');

var _slugComponent2 = _interopRequireDefault(_slugComponent);

var _matterInterpolate = require('../matter-interpolate');

var _matterInterpolate2 = _interopRequireDefault(_matterInterpolate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = m9metaToFiles;


var META_KEY = 'meta_to_files';
var INDEX_FILE = 'index.html';

function m9metaToFiles() {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
      var fileMeta = files[file];
      var pluginMeta = fileMeta[META_KEY];
      if (!pluginMeta) return;

      var modelName = pluginMeta.model_name,
          filenamePattern = pluginMeta.filename_pattern;

      var _metalsmith$metadata = metalsmith.metadata(),
          entities = _metalsmith$metadata[modelName];

      entities.forEach(function (entity) {
        var newFileMeta = _extends({}, fileMeta);
        delete newFileMeta[META_KEY];

        var data = _extends({}, metalsmith.metadata(), _defineProperty({}, modelName, entity));

        // transfer plugin extra props to root scope in frontmatter
        Object.keys(pluginMeta).forEach(function (key) {
          if (['model_name', 'filename_pattern'].includes(key)) return;
          newFileMeta[key] = (0, _matterInterpolate2.default)(pluginMeta[key], data);
        });

        var filename = buildFilename(filenamePattern, data, file);
        files[filename] = newFileMeta;
      });

      // unpublish meta template file
      delete files[file];
    });

    done();
  };
}

function buildFilename(filenamePattern, data, tplFilename) {
  var filename = (0, _matterInterpolate2.default)(filenamePattern, data, _slugComponent2.default);

  if (isPermalink(filename)) {
    var extension = fileExtension(tplFilename, 1);
    filename += '/' + INDEX_FILE + '.' + extension;
  } else {
    var _extension = fileExtension(tplFilename, 2);
    filename += '.' + _extension;
  }

  return filename;
}

function isPermalink(filename) {
  return filename.substr(-1) === '/';
}

function fileExtension(filename, extensionsCount) {
  return filename.split('.', 3).splice(-1 * extensionsCount).join('.');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMuanMiXSwibmFtZXMiOlsibTltZXRhVG9GaWxlcyIsIk1FVEFfS0VZIiwiSU5ERVhfRklMRSIsImZpbGVzIiwibWV0YWxzbWl0aCIsImRvbmUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImZpbGVNZXRhIiwiZmlsZSIsInBsdWdpbk1ldGEiLCJtb2RlbE5hbWUiLCJtb2RlbF9uYW1lIiwiZmlsZW5hbWVQYXR0ZXJuIiwiZmlsZW5hbWVfcGF0dGVybiIsIm1ldGFkYXRhIiwiZW50aXRpZXMiLCJuZXdGaWxlTWV0YSIsImRhdGEiLCJlbnRpdHkiLCJpbmNsdWRlcyIsImtleSIsImZpbGVuYW1lIiwiYnVpbGRGaWxlbmFtZSIsInRwbEZpbGVuYW1lIiwic2x1ZyIsImlzUGVybWFsaW5rIiwiZXh0ZW5zaW9uIiwiZmlsZUV4dGVuc2lvbiIsInN1YnN0ciIsImV4dGVuc2lvbnNDb3VudCIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztrQkFDZUEsYTs7O0FBRWYsSUFBTUMsV0FBVyxlQUFqQjtBQUNBLElBQU1DLGFBQWEsWUFBbkI7O0FBRUEsU0FBU0YsYUFBVCxHQUEwQjtBQUN4QixTQUFPLFVBQUNHLEtBQUQsRUFBUUMsVUFBUixFQUFvQkMsSUFBcEIsRUFBNkI7QUFDbENDLFdBQU9DLElBQVAsQ0FBWUosS0FBWixFQUFtQkssT0FBbkIsQ0FBMkIsZ0JBQVE7QUFDakMsVUFBTUMsV0FBV04sTUFBTU8sSUFBTixDQUFqQjtBQUNBLFVBQU1DLGFBQWFGLFNBQVNSLFFBQVQsQ0FBbkI7QUFDQSxVQUFJLENBQUNVLFVBQUwsRUFBaUI7O0FBSGdCLFVBTW5CQyxTQU5tQixHQVE3QkQsVUFSNkIsQ0FNL0JFLFVBTitCO0FBQUEsVUFPYkMsZUFQYSxHQVE3QkgsVUFSNkIsQ0FPL0JJLGdCQVArQjs7QUFBQSxpQ0FZN0JYLFdBQVdZLFFBQVgsRUFaNkI7QUFBQSxVQVdsQkMsUUFYa0Isd0JBVzlCTCxTQVg4Qjs7QUFjakNLLGVBQVNULE9BQVQsQ0FBaUIsa0JBQVU7QUFDekIsWUFBSVUsMkJBQW1CVCxRQUFuQixDQUFKO0FBQ0EsZUFBT1MsWUFBWWpCLFFBQVosQ0FBUDs7QUFFQSxZQUFNa0Isb0JBQ0RmLFdBQVdZLFFBQVgsRUFEQyxzQkFFSEosU0FGRyxFQUVTUSxNQUZULEVBQU47O0FBS0E7QUFDQWQsZUFBT0MsSUFBUCxDQUFZSSxVQUFaLEVBQXdCSCxPQUF4QixDQUFnQyxlQUFPO0FBQ3JDLGNBQUksQ0FBQyxZQUFELEVBQWUsa0JBQWYsRUFBbUNhLFFBQW5DLENBQTRDQyxHQUE1QyxDQUFKLEVBQXNEO0FBQ3RESixzQkFBWUksR0FBWixJQUFtQixpQ0FBa0JYLFdBQVdXLEdBQVgsQ0FBbEIsRUFBbUNILElBQW5DLENBQW5CO0FBQ0QsU0FIRDs7QUFLQSxZQUFNSSxXQUFXQyxjQUFjVixlQUFkLEVBQStCSyxJQUEvQixFQUFxQ1QsSUFBckMsQ0FBakI7QUFDQVAsY0FBTW9CLFFBQU4sSUFBa0JMLFdBQWxCO0FBQ0QsT0FqQkQ7O0FBbUJBO0FBQ0EsYUFBT2YsTUFBTU8sSUFBTixDQUFQO0FBQ0QsS0FuQ0Q7O0FBcUNBTDtBQUNELEdBdkNEO0FBd0NEOztBQUVELFNBQVNtQixhQUFULENBQXdCVixlQUF4QixFQUF5Q0ssSUFBekMsRUFBK0NNLFdBQS9DLEVBQTREO0FBQzFELE1BQUlGLFdBQVcsaUNBQWtCVCxlQUFsQixFQUFtQ0ssSUFBbkMsRUFBeUNPLHVCQUF6QyxDQUFmOztBQUVBLE1BQUlDLFlBQVlKLFFBQVosQ0FBSixFQUEyQjtBQUN6QixRQUFNSyxZQUFZQyxjQUFjSixXQUFkLEVBQTJCLENBQTNCLENBQWxCO0FBQ0FGLHNCQUFnQnJCLFVBQWhCLFNBQThCMEIsU0FBOUI7QUFDRCxHQUhELE1BR087QUFDTCxRQUFNQSxhQUFZQyxjQUFjSixXQUFkLEVBQTJCLENBQTNCLENBQWxCO0FBQ0FGLHNCQUFnQkssVUFBaEI7QUFDRDs7QUFFRCxTQUFPTCxRQUFQO0FBQ0Q7O0FBRUQsU0FBU0ksV0FBVCxDQUFzQkosUUFBdEIsRUFBZ0M7QUFDOUIsU0FBT0EsU0FBU08sTUFBVCxDQUFnQixDQUFDLENBQWpCLE1BQXdCLEdBQS9CO0FBQ0Q7O0FBRUQsU0FBU0QsYUFBVCxDQUF3Qk4sUUFBeEIsRUFBa0NRLGVBQWxDLEVBQW1EO0FBQ2pELFNBQU9SLFNBQ0pTLEtBREksQ0FDRSxHQURGLEVBQ08sQ0FEUCxFQUVKQyxNQUZJLENBRUcsQ0FBQyxDQUFELEdBQUtGLGVBRlIsRUFHSkcsSUFISSxDQUdDLEdBSEQsQ0FBUDtBQUlEIiwiZmlsZSI6Im05LW1ldGEtdG8tZmlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2x1ZyBmcm9tICdzbHVnLWNvbXBvbmVudCdcbmltcG9ydCBtYXR0ZXJJbnRlcnBvbGF0ZSBmcm9tICcuLi9tYXR0ZXItaW50ZXJwb2xhdGUnXG5leHBvcnQgZGVmYXVsdCBtOW1ldGFUb0ZpbGVzXG5cbmNvbnN0IE1FVEFfS0VZID0gJ21ldGFfdG9fZmlsZXMnXG5jb25zdCBJTkRFWF9GSUxFID0gJ2luZGV4Lmh0bWwnXG5cbmZ1bmN0aW9uIG05bWV0YVRvRmlsZXMgKCkge1xuICByZXR1cm4gKGZpbGVzLCBtZXRhbHNtaXRoLCBkb25lKSA9PiB7XG4gICAgT2JqZWN0LmtleXMoZmlsZXMpLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBjb25zdCBmaWxlTWV0YSA9IGZpbGVzW2ZpbGVdXG4gICAgICBjb25zdCBwbHVnaW5NZXRhID0gZmlsZU1ldGFbTUVUQV9LRVldXG4gICAgICBpZiAoIXBsdWdpbk1ldGEpIHJldHVyblxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIG1vZGVsX25hbWU6IG1vZGVsTmFtZSxcbiAgICAgICAgZmlsZW5hbWVfcGF0dGVybjogZmlsZW5hbWVQYXR0ZXJuXG4gICAgICB9ID0gcGx1Z2luTWV0YVxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIFttb2RlbE5hbWVdOiBlbnRpdGllc1xuICAgICAgfSA9IG1ldGFsc21pdGgubWV0YWRhdGEoKVxuXG4gICAgICBlbnRpdGllcy5mb3JFYWNoKGVudGl0eSA9PiB7XG4gICAgICAgIGxldCBuZXdGaWxlTWV0YSA9IHsgLi4uZmlsZU1ldGEgfVxuICAgICAgICBkZWxldGUgbmV3RmlsZU1ldGFbTUVUQV9LRVldXG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAuLi5tZXRhbHNtaXRoLm1ldGFkYXRhKCksXG4gICAgICAgICAgW21vZGVsTmFtZV06IGVudGl0eVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJhbnNmZXIgcGx1Z2luIGV4dHJhIHByb3BzIHRvIHJvb3Qgc2NvcGUgaW4gZnJvbnRtYXR0ZXJcbiAgICAgICAgT2JqZWN0LmtleXMocGx1Z2luTWV0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChbJ21vZGVsX25hbWUnLCAnZmlsZW5hbWVfcGF0dGVybiddLmluY2x1ZGVzKGtleSkpIHJldHVyblxuICAgICAgICAgIG5ld0ZpbGVNZXRhW2tleV0gPSBtYXR0ZXJJbnRlcnBvbGF0ZShwbHVnaW5NZXRhW2tleV0sIGRhdGEpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBidWlsZEZpbGVuYW1lKGZpbGVuYW1lUGF0dGVybiwgZGF0YSwgZmlsZSlcbiAgICAgICAgZmlsZXNbZmlsZW5hbWVdID0gbmV3RmlsZU1ldGFcbiAgICAgIH0pXG5cbiAgICAgIC8vIHVucHVibGlzaCBtZXRhIHRlbXBsYXRlIGZpbGVcbiAgICAgIGRlbGV0ZSBmaWxlc1tmaWxlXVxuICAgIH0pXG5cbiAgICBkb25lKClcbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZEZpbGVuYW1lIChmaWxlbmFtZVBhdHRlcm4sIGRhdGEsIHRwbEZpbGVuYW1lKSB7XG4gIGxldCBmaWxlbmFtZSA9IG1hdHRlckludGVycG9sYXRlKGZpbGVuYW1lUGF0dGVybiwgZGF0YSwgc2x1ZylcblxuICBpZiAoaXNQZXJtYWxpbmsoZmlsZW5hbWUpKSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZmlsZUV4dGVuc2lvbih0cGxGaWxlbmFtZSwgMSlcbiAgICBmaWxlbmFtZSArPSBgLyR7SU5ERVhfRklMRX0uJHtleHRlbnNpb259YFxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGZpbGVFeHRlbnNpb24odHBsRmlsZW5hbWUsIDIpXG4gICAgZmlsZW5hbWUgKz0gYC4ke2V4dGVuc2lvbn1gXG4gIH1cblxuICByZXR1cm4gZmlsZW5hbWVcbn1cblxuZnVuY3Rpb24gaXNQZXJtYWxpbmsgKGZpbGVuYW1lKSB7XG4gIHJldHVybiBmaWxlbmFtZS5zdWJzdHIoLTEpID09PSAnLydcbn1cblxuZnVuY3Rpb24gZmlsZUV4dGVuc2lvbiAoZmlsZW5hbWUsIGV4dGVuc2lvbnNDb3VudCkge1xuICByZXR1cm4gZmlsZW5hbWVcbiAgICAuc3BsaXQoJy4nLCAzKVxuICAgIC5zcGxpY2UoLTEgKiBleHRlbnNpb25zQ291bnQpXG4gICAgLmpvaW4oJy4nKVxufVxuIl19