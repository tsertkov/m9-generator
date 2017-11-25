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

exports.default = m9metaToFiles;


const META_KEY = 'meta_to_files';
const INDEX_FILE = 'index.html';

function m9metaToFiles() {
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

        const filename = buildFilename(filenamePattern, data, file);
        files[filename] = newFileMeta;
      });

      // unpublish meta template file
      delete files[file];
    });

    done();
  };
}

function buildFilename(filenamePattern, data, tplFilename) {
  let filename = (0, _matterInterpolate2.default)(filenamePattern, data, _slugComponent2.default);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1ldGEtdG8tZmlsZXMuanMiXSwibmFtZXMiOlsibTltZXRhVG9GaWxlcyIsIk1FVEFfS0VZIiwiSU5ERVhfRklMRSIsImZpbGVzIiwibWV0YWxzbWl0aCIsImRvbmUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImZpbGUiLCJmaWxlTWV0YSIsInBsdWdpbk1ldGEiLCJtb2RlbF9uYW1lIiwibW9kZWxOYW1lIiwiZmlsZW5hbWVfcGF0dGVybiIsImZpbGVuYW1lUGF0dGVybiIsImVudGl0aWVzIiwibWV0YWRhdGEiLCJlbnRpdHkiLCJuZXdGaWxlTWV0YSIsImRhdGEiLCJrZXkiLCJpbmNsdWRlcyIsImZpbGVuYW1lIiwiYnVpbGRGaWxlbmFtZSIsInRwbEZpbGVuYW1lIiwiaXNQZXJtYWxpbmsiLCJleHRlbnNpb24iLCJmaWxlRXh0ZW5zaW9uIiwic3Vic3RyIiwiZXh0ZW5zaW9uc0NvdW50Iiwic3BsaXQiLCJzcGxpY2UiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztrQkFDZUEsYTs7O0FBRWYsTUFBTUMsV0FBVyxlQUFqQjtBQUNBLE1BQU1DLGFBQWEsWUFBbkI7O0FBRUEsU0FBU0YsYUFBVCxHQUEwQjtBQUN4QixTQUFPLENBQUNHLEtBQUQsRUFBUUMsVUFBUixFQUFvQkMsSUFBcEIsS0FBNkI7QUFDbENDLFdBQU9DLElBQVAsQ0FBWUosS0FBWixFQUFtQkssT0FBbkIsQ0FBMkJDLFFBQVE7QUFDakMsWUFBTUMsV0FBV1AsTUFBTU0sSUFBTixDQUFqQjtBQUNBLFlBQU1FLGFBQWFELFNBQVNULFFBQVQsQ0FBbkI7QUFDQSxVQUFJLENBQUNVLFVBQUwsRUFBaUI7O0FBRWpCLFlBQU07QUFDSkMsb0JBQVlDLFNBRFI7QUFFSkMsMEJBQWtCQztBQUZkLFVBR0ZKLFVBSEo7O0FBS0EsWUFBTTtBQUNKLFNBQUNFLFNBQUQsR0FBYUc7QUFEVCxVQUVGWixXQUFXYSxRQUFYLEVBRko7O0FBSUFELGVBQVNSLE9BQVQsQ0FBaUJVLFVBQVU7QUFDekIsWUFBSUMsMkJBQW1CVCxRQUFuQixDQUFKO0FBQ0EsZUFBT1MsWUFBWWxCLFFBQVosQ0FBUDs7QUFFQSxjQUFNbUIsb0JBQ0RoQixXQUFXYSxRQUFYLEVBREM7QUFFSixXQUFDSixTQUFELEdBQWFLOztBQUdmO0FBTE0sVUFBTixDQU1BWixPQUFPQyxJQUFQLENBQVlJLFVBQVosRUFBd0JILE9BQXhCLENBQWdDYSxPQUFPO0FBQ3JDLGNBQUksQ0FBQyxZQUFELEVBQWUsa0JBQWYsRUFBbUNDLFFBQW5DLENBQTRDRCxHQUE1QyxDQUFKLEVBQXNEO0FBQ3RERixzQkFBWUUsR0FBWixJQUFtQixpQ0FBa0JWLFdBQVdVLEdBQVgsQ0FBbEIsRUFBbUNELElBQW5DLENBQW5CO0FBQ0QsU0FIRDs7QUFLQSxjQUFNRyxXQUFXQyxjQUFjVCxlQUFkLEVBQStCSyxJQUEvQixFQUFxQ1gsSUFBckMsQ0FBakI7QUFDQU4sY0FBTW9CLFFBQU4sSUFBa0JKLFdBQWxCO0FBQ0QsT0FqQkQ7O0FBbUJBO0FBQ0EsYUFBT2hCLE1BQU1NLElBQU4sQ0FBUDtBQUNELEtBbkNEOztBQXFDQUo7QUFDRCxHQXZDRDtBQXdDRDs7QUFFRCxTQUFTbUIsYUFBVCxDQUF3QlQsZUFBeEIsRUFBeUNLLElBQXpDLEVBQStDSyxXQUEvQyxFQUE0RDtBQUMxRCxNQUFJRixXQUFXLGlDQUFrQlIsZUFBbEIsRUFBbUNLLElBQW5DLDBCQUFmOztBQUVBLE1BQUlNLFlBQVlILFFBQVosQ0FBSixFQUEyQjtBQUN6QixVQUFNSSxZQUFZQyxjQUFjSCxXQUFkLEVBQTJCLENBQTNCLENBQWxCO0FBQ0FGLGdCQUFhLElBQUdyQixVQUFXLElBQUd5QixTQUFVLEVBQXhDO0FBQ0QsR0FIRCxNQUdPO0FBQ0wsVUFBTUEsWUFBWUMsY0FBY0gsV0FBZCxFQUEyQixDQUEzQixDQUFsQjtBQUNBRixnQkFBYSxJQUFHSSxTQUFVLEVBQTFCO0FBQ0Q7O0FBRUQsU0FBT0osUUFBUDtBQUNEOztBQUVELFNBQVNHLFdBQVQsQ0FBc0JILFFBQXRCLEVBQWdDO0FBQzlCLFNBQU9BLFNBQVNNLE1BQVQsQ0FBZ0IsQ0FBQyxDQUFqQixNQUF3QixHQUEvQjtBQUNEOztBQUVELFNBQVNELGFBQVQsQ0FBd0JMLFFBQXhCLEVBQWtDTyxlQUFsQyxFQUFtRDtBQUNqRCxTQUFPUCxTQUNKUSxLQURJLENBQ0UsR0FERixFQUNPLENBRFAsRUFFSkMsTUFGSSxDQUVHLENBQUMsQ0FBRCxHQUFLRixlQUZSLEVBR0pHLElBSEksQ0FHQyxHQUhELENBQVA7QUFJRCIsImZpbGUiOiJtOS1tZXRhLXRvLWZpbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNsdWcgZnJvbSAnc2x1Zy1jb21wb25lbnQnXG5pbXBvcnQgbWF0dGVySW50ZXJwb2xhdGUgZnJvbSAnLi4vbWF0dGVyLWludGVycG9sYXRlJ1xuZXhwb3J0IGRlZmF1bHQgbTltZXRhVG9GaWxlc1xuXG5jb25zdCBNRVRBX0tFWSA9ICdtZXRhX3RvX2ZpbGVzJ1xuY29uc3QgSU5ERVhfRklMRSA9ICdpbmRleC5odG1sJ1xuXG5mdW5jdGlvbiBtOW1ldGFUb0ZpbGVzICgpIHtcbiAgcmV0dXJuIChmaWxlcywgbWV0YWxzbWl0aCwgZG9uZSkgPT4ge1xuICAgIE9iamVjdC5rZXlzKGZpbGVzKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgY29uc3QgZmlsZU1ldGEgPSBmaWxlc1tmaWxlXVxuICAgICAgY29uc3QgcGx1Z2luTWV0YSA9IGZpbGVNZXRhW01FVEFfS0VZXVxuICAgICAgaWYgKCFwbHVnaW5NZXRhKSByZXR1cm5cblxuICAgICAgY29uc3Qge1xuICAgICAgICBtb2RlbF9uYW1lOiBtb2RlbE5hbWUsXG4gICAgICAgIGZpbGVuYW1lX3BhdHRlcm46IGZpbGVuYW1lUGF0dGVyblxuICAgICAgfSA9IHBsdWdpbk1ldGFcblxuICAgICAgY29uc3Qge1xuICAgICAgICBbbW9kZWxOYW1lXTogZW50aXRpZXNcbiAgICAgIH0gPSBtZXRhbHNtaXRoLm1ldGFkYXRhKClcblxuICAgICAgZW50aXRpZXMuZm9yRWFjaChlbnRpdHkgPT4ge1xuICAgICAgICBsZXQgbmV3RmlsZU1ldGEgPSB7IC4uLmZpbGVNZXRhIH1cbiAgICAgICAgZGVsZXRlIG5ld0ZpbGVNZXRhW01FVEFfS0VZXVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgLi4ubWV0YWxzbWl0aC5tZXRhZGF0YSgpLFxuICAgICAgICAgIFttb2RlbE5hbWVdOiBlbnRpdHlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyYW5zZmVyIHBsdWdpbiBleHRyYSBwcm9wcyB0byByb290IHNjb3BlIGluIGZyb250bWF0dGVyXG4gICAgICAgIE9iamVjdC5rZXlzKHBsdWdpbk1ldGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAoWydtb2RlbF9uYW1lJywgJ2ZpbGVuYW1lX3BhdHRlcm4nXS5pbmNsdWRlcyhrZXkpKSByZXR1cm5cbiAgICAgICAgICBuZXdGaWxlTWV0YVtrZXldID0gbWF0dGVySW50ZXJwb2xhdGUocGx1Z2luTWV0YVtrZXldLCBkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gYnVpbGRGaWxlbmFtZShmaWxlbmFtZVBhdHRlcm4sIGRhdGEsIGZpbGUpXG4gICAgICAgIGZpbGVzW2ZpbGVuYW1lXSA9IG5ld0ZpbGVNZXRhXG4gICAgICB9KVxuXG4gICAgICAvLyB1bnB1Ymxpc2ggbWV0YSB0ZW1wbGF0ZSBmaWxlXG4gICAgICBkZWxldGUgZmlsZXNbZmlsZV1cbiAgICB9KVxuXG4gICAgZG9uZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gYnVpbGRGaWxlbmFtZSAoZmlsZW5hbWVQYXR0ZXJuLCBkYXRhLCB0cGxGaWxlbmFtZSkge1xuICBsZXQgZmlsZW5hbWUgPSBtYXR0ZXJJbnRlcnBvbGF0ZShmaWxlbmFtZVBhdHRlcm4sIGRhdGEsIHNsdWcpXG5cbiAgaWYgKGlzUGVybWFsaW5rKGZpbGVuYW1lKSkge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGZpbGVFeHRlbnNpb24odHBsRmlsZW5hbWUsIDEpXG4gICAgZmlsZW5hbWUgKz0gYC8ke0lOREVYX0ZJTEV9LiR7ZXh0ZW5zaW9ufWBcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBmaWxlRXh0ZW5zaW9uKHRwbEZpbGVuYW1lLCAyKVxuICAgIGZpbGVuYW1lICs9IGAuJHtleHRlbnNpb259YFxuICB9XG5cbiAgcmV0dXJuIGZpbGVuYW1lXG59XG5cbmZ1bmN0aW9uIGlzUGVybWFsaW5rIChmaWxlbmFtZSkge1xuICByZXR1cm4gZmlsZW5hbWUuc3Vic3RyKC0xKSA9PT0gJy8nXG59XG5cbmZ1bmN0aW9uIGZpbGVFeHRlbnNpb24gKGZpbGVuYW1lLCBleHRlbnNpb25zQ291bnQpIHtcbiAgcmV0dXJuIGZpbGVuYW1lXG4gICAgLnNwbGl0KCcuJywgMylcbiAgICAuc3BsaWNlKC0xICogZXh0ZW5zaW9uc0NvdW50KVxuICAgIC5qb2luKCcuJylcbn1cbiJdfQ==