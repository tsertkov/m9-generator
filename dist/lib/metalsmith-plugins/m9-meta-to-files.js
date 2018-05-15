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
  var slug = _ref.slug;


  var slugFn = void 0;
  if (typeof slug === 'function') {
    slugFn = slug;
  } else if (slug) {
    slugFn = function slugFn(v) {
      return (0, _slug2.default)(v, slug);
    };
  } else {
    slugFn = _slug2.default;
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

        var filename = buildFilename(filenamePattern, data, file, slugFn);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMuanMiXSwibmFtZXMiOlsibTltZXRhVG9GaWxlcyIsIk1FVEFfS0VZIiwiSU5ERVhfRklMRSIsInNsdWciLCJzbHVnRm4iLCJ2IiwiZG9kb1NsdWciLCJmaWxlcyIsIm1ldGFsc21pdGgiLCJkb25lIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJmaWxlTWV0YSIsImZpbGUiLCJwbHVnaW5NZXRhIiwibW9kZWxOYW1lIiwibW9kZWxfbmFtZSIsImZpbGVuYW1lUGF0dGVybiIsImZpbGVuYW1lX3BhdHRlcm4iLCJtZXRhZGF0YSIsImVudGl0aWVzIiwibmV3RmlsZU1ldGEiLCJkYXRhIiwiZW50aXR5IiwiaW5jbHVkZXMiLCJrZXkiLCJmaWxlbmFtZSIsImJ1aWxkRmlsZW5hbWUiLCJ0cGxGaWxlbmFtZSIsImlzUGVybWFsaW5rIiwiZXh0ZW5zaW9uIiwiZmlsZUV4dGVuc2lvbiIsInN1YnN0ciIsImV4dGVuc2lvbnNDb3VudCIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztrQkFDZUEsYTs7O0FBRWYsSUFBTUMsV0FBVyxlQUFqQjtBQUNBLElBQU1DLGFBQWEsWUFBbkI7O0FBRUEsU0FBU0YsYUFBVCxPQUFrQztBQUFBLE1BQVJHLElBQVEsUUFBUkEsSUFBUTs7O0FBRWhDLE1BQUlDLGVBQUo7QUFDQSxNQUFJLE9BQU9ELElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDOUJDLGFBQVNELElBQVQ7QUFDRCxHQUZELE1BRU8sSUFBSUEsSUFBSixFQUFVO0FBQ2ZDLGFBQVMsU0FBU0EsTUFBVCxDQUFpQkMsQ0FBakIsRUFBb0I7QUFDM0IsYUFBTyxvQkFBU0EsQ0FBVCxFQUFZRixJQUFaLENBQVA7QUFDRCxLQUZEO0FBR0QsR0FKTSxNQUlBO0FBQ0xDLGFBQVNFLGNBQVQ7QUFDRDs7QUFFRCxTQUFPLFVBQUNDLEtBQUQsRUFBUUMsVUFBUixFQUFvQkMsSUFBcEIsRUFBNkI7QUFDbENDLFdBQU9DLElBQVAsQ0FBWUosS0FBWixFQUFtQkssT0FBbkIsQ0FBMkIsZ0JBQVE7QUFDakMsVUFBTUMsV0FBV04sTUFBTU8sSUFBTixDQUFqQjtBQUNBLFVBQU1DLGFBQWFGLFNBQVNaLFFBQVQsQ0FBbkI7QUFDQSxVQUFJLENBQUNjLFVBQUwsRUFBaUI7O0FBSGdCLFVBTW5CQyxTQU5tQixHQVE3QkQsVUFSNkIsQ0FNL0JFLFVBTitCO0FBQUEsVUFPYkMsZUFQYSxHQVE3QkgsVUFSNkIsQ0FPL0JJLGdCQVArQjs7QUFBQSxpQ0FZN0JYLFdBQVdZLFFBQVgsRUFaNkI7QUFBQSxVQVdsQkMsUUFYa0Isd0JBVzlCTCxTQVg4Qjs7QUFjakNLLGVBQVNULE9BQVQsQ0FBaUIsa0JBQVU7QUFDekIsWUFBSVUsMkJBQW1CVCxRQUFuQixDQUFKO0FBQ0EsZUFBT1MsWUFBWXJCLFFBQVosQ0FBUDs7QUFFQSxZQUFNc0Isb0JBQ0RmLFdBQVdZLFFBQVgsRUFEQyxzQkFFSEosU0FGRyxFQUVTUSxNQUZULEVBQU47O0FBS0E7QUFDQWQsZUFBT0MsSUFBUCxDQUFZSSxVQUFaLEVBQXdCSCxPQUF4QixDQUFnQyxlQUFPO0FBQ3JDLGNBQUksQ0FBQyxZQUFELEVBQWUsa0JBQWYsRUFBbUNhLFFBQW5DLENBQTRDQyxHQUE1QyxDQUFKLEVBQXNEO0FBQ3RESixzQkFBWUksR0FBWixJQUFtQixpQ0FBa0JYLFdBQVdXLEdBQVgsQ0FBbEIsRUFBbUNILElBQW5DLENBQW5CO0FBQ0QsU0FIRDs7QUFLQSxZQUFNSSxXQUFXQyxjQUFjVixlQUFkLEVBQStCSyxJQUEvQixFQUFxQ1QsSUFBckMsRUFBMkNWLE1BQTNDLENBQWpCO0FBQ0FHLGNBQU1vQixRQUFOLElBQWtCTCxXQUFsQjtBQUNELE9BakJEOztBQW1CQTtBQUNBLGFBQU9mLE1BQU1PLElBQU4sQ0FBUDtBQUNELEtBbkNEOztBQXFDQUw7QUFDRCxHQXZDRDtBQXdDRDs7QUFFRCxTQUFTbUIsYUFBVCxDQUF3QlYsZUFBeEIsRUFBeUNLLElBQXpDLEVBQStDTSxXQUEvQyxFQUE0RHpCLE1BQTVELEVBQW9FO0FBQ2xFLE1BQUl1QixXQUFXLGlDQUFrQlQsZUFBbEIsRUFBbUNLLElBQW5DLEVBQXlDbkIsTUFBekMsQ0FBZjs7QUFFQSxNQUFJMEIsWUFBWUgsUUFBWixDQUFKLEVBQTJCO0FBQ3pCLFFBQU1JLFlBQVlDLGNBQWNILFdBQWQsRUFBMkIsQ0FBM0IsQ0FBbEI7QUFDQUYsc0JBQWdCekIsVUFBaEIsU0FBOEI2QixTQUE5QjtBQUNELEdBSEQsTUFHTztBQUNMLFFBQU1BLGFBQVlDLGNBQWNILFdBQWQsRUFBMkIsQ0FBM0IsQ0FBbEI7QUFDQUYsc0JBQWdCSSxVQUFoQjtBQUNEOztBQUVELFNBQU9KLFFBQVA7QUFDRDs7QUFFRCxTQUFTRyxXQUFULENBQXNCSCxRQUF0QixFQUFnQztBQUM5QixTQUFPQSxTQUFTTSxNQUFULENBQWdCLENBQUMsQ0FBakIsTUFBd0IsR0FBL0I7QUFDRDs7QUFFRCxTQUFTRCxhQUFULENBQXdCTCxRQUF4QixFQUFrQ08sZUFBbEMsRUFBbUQ7QUFDakQsU0FBT1AsU0FDSlEsS0FESSxDQUNFLEdBREYsRUFDTyxDQURQLEVBRUpDLE1BRkksQ0FFRyxDQUFDLENBQUQsR0FBS0YsZUFGUixFQUdKRyxJQUhJLENBR0MsR0FIRCxDQUFQO0FBSUQiLCJmaWxlIjoibTktbWV0YS10by1maWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2RvU2x1ZyBmcm9tICdzbHVnJ1xuaW1wb3J0IG1hdHRlckludGVycG9sYXRlIGZyb20gJy4uL21hdHRlci1pbnRlcnBvbGF0ZSdcbmV4cG9ydCBkZWZhdWx0IG05bWV0YVRvRmlsZXNcblxuY29uc3QgTUVUQV9LRVkgPSAnbWV0YV90b19maWxlcydcbmNvbnN0IElOREVYX0ZJTEUgPSAnaW5kZXguaHRtbCdcblxuZnVuY3Rpb24gbTltZXRhVG9GaWxlcyAoeyBzbHVnIH0pIHtcblxuICBsZXQgc2x1Z0ZuXG4gIGlmICh0eXBlb2Ygc2x1ZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHNsdWdGbiA9IHNsdWdcbiAgfSBlbHNlIGlmIChzbHVnKSB7XG4gICAgc2x1Z0ZuID0gZnVuY3Rpb24gc2x1Z0ZuICh2KSB7XG4gICAgICByZXR1cm4gZG9kb1NsdWcodiwgc2x1ZylcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2x1Z0ZuID0gZG9kb1NsdWdcbiAgfVxuXG4gIHJldHVybiAoZmlsZXMsIG1ldGFsc21pdGgsIGRvbmUpID0+IHtcbiAgICBPYmplY3Qua2V5cyhmaWxlcykuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGNvbnN0IGZpbGVNZXRhID0gZmlsZXNbZmlsZV1cbiAgICAgIGNvbnN0IHBsdWdpbk1ldGEgPSBmaWxlTWV0YVtNRVRBX0tFWV1cbiAgICAgIGlmICghcGx1Z2luTWV0YSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbW9kZWxfbmFtZTogbW9kZWxOYW1lLFxuICAgICAgICBmaWxlbmFtZV9wYXR0ZXJuOiBmaWxlbmFtZVBhdHRlcm5cbiAgICAgIH0gPSBwbHVnaW5NZXRhXG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgW21vZGVsTmFtZV06IGVudGl0aWVzXG4gICAgICB9ID0gbWV0YWxzbWl0aC5tZXRhZGF0YSgpXG5cbiAgICAgIGVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IHtcbiAgICAgICAgbGV0IG5ld0ZpbGVNZXRhID0geyAuLi5maWxlTWV0YSB9XG4gICAgICAgIGRlbGV0ZSBuZXdGaWxlTWV0YVtNRVRBX0tFWV1cblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgIC4uLm1ldGFsc21pdGgubWV0YWRhdGEoKSxcbiAgICAgICAgICBbbW9kZWxOYW1lXTogZW50aXR5XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmFuc2ZlciBwbHVnaW4gZXh0cmEgcHJvcHMgdG8gcm9vdCBzY29wZSBpbiBmcm9udG1hdHRlclxuICAgICAgICBPYmplY3Qua2V5cyhwbHVnaW5NZXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKFsnbW9kZWxfbmFtZScsICdmaWxlbmFtZV9wYXR0ZXJuJ10uaW5jbHVkZXMoa2V5KSkgcmV0dXJuXG4gICAgICAgICAgbmV3RmlsZU1ldGFba2V5XSA9IG1hdHRlckludGVycG9sYXRlKHBsdWdpbk1ldGFba2V5XSwgZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGJ1aWxkRmlsZW5hbWUoZmlsZW5hbWVQYXR0ZXJuLCBkYXRhLCBmaWxlLCBzbHVnRm4pXG4gICAgICAgIGZpbGVzW2ZpbGVuYW1lXSA9IG5ld0ZpbGVNZXRhXG4gICAgICB9KVxuXG4gICAgICAvLyB1bnB1Ymxpc2ggbWV0YSB0ZW1wbGF0ZSBmaWxlXG4gICAgICBkZWxldGUgZmlsZXNbZmlsZV1cbiAgICB9KVxuXG4gICAgZG9uZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gYnVpbGRGaWxlbmFtZSAoZmlsZW5hbWVQYXR0ZXJuLCBkYXRhLCB0cGxGaWxlbmFtZSwgc2x1Z0ZuKSB7XG4gIGxldCBmaWxlbmFtZSA9IG1hdHRlckludGVycG9sYXRlKGZpbGVuYW1lUGF0dGVybiwgZGF0YSwgc2x1Z0ZuKVxuXG4gIGlmIChpc1Blcm1hbGluayhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBmaWxlRXh0ZW5zaW9uKHRwbEZpbGVuYW1lLCAxKVxuICAgIGZpbGVuYW1lICs9IGAvJHtJTkRFWF9GSUxFfS4ke2V4dGVuc2lvbn1gXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZmlsZUV4dGVuc2lvbih0cGxGaWxlbmFtZSwgMilcbiAgICBmaWxlbmFtZSArPSBgLiR7ZXh0ZW5zaW9ufWBcbiAgfVxuXG4gIHJldHVybiBmaWxlbmFtZVxufVxuXG5mdW5jdGlvbiBpc1Blcm1hbGluayAoZmlsZW5hbWUpIHtcbiAgcmV0dXJuIGZpbGVuYW1lLnN1YnN0cigtMSkgPT09ICcvJ1xufVxuXG5mdW5jdGlvbiBmaWxlRXh0ZW5zaW9uIChmaWxlbmFtZSwgZXh0ZW5zaW9uc0NvdW50KSB7XG4gIHJldHVybiBmaWxlbmFtZVxuICAgIC5zcGxpdCgnLicsIDMpXG4gICAgLnNwbGljZSgtMSAqIGV4dGVuc2lvbnNDb3VudClcbiAgICAuam9pbignLicpXG59XG4iXX0=