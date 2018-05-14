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

function m9metaToFiles(_ref) {
  var slugOptions = _ref.slugOptions;


  var slug = void 0;
  if (typeof slugOptions === 'function') {
    slug = slugOptions;
  } else {
    slug = function slug(v) {
      return (0, _slugComponent2.default)(v, slugOptions);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMuanMiXSwibmFtZXMiOlsibTltZXRhVG9GaWxlcyIsIk1FVEFfS0VZIiwiSU5ERVhfRklMRSIsInNsdWdPcHRpb25zIiwic2x1ZyIsInYiLCJmaWxlcyIsIm1ldGFsc21pdGgiLCJkb25lIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJmaWxlTWV0YSIsImZpbGUiLCJwbHVnaW5NZXRhIiwibW9kZWxOYW1lIiwibW9kZWxfbmFtZSIsImZpbGVuYW1lUGF0dGVybiIsImZpbGVuYW1lX3BhdHRlcm4iLCJtZXRhZGF0YSIsImVudGl0aWVzIiwibmV3RmlsZU1ldGEiLCJkYXRhIiwiZW50aXR5IiwiaW5jbHVkZXMiLCJrZXkiLCJmaWxlbmFtZSIsImJ1aWxkRmlsZW5hbWUiLCJ0cGxGaWxlbmFtZSIsInNsdWdGbiIsImlzUGVybWFsaW5rIiwiZXh0ZW5zaW9uIiwiZmlsZUV4dGVuc2lvbiIsInN1YnN0ciIsImV4dGVuc2lvbnNDb3VudCIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztrQkFDZUEsYTs7O0FBRWYsSUFBTUMsV0FBVyxlQUFqQjtBQUNBLElBQU1DLGFBQWEsWUFBbkI7O0FBRUEsU0FBU0YsYUFBVCxPQUF5QztBQUFBLE1BQWZHLFdBQWUsUUFBZkEsV0FBZTs7O0FBRXZDLE1BQUlDLGFBQUo7QUFDQSxNQUFJLE9BQU9ELFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckNDLFdBQU9ELFdBQVA7QUFDRCxHQUZELE1BRU87QUFDTEMsV0FBTyxTQUFTQSxJQUFULENBQWVDLENBQWYsRUFBa0I7QUFDdkIsYUFBTyw2QkFBY0EsQ0FBZCxFQUFpQkYsV0FBakIsQ0FBUDtBQUNELEtBRkQ7QUFHRDs7QUFFRCxTQUFPLFVBQUNHLEtBQUQsRUFBUUMsVUFBUixFQUFvQkMsSUFBcEIsRUFBNkI7QUFDbENDLFdBQU9DLElBQVAsQ0FBWUosS0FBWixFQUFtQkssT0FBbkIsQ0FBMkIsZ0JBQVE7QUFDakMsVUFBTUMsV0FBV04sTUFBTU8sSUFBTixDQUFqQjtBQUNBLFVBQU1DLGFBQWFGLFNBQVNYLFFBQVQsQ0FBbkI7QUFDQSxVQUFJLENBQUNhLFVBQUwsRUFBaUI7O0FBSGdCLFVBTW5CQyxTQU5tQixHQVE3QkQsVUFSNkIsQ0FNL0JFLFVBTitCO0FBQUEsVUFPYkMsZUFQYSxHQVE3QkgsVUFSNkIsQ0FPL0JJLGdCQVArQjs7QUFBQSxpQ0FZN0JYLFdBQVdZLFFBQVgsRUFaNkI7QUFBQSxVQVdsQkMsUUFYa0Isd0JBVzlCTCxTQVg4Qjs7QUFjakNLLGVBQVNULE9BQVQsQ0FBaUIsa0JBQVU7QUFDekIsWUFBSVUsMkJBQW1CVCxRQUFuQixDQUFKO0FBQ0EsZUFBT1MsWUFBWXBCLFFBQVosQ0FBUDs7QUFFQSxZQUFNcUIsb0JBQ0RmLFdBQVdZLFFBQVgsRUFEQyxzQkFFSEosU0FGRyxFQUVTUSxNQUZULEVBQU47O0FBS0E7QUFDQWQsZUFBT0MsSUFBUCxDQUFZSSxVQUFaLEVBQXdCSCxPQUF4QixDQUFnQyxlQUFPO0FBQ3JDLGNBQUksQ0FBQyxZQUFELEVBQWUsa0JBQWYsRUFBbUNhLFFBQW5DLENBQTRDQyxHQUE1QyxDQUFKLEVBQXNEO0FBQ3RESixzQkFBWUksR0FBWixJQUFtQixpQ0FBa0JYLFdBQVdXLEdBQVgsQ0FBbEIsRUFBbUNILElBQW5DLENBQW5CO0FBQ0QsU0FIRDs7QUFLQSxZQUFNSSxXQUFXQyxjQUFjVixlQUFkLEVBQStCSyxJQUEvQixFQUFxQ1QsSUFBckMsRUFBMkNULElBQTNDLENBQWpCO0FBQ0FFLGNBQU1vQixRQUFOLElBQWtCTCxXQUFsQjtBQUNELE9BakJEOztBQW1CQTtBQUNBLGFBQU9mLE1BQU1PLElBQU4sQ0FBUDtBQUNELEtBbkNEOztBQXFDQUw7QUFDRCxHQXZDRDtBQXdDRDs7QUFFRCxTQUFTbUIsYUFBVCxDQUF3QlYsZUFBeEIsRUFBeUNLLElBQXpDLEVBQStDTSxXQUEvQyxFQUE0REMsTUFBNUQsRUFBb0U7QUFDbEUsTUFBSUgsV0FBVyxpQ0FBa0JULGVBQWxCLEVBQW1DSyxJQUFuQyxFQUF5Q08sTUFBekMsQ0FBZjs7QUFFQSxNQUFJQyxZQUFZSixRQUFaLENBQUosRUFBMkI7QUFDekIsUUFBTUssWUFBWUMsY0FBY0osV0FBZCxFQUEyQixDQUEzQixDQUFsQjtBQUNBRixzQkFBZ0J4QixVQUFoQixTQUE4QjZCLFNBQTlCO0FBQ0QsR0FIRCxNQUdPO0FBQ0wsUUFBTUEsYUFBWUMsY0FBY0osV0FBZCxFQUEyQixDQUEzQixDQUFsQjtBQUNBRixzQkFBZ0JLLFVBQWhCO0FBQ0Q7O0FBRUQsU0FBT0wsUUFBUDtBQUNEOztBQUVELFNBQVNJLFdBQVQsQ0FBc0JKLFFBQXRCLEVBQWdDO0FBQzlCLFNBQU9BLFNBQVNPLE1BQVQsQ0FBZ0IsQ0FBQyxDQUFqQixNQUF3QixHQUEvQjtBQUNEOztBQUVELFNBQVNELGFBQVQsQ0FBd0JOLFFBQXhCLEVBQWtDUSxlQUFsQyxFQUFtRDtBQUNqRCxTQUFPUixTQUNKUyxLQURJLENBQ0UsR0FERixFQUNPLENBRFAsRUFFSkMsTUFGSSxDQUVHLENBQUMsQ0FBRCxHQUFLRixlQUZSLEVBR0pHLElBSEksQ0FHQyxHQUhELENBQVA7QUFJRCIsImZpbGUiOiJtOS1tZXRhLXRvLWZpbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNsdWdDb21wb25lbnQgZnJvbSAnc2x1Zy1jb21wb25lbnQnXG5pbXBvcnQgbWF0dGVySW50ZXJwb2xhdGUgZnJvbSAnLi4vbWF0dGVyLWludGVycG9sYXRlJ1xuZXhwb3J0IGRlZmF1bHQgbTltZXRhVG9GaWxlc1xuXG5jb25zdCBNRVRBX0tFWSA9ICdtZXRhX3RvX2ZpbGVzJ1xuY29uc3QgSU5ERVhfRklMRSA9ICdpbmRleC5odG1sJ1xuXG5mdW5jdGlvbiBtOW1ldGFUb0ZpbGVzICh7IHNsdWdPcHRpb25zIH0pIHtcblxuICBsZXQgc2x1Z1xuICBpZiAodHlwZW9mIHNsdWdPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2x1ZyA9IHNsdWdPcHRpb25zXG4gIH0gZWxzZSB7XG4gICAgc2x1ZyA9IGZ1bmN0aW9uIHNsdWcgKHYpIHtcbiAgICAgIHJldHVybiBzbHVnQ29tcG9uZW50KHYsIHNsdWdPcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZmlsZXMsIG1ldGFsc21pdGgsIGRvbmUpID0+IHtcbiAgICBPYmplY3Qua2V5cyhmaWxlcykuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGNvbnN0IGZpbGVNZXRhID0gZmlsZXNbZmlsZV1cbiAgICAgIGNvbnN0IHBsdWdpbk1ldGEgPSBmaWxlTWV0YVtNRVRBX0tFWV1cbiAgICAgIGlmICghcGx1Z2luTWV0YSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbW9kZWxfbmFtZTogbW9kZWxOYW1lLFxuICAgICAgICBmaWxlbmFtZV9wYXR0ZXJuOiBmaWxlbmFtZVBhdHRlcm5cbiAgICAgIH0gPSBwbHVnaW5NZXRhXG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgW21vZGVsTmFtZV06IGVudGl0aWVzXG4gICAgICB9ID0gbWV0YWxzbWl0aC5tZXRhZGF0YSgpXG5cbiAgICAgIGVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IHtcbiAgICAgICAgbGV0IG5ld0ZpbGVNZXRhID0geyAuLi5maWxlTWV0YSB9XG4gICAgICAgIGRlbGV0ZSBuZXdGaWxlTWV0YVtNRVRBX0tFWV1cblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgIC4uLm1ldGFsc21pdGgubWV0YWRhdGEoKSxcbiAgICAgICAgICBbbW9kZWxOYW1lXTogZW50aXR5XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmFuc2ZlciBwbHVnaW4gZXh0cmEgcHJvcHMgdG8gcm9vdCBzY29wZSBpbiBmcm9udG1hdHRlclxuICAgICAgICBPYmplY3Qua2V5cyhwbHVnaW5NZXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKFsnbW9kZWxfbmFtZScsICdmaWxlbmFtZV9wYXR0ZXJuJ10uaW5jbHVkZXMoa2V5KSkgcmV0dXJuXG4gICAgICAgICAgbmV3RmlsZU1ldGFba2V5XSA9IG1hdHRlckludGVycG9sYXRlKHBsdWdpbk1ldGFba2V5XSwgZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGJ1aWxkRmlsZW5hbWUoZmlsZW5hbWVQYXR0ZXJuLCBkYXRhLCBmaWxlLCBzbHVnKVxuICAgICAgICBmaWxlc1tmaWxlbmFtZV0gPSBuZXdGaWxlTWV0YVxuICAgICAgfSlcblxuICAgICAgLy8gdW5wdWJsaXNoIG1ldGEgdGVtcGxhdGUgZmlsZVxuICAgICAgZGVsZXRlIGZpbGVzW2ZpbGVdXG4gICAgfSlcblxuICAgIGRvbmUoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRmlsZW5hbWUgKGZpbGVuYW1lUGF0dGVybiwgZGF0YSwgdHBsRmlsZW5hbWUsIHNsdWdGbikge1xuICBsZXQgZmlsZW5hbWUgPSBtYXR0ZXJJbnRlcnBvbGF0ZShmaWxlbmFtZVBhdHRlcm4sIGRhdGEsIHNsdWdGbilcblxuICBpZiAoaXNQZXJtYWxpbmsoZmlsZW5hbWUpKSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZmlsZUV4dGVuc2lvbih0cGxGaWxlbmFtZSwgMSlcbiAgICBmaWxlbmFtZSArPSBgLyR7SU5ERVhfRklMRX0uJHtleHRlbnNpb259YFxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGZpbGVFeHRlbnNpb24odHBsRmlsZW5hbWUsIDIpXG4gICAgZmlsZW5hbWUgKz0gYC4ke2V4dGVuc2lvbn1gXG4gIH1cblxuICByZXR1cm4gZmlsZW5hbWVcbn1cblxuZnVuY3Rpb24gaXNQZXJtYWxpbmsgKGZpbGVuYW1lKSB7XG4gIHJldHVybiBmaWxlbmFtZS5zdWJzdHIoLTEpID09PSAnLydcbn1cblxuZnVuY3Rpb24gZmlsZUV4dGVuc2lvbiAoZmlsZW5hbWUsIGV4dGVuc2lvbnNDb3VudCkge1xuICByZXR1cm4gZmlsZW5hbWVcbiAgICAuc3BsaXQoJy4nLCAzKVxuICAgIC5zcGxpY2UoLTEgKiBleHRlbnNpb25zQ291bnQpXG4gICAgLmpvaW4oJy4nKVxufVxuIl19