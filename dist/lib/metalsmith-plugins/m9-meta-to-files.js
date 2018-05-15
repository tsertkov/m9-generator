'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

var _matterInterpolate = require('../matter-interpolate');

var _matterInterpolate2 = _interopRequireDefault(_matterInterpolate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = m9metaToFiles;


var META_KEY = 'meta_to_files';
var INDEX_FILE = 'index.html';

function m9metaToFiles(_ref) {
  var _ref$slugOptions = _ref.slugOptions,
      slugOptions = _ref$slugOptions === undefined ? {} : _ref$slugOptions;


  var slug = void 0;
  if (typeof slugOptions === 'function') {
    slug = slugOptions;
  } else {
    slug = function slug(v) {
      return (0, _slug2.default)(v, slugOptions);
    };
  }

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

        var filename = buildFilename(filenamePattern, data, file, slug);
        files[filename] = newFileMeta;
      });

      // unpublish meta template file
      delete files[file];
    });

    done();
  };
}

function buildFilename(filenamePattern, data, tplFilename, slugFn) {
  var filename = (0, _matterInterpolate2.default)(filenamePattern, data, slugFn);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMuanMiXSwibmFtZXMiOlsibTltZXRhVG9GaWxlcyIsIk1FVEFfS0VZIiwiSU5ERVhfRklMRSIsInNsdWdPcHRpb25zIiwic2x1ZyIsInYiLCJmaWxlcyIsIm1ldGFsc21pdGgiLCJkb25lIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJmaWxlTWV0YSIsImZpbGUiLCJwbHVnaW5NZXRhIiwibW9kZWxOYW1lIiwibW9kZWxfbmFtZSIsImZpbGVuYW1lUGF0dGVybiIsImZpbGVuYW1lX3BhdHRlcm4iLCJtZXRhZGF0YSIsImVudGl0aWVzIiwibmV3RmlsZU1ldGEiLCJkYXRhIiwiZW50aXR5IiwiaW5jbHVkZXMiLCJrZXkiLCJmaWxlbmFtZSIsImJ1aWxkRmlsZW5hbWUiLCJ0cGxGaWxlbmFtZSIsInNsdWdGbiIsImlzUGVybWFsaW5rIiwiZXh0ZW5zaW9uIiwiZmlsZUV4dGVuc2lvbiIsInN1YnN0ciIsImV4dGVuc2lvbnNDb3VudCIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztrQkFDZUEsYTs7O0FBRWYsSUFBTUMsV0FBVyxlQUFqQjtBQUNBLElBQU1DLGFBQWEsWUFBbkI7O0FBRUEsU0FBU0YsYUFBVCxPQUE4QztBQUFBLDhCQUFwQkcsV0FBb0I7QUFBQSxNQUFwQkEsV0FBb0Isb0NBQU4sRUFBTTs7O0FBRTVDLE1BQUlDLGFBQUo7QUFDQSxNQUFJLE9BQU9ELFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckNDLFdBQU9ELFdBQVA7QUFDRCxHQUZELE1BRU87QUFDTEMsV0FBTyxTQUFTQSxJQUFULENBQWVDLENBQWYsRUFBa0I7QUFDdkIsYUFBTyxvQkFBU0EsQ0FBVCxFQUFZRixXQUFaLENBQVA7QUFDRCxLQUZEO0FBR0Q7O0FBRUQsU0FBTyxVQUFDRyxLQUFELEVBQVFDLFVBQVIsRUFBb0JDLElBQXBCLEVBQTZCO0FBQ2xDQyxXQUFPQyxJQUFQLENBQVlKLEtBQVosRUFBbUJLLE9BQW5CLENBQTJCLGdCQUFRO0FBQ2pDLFVBQU1DLFdBQVdOLE1BQU1PLElBQU4sQ0FBakI7QUFDQSxVQUFNQyxhQUFhRixTQUFTWCxRQUFULENBQW5CO0FBQ0EsVUFBSSxDQUFDYSxVQUFMLEVBQWlCOztBQUhnQixVQU1uQkMsU0FObUIsR0FRN0JELFVBUjZCLENBTS9CRSxVQU4rQjtBQUFBLFVBT2JDLGVBUGEsR0FRN0JILFVBUjZCLENBTy9CSSxnQkFQK0I7O0FBQUEsaUNBWTdCWCxXQUFXWSxRQUFYLEVBWjZCO0FBQUEsVUFXbEJDLFFBWGtCLHdCQVc5QkwsU0FYOEI7O0FBY2pDSyxlQUFTVCxPQUFULENBQWlCLGtCQUFVO0FBQ3pCLFlBQUlVLDJCQUFtQlQsUUFBbkIsQ0FBSjtBQUNBLGVBQU9TLFlBQVlwQixRQUFaLENBQVA7O0FBRUEsWUFBTXFCLG9CQUNEZixXQUFXWSxRQUFYLEVBREMsc0JBRUhKLFNBRkcsRUFFU1EsTUFGVCxFQUFOOztBQUtBO0FBQ0FkLGVBQU9DLElBQVAsQ0FBWUksVUFBWixFQUF3QkgsT0FBeEIsQ0FBZ0MsZUFBTztBQUNyQyxjQUFJLENBQUMsWUFBRCxFQUFlLGtCQUFmLEVBQW1DYSxRQUFuQyxDQUE0Q0MsR0FBNUMsQ0FBSixFQUFzRDtBQUN0REosc0JBQVlJLEdBQVosSUFBbUIsaUNBQWtCWCxXQUFXVyxHQUFYLENBQWxCLEVBQW1DSCxJQUFuQyxDQUFuQjtBQUNELFNBSEQ7O0FBS0EsWUFBTUksV0FBV0MsY0FBY1YsZUFBZCxFQUErQkssSUFBL0IsRUFBcUNULElBQXJDLEVBQTJDVCxJQUEzQyxDQUFqQjtBQUNBRSxjQUFNb0IsUUFBTixJQUFrQkwsV0FBbEI7QUFDRCxPQWpCRDs7QUFtQkE7QUFDQSxhQUFPZixNQUFNTyxJQUFOLENBQVA7QUFDRCxLQW5DRDs7QUFxQ0FMO0FBQ0QsR0F2Q0Q7QUF3Q0Q7O0FBRUQsU0FBU21CLGFBQVQsQ0FBd0JWLGVBQXhCLEVBQXlDSyxJQUF6QyxFQUErQ00sV0FBL0MsRUFBNERDLE1BQTVELEVBQW9FO0FBQ2xFLE1BQUlILFdBQVcsaUNBQWtCVCxlQUFsQixFQUFtQ0ssSUFBbkMsRUFBeUNPLE1BQXpDLENBQWY7O0FBRUEsTUFBSUMsWUFBWUosUUFBWixDQUFKLEVBQTJCO0FBQ3pCLFFBQU1LLFlBQVlDLGNBQWNKLFdBQWQsRUFBMkIsQ0FBM0IsQ0FBbEI7QUFDQUYsc0JBQWdCeEIsVUFBaEIsU0FBOEI2QixTQUE5QjtBQUNELEdBSEQsTUFHTztBQUNMLFFBQU1BLGFBQVlDLGNBQWNKLFdBQWQsRUFBMkIsQ0FBM0IsQ0FBbEI7QUFDQUYsc0JBQWdCSyxVQUFoQjtBQUNEOztBQUVELFNBQU9MLFFBQVA7QUFDRDs7QUFFRCxTQUFTSSxXQUFULENBQXNCSixRQUF0QixFQUFnQztBQUM5QixTQUFPQSxTQUFTTyxNQUFULENBQWdCLENBQUMsQ0FBakIsTUFBd0IsR0FBL0I7QUFDRDs7QUFFRCxTQUFTRCxhQUFULENBQXdCTixRQUF4QixFQUFrQ1EsZUFBbEMsRUFBbUQ7QUFDakQsU0FBT1IsU0FDSlMsS0FESSxDQUNFLEdBREYsRUFDTyxDQURQLEVBRUpDLE1BRkksQ0FFRyxDQUFDLENBQUQsR0FBS0YsZUFGUixFQUdKRyxJQUhJLENBR0MsR0FIRCxDQUFQO0FBSUQiLCJmaWxlIjoibTktbWV0YS10by1maWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2RvU2x1ZyBmcm9tICdzbHVnJ1xuaW1wb3J0IG1hdHRlckludGVycG9sYXRlIGZyb20gJy4uL21hdHRlci1pbnRlcnBvbGF0ZSdcbmV4cG9ydCBkZWZhdWx0IG05bWV0YVRvRmlsZXNcblxuY29uc3QgTUVUQV9LRVkgPSAnbWV0YV90b19maWxlcydcbmNvbnN0IElOREVYX0ZJTEUgPSAnaW5kZXguaHRtbCdcblxuZnVuY3Rpb24gbTltZXRhVG9GaWxlcyAoeyBzbHVnT3B0aW9ucyA9IHt9IH0pIHtcblxuICBsZXQgc2x1Z1xuICBpZiAodHlwZW9mIHNsdWdPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2x1ZyA9IHNsdWdPcHRpb25zXG4gIH0gZWxzZSB7XG4gICAgc2x1ZyA9IGZ1bmN0aW9uIHNsdWcgKHYpIHtcbiAgICAgIHJldHVybiBkb2RvU2x1Zyh2LCBzbHVnT3B0aW9ucylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGZpbGVzLCBtZXRhbHNtaXRoLCBkb25lKSA9PiB7XG4gICAgT2JqZWN0LmtleXMoZmlsZXMpLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBjb25zdCBmaWxlTWV0YSA9IGZpbGVzW2ZpbGVdXG4gICAgICBjb25zdCBwbHVnaW5NZXRhID0gZmlsZU1ldGFbTUVUQV9LRVldXG4gICAgICBpZiAoIXBsdWdpbk1ldGEpIHJldHVyblxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIG1vZGVsX25hbWU6IG1vZGVsTmFtZSxcbiAgICAgICAgZmlsZW5hbWVfcGF0dGVybjogZmlsZW5hbWVQYXR0ZXJuXG4gICAgICB9ID0gcGx1Z2luTWV0YVxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIFttb2RlbE5hbWVdOiBlbnRpdGllc1xuICAgICAgfSA9IG1ldGFsc21pdGgubWV0YWRhdGEoKVxuXG4gICAgICBlbnRpdGllcy5mb3JFYWNoKGVudGl0eSA9PiB7XG4gICAgICAgIGxldCBuZXdGaWxlTWV0YSA9IHsgLi4uZmlsZU1ldGEgfVxuICAgICAgICBkZWxldGUgbmV3RmlsZU1ldGFbTUVUQV9LRVldXG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAuLi5tZXRhbHNtaXRoLm1ldGFkYXRhKCksXG4gICAgICAgICAgW21vZGVsTmFtZV06IGVudGl0eVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJhbnNmZXIgcGx1Z2luIGV4dHJhIHByb3BzIHRvIHJvb3Qgc2NvcGUgaW4gZnJvbnRtYXR0ZXJcbiAgICAgICAgT2JqZWN0LmtleXMocGx1Z2luTWV0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChbJ21vZGVsX25hbWUnLCAnZmlsZW5hbWVfcGF0dGVybiddLmluY2x1ZGVzKGtleSkpIHJldHVyblxuICAgICAgICAgIG5ld0ZpbGVNZXRhW2tleV0gPSBtYXR0ZXJJbnRlcnBvbGF0ZShwbHVnaW5NZXRhW2tleV0sIGRhdGEpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBidWlsZEZpbGVuYW1lKGZpbGVuYW1lUGF0dGVybiwgZGF0YSwgZmlsZSwgc2x1ZylcbiAgICAgICAgZmlsZXNbZmlsZW5hbWVdID0gbmV3RmlsZU1ldGFcbiAgICAgIH0pXG5cbiAgICAgIC8vIHVucHVibGlzaCBtZXRhIHRlbXBsYXRlIGZpbGVcbiAgICAgIGRlbGV0ZSBmaWxlc1tmaWxlXVxuICAgIH0pXG5cbiAgICBkb25lKClcbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZEZpbGVuYW1lIChmaWxlbmFtZVBhdHRlcm4sIGRhdGEsIHRwbEZpbGVuYW1lLCBzbHVnRm4pIHtcbiAgbGV0IGZpbGVuYW1lID0gbWF0dGVySW50ZXJwb2xhdGUoZmlsZW5hbWVQYXR0ZXJuLCBkYXRhLCBzbHVnRm4pXG5cbiAgaWYgKGlzUGVybWFsaW5rKGZpbGVuYW1lKSkge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGZpbGVFeHRlbnNpb24odHBsRmlsZW5hbWUsIDEpXG4gICAgZmlsZW5hbWUgKz0gYC8ke0lOREVYX0ZJTEV9LiR7ZXh0ZW5zaW9ufWBcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBmaWxlRXh0ZW5zaW9uKHRwbEZpbGVuYW1lLCAyKVxuICAgIGZpbGVuYW1lICs9IGAuJHtleHRlbnNpb259YFxuICB9XG5cbiAgcmV0dXJuIGZpbGVuYW1lXG59XG5cbmZ1bmN0aW9uIGlzUGVybWFsaW5rIChmaWxlbmFtZSkge1xuICByZXR1cm4gZmlsZW5hbWUuc3Vic3RyKC0xKSA9PT0gJy8nXG59XG5cbmZ1bmN0aW9uIGZpbGVFeHRlbnNpb24gKGZpbGVuYW1lLCBleHRlbnNpb25zQ291bnQpIHtcbiAgcmV0dXJuIGZpbGVuYW1lXG4gICAgLnNwbGl0KCcuJywgMylcbiAgICAuc3BsaWNlKC0xICogZXh0ZW5zaW9uc0NvdW50KVxuICAgIC5qb2luKCcuJylcbn1cbiJdfQ==