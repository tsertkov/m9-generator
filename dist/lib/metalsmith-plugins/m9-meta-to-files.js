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

exports.default = m9metaToFiles;


const META_KEY = 'meta_to_files';
const INDEX_FILE = 'index.html';

function m9metaToFiles({ slug }) {

  let slugFn;
  if (typeof slug === 'function') {
    slugFn = slug;
  } else if (slug) {
    slugFn = function slugFn(v) {
      return (0, _slug2.default)(v, slug);
    };
  } else {
    slugFn = _slug2.default;
  }

  return (files, metalsmith, done) => {
    Object.keys(files).forEach(file => {
      const fileMeta = files[file];
      const pluginMeta = fileMeta[META_KEY];
      if (!pluginMeta) return;

      const {
        model_name: modelName,
        filename_pattern: filenamePattern
      } = pluginMeta;

      const {
        [modelName]: entities
      } = metalsmith.metadata();

      entities.forEach(entity => {
        let newFileMeta = _extends({}, fileMeta);
        delete newFileMeta[META_KEY];

        const data = _extends({}, metalsmith.metadata(), {
          [modelName]: entity

          // transfer plugin extra props to root scope in frontmatter
        });Object.keys(pluginMeta).forEach(key => {
          if (['model_name', 'filename_pattern'].includes(key)) return;
          newFileMeta[key] = (0, _matterInterpolate2.default)(pluginMeta[key], data);
        });

        const filename = buildFilename(filenamePattern, data, file, slugFn);
        files[filename] = newFileMeta;
      });

      // unpublish meta template file
      delete files[file];
    });

    done();
  };
}

function buildFilename(filenamePattern, data, tplFilename, slugFn) {
  let filename = (0, _matterInterpolate2.default)(filenamePattern, data, slugFn);

  if (isPermalink(filename)) {
    const extension = fileExtension(tplFilename, 1);
    filename += `/${INDEX_FILE}.${extension}`;
  } else {
    const extension = fileExtension(tplFilename, 2);
    filename += `.${extension}`;
  }

  return filename;
}

function isPermalink(filename) {
  return filename.substr(-1) === '/';
}

function fileExtension(filename, extensionsCount) {
  return filename.split('.', 3).splice(-1 * extensionsCount).join('.');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMuanMiXSwibmFtZXMiOlsibTltZXRhVG9GaWxlcyIsIk1FVEFfS0VZIiwiSU5ERVhfRklMRSIsInNsdWciLCJzbHVnRm4iLCJ2IiwiZG9kb1NsdWciLCJmaWxlcyIsIm1ldGFsc21pdGgiLCJkb25lIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJmaWxlIiwiZmlsZU1ldGEiLCJwbHVnaW5NZXRhIiwibW9kZWxfbmFtZSIsIm1vZGVsTmFtZSIsImZpbGVuYW1lX3BhdHRlcm4iLCJmaWxlbmFtZVBhdHRlcm4iLCJlbnRpdGllcyIsIm1ldGFkYXRhIiwiZW50aXR5IiwibmV3RmlsZU1ldGEiLCJkYXRhIiwia2V5IiwiaW5jbHVkZXMiLCJmaWxlbmFtZSIsImJ1aWxkRmlsZW5hbWUiLCJ0cGxGaWxlbmFtZSIsImlzUGVybWFsaW5rIiwiZXh0ZW5zaW9uIiwiZmlsZUV4dGVuc2lvbiIsInN1YnN0ciIsImV4dGVuc2lvbnNDb3VudCIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7a0JBQ2VBLGE7OztBQUVmLE1BQU1DLFdBQVcsZUFBakI7QUFDQSxNQUFNQyxhQUFhLFlBQW5COztBQUVBLFNBQVNGLGFBQVQsQ0FBd0IsRUFBRUcsSUFBRixFQUF4QixFQUFrQzs7QUFFaEMsTUFBSUMsTUFBSjtBQUNBLE1BQUksT0FBT0QsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QkMsYUFBU0QsSUFBVDtBQUNELEdBRkQsTUFFTyxJQUFJQSxJQUFKLEVBQVU7QUFDZkMsYUFBUyxTQUFTQSxNQUFULENBQWlCQyxDQUFqQixFQUFvQjtBQUMzQixhQUFPLG9CQUFTQSxDQUFULEVBQVlGLElBQVosQ0FBUDtBQUNELEtBRkQ7QUFHRCxHQUpNLE1BSUE7QUFDTEMsYUFBU0UsY0FBVDtBQUNEOztBQUVELFNBQU8sQ0FBQ0MsS0FBRCxFQUFRQyxVQUFSLEVBQW9CQyxJQUFwQixLQUE2QjtBQUNsQ0MsV0FBT0MsSUFBUCxDQUFZSixLQUFaLEVBQW1CSyxPQUFuQixDQUEyQkMsUUFBUTtBQUNqQyxZQUFNQyxXQUFXUCxNQUFNTSxJQUFOLENBQWpCO0FBQ0EsWUFBTUUsYUFBYUQsU0FBU2IsUUFBVCxDQUFuQjtBQUNBLFVBQUksQ0FBQ2MsVUFBTCxFQUFpQjs7QUFFakIsWUFBTTtBQUNKQyxvQkFBWUMsU0FEUjtBQUVKQywwQkFBa0JDO0FBRmQsVUFHRkosVUFISjs7QUFLQSxZQUFNO0FBQ0osU0FBQ0UsU0FBRCxHQUFhRztBQURULFVBRUZaLFdBQVdhLFFBQVgsRUFGSjs7QUFJQUQsZUFBU1IsT0FBVCxDQUFpQlUsVUFBVTtBQUN6QixZQUFJQywyQkFBbUJULFFBQW5CLENBQUo7QUFDQSxlQUFPUyxZQUFZdEIsUUFBWixDQUFQOztBQUVBLGNBQU11QixvQkFDRGhCLFdBQVdhLFFBQVgsRUFEQztBQUVKLFdBQUNKLFNBQUQsR0FBYUs7O0FBR2Y7QUFMTSxVQUFOLENBTUFaLE9BQU9DLElBQVAsQ0FBWUksVUFBWixFQUF3QkgsT0FBeEIsQ0FBZ0NhLE9BQU87QUFDckMsY0FBSSxDQUFDLFlBQUQsRUFBZSxrQkFBZixFQUFtQ0MsUUFBbkMsQ0FBNENELEdBQTVDLENBQUosRUFBc0Q7QUFDdERGLHNCQUFZRSxHQUFaLElBQW1CLGlDQUFrQlYsV0FBV1UsR0FBWCxDQUFsQixFQUFtQ0QsSUFBbkMsQ0FBbkI7QUFDRCxTQUhEOztBQUtBLGNBQU1HLFdBQVdDLGNBQWNULGVBQWQsRUFBK0JLLElBQS9CLEVBQXFDWCxJQUFyQyxFQUEyQ1QsTUFBM0MsQ0FBakI7QUFDQUcsY0FBTW9CLFFBQU4sSUFBa0JKLFdBQWxCO0FBQ0QsT0FqQkQ7O0FBbUJBO0FBQ0EsYUFBT2hCLE1BQU1NLElBQU4sQ0FBUDtBQUNELEtBbkNEOztBQXFDQUo7QUFDRCxHQXZDRDtBQXdDRDs7QUFFRCxTQUFTbUIsYUFBVCxDQUF3QlQsZUFBeEIsRUFBeUNLLElBQXpDLEVBQStDSyxXQUEvQyxFQUE0RHpCLE1BQTVELEVBQW9FO0FBQ2xFLE1BQUl1QixXQUFXLGlDQUFrQlIsZUFBbEIsRUFBbUNLLElBQW5DLEVBQXlDcEIsTUFBekMsQ0FBZjs7QUFFQSxNQUFJMEIsWUFBWUgsUUFBWixDQUFKLEVBQTJCO0FBQ3pCLFVBQU1JLFlBQVlDLGNBQWNILFdBQWQsRUFBMkIsQ0FBM0IsQ0FBbEI7QUFDQUYsZ0JBQWEsSUFBR3pCLFVBQVcsSUFBRzZCLFNBQVUsRUFBeEM7QUFDRCxHQUhELE1BR087QUFDTCxVQUFNQSxZQUFZQyxjQUFjSCxXQUFkLEVBQTJCLENBQTNCLENBQWxCO0FBQ0FGLGdCQUFhLElBQUdJLFNBQVUsRUFBMUI7QUFDRDs7QUFFRCxTQUFPSixRQUFQO0FBQ0Q7O0FBRUQsU0FBU0csV0FBVCxDQUFzQkgsUUFBdEIsRUFBZ0M7QUFDOUIsU0FBT0EsU0FBU00sTUFBVCxDQUFnQixDQUFDLENBQWpCLE1BQXdCLEdBQS9CO0FBQ0Q7O0FBRUQsU0FBU0QsYUFBVCxDQUF3QkwsUUFBeEIsRUFBa0NPLGVBQWxDLEVBQW1EO0FBQ2pELFNBQU9QLFNBQ0pRLEtBREksQ0FDRSxHQURGLEVBQ08sQ0FEUCxFQUVKQyxNQUZJLENBRUcsQ0FBQyxDQUFELEdBQUtGLGVBRlIsRUFHSkcsSUFISSxDQUdDLEdBSEQsQ0FBUDtBQUlEIiwiZmlsZSI6Im05LW1ldGEtdG8tZmlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9kb1NsdWcgZnJvbSAnc2x1ZydcbmltcG9ydCBtYXR0ZXJJbnRlcnBvbGF0ZSBmcm9tICcuLi9tYXR0ZXItaW50ZXJwb2xhdGUnXG5leHBvcnQgZGVmYXVsdCBtOW1ldGFUb0ZpbGVzXG5cbmNvbnN0IE1FVEFfS0VZID0gJ21ldGFfdG9fZmlsZXMnXG5jb25zdCBJTkRFWF9GSUxFID0gJ2luZGV4Lmh0bWwnXG5cbmZ1bmN0aW9uIG05bWV0YVRvRmlsZXMgKHsgc2x1ZyB9KSB7XG5cbiAgbGV0IHNsdWdGblxuICBpZiAodHlwZW9mIHNsdWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzbHVnRm4gPSBzbHVnXG4gIH0gZWxzZSBpZiAoc2x1Zykge1xuICAgIHNsdWdGbiA9IGZ1bmN0aW9uIHNsdWdGbiAodikge1xuICAgICAgcmV0dXJuIGRvZG9TbHVnKHYsIHNsdWcpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNsdWdGbiA9IGRvZG9TbHVnXG4gIH1cblxuICByZXR1cm4gKGZpbGVzLCBtZXRhbHNtaXRoLCBkb25lKSA9PiB7XG4gICAgT2JqZWN0LmtleXMoZmlsZXMpLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBjb25zdCBmaWxlTWV0YSA9IGZpbGVzW2ZpbGVdXG4gICAgICBjb25zdCBwbHVnaW5NZXRhID0gZmlsZU1ldGFbTUVUQV9LRVldXG4gICAgICBpZiAoIXBsdWdpbk1ldGEpIHJldHVyblxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIG1vZGVsX25hbWU6IG1vZGVsTmFtZSxcbiAgICAgICAgZmlsZW5hbWVfcGF0dGVybjogZmlsZW5hbWVQYXR0ZXJuXG4gICAgICB9ID0gcGx1Z2luTWV0YVxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIFttb2RlbE5hbWVdOiBlbnRpdGllc1xuICAgICAgfSA9IG1ldGFsc21pdGgubWV0YWRhdGEoKVxuXG4gICAgICBlbnRpdGllcy5mb3JFYWNoKGVudGl0eSA9PiB7XG4gICAgICAgIGxldCBuZXdGaWxlTWV0YSA9IHsgLi4uZmlsZU1ldGEgfVxuICAgICAgICBkZWxldGUgbmV3RmlsZU1ldGFbTUVUQV9LRVldXG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAuLi5tZXRhbHNtaXRoLm1ldGFkYXRhKCksXG4gICAgICAgICAgW21vZGVsTmFtZV06IGVudGl0eVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJhbnNmZXIgcGx1Z2luIGV4dHJhIHByb3BzIHRvIHJvb3Qgc2NvcGUgaW4gZnJvbnRtYXR0ZXJcbiAgICAgICAgT2JqZWN0LmtleXMocGx1Z2luTWV0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChbJ21vZGVsX25hbWUnLCAnZmlsZW5hbWVfcGF0dGVybiddLmluY2x1ZGVzKGtleSkpIHJldHVyblxuICAgICAgICAgIG5ld0ZpbGVNZXRhW2tleV0gPSBtYXR0ZXJJbnRlcnBvbGF0ZShwbHVnaW5NZXRhW2tleV0sIGRhdGEpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBidWlsZEZpbGVuYW1lKGZpbGVuYW1lUGF0dGVybiwgZGF0YSwgZmlsZSwgc2x1Z0ZuKVxuICAgICAgICBmaWxlc1tmaWxlbmFtZV0gPSBuZXdGaWxlTWV0YVxuICAgICAgfSlcblxuICAgICAgLy8gdW5wdWJsaXNoIG1ldGEgdGVtcGxhdGUgZmlsZVxuICAgICAgZGVsZXRlIGZpbGVzW2ZpbGVdXG4gICAgfSlcblxuICAgIGRvbmUoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRmlsZW5hbWUgKGZpbGVuYW1lUGF0dGVybiwgZGF0YSwgdHBsRmlsZW5hbWUsIHNsdWdGbikge1xuICBsZXQgZmlsZW5hbWUgPSBtYXR0ZXJJbnRlcnBvbGF0ZShmaWxlbmFtZVBhdHRlcm4sIGRhdGEsIHNsdWdGbilcblxuICBpZiAoaXNQZXJtYWxpbmsoZmlsZW5hbWUpKSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZmlsZUV4dGVuc2lvbih0cGxGaWxlbmFtZSwgMSlcbiAgICBmaWxlbmFtZSArPSBgLyR7SU5ERVhfRklMRX0uJHtleHRlbnNpb259YFxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGZpbGVFeHRlbnNpb24odHBsRmlsZW5hbWUsIDIpXG4gICAgZmlsZW5hbWUgKz0gYC4ke2V4dGVuc2lvbn1gXG4gIH1cblxuICByZXR1cm4gZmlsZW5hbWVcbn1cblxuZnVuY3Rpb24gaXNQZXJtYWxpbmsgKGZpbGVuYW1lKSB7XG4gIHJldHVybiBmaWxlbmFtZS5zdWJzdHIoLTEpID09PSAnLydcbn1cblxuZnVuY3Rpb24gZmlsZUV4dGVuc2lvbiAoZmlsZW5hbWUsIGV4dGVuc2lvbnNDb3VudCkge1xuICByZXR1cm4gZmlsZW5hbWVcbiAgICAuc3BsaXQoJy4nLCAzKVxuICAgIC5zcGxpY2UoLTEgKiBleHRlbnNpb25zQ291bnQpXG4gICAgLmpvaW4oJy4nKVxufVxuIl19