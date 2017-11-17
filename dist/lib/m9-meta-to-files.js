'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slugComponent = require('slug-component');

var _slugComponent2 = _interopRequireDefault(_slugComponent);

var _matterInterpolate = require('./matter-interpolate');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbTktbWV0YS10by1maWxlcy5qcyJdLCJuYW1lcyI6WyJtOW1ldGFUb0ZpbGVzIiwiTUVUQV9LRVkiLCJJTkRFWF9GSUxFIiwiZmlsZXMiLCJtZXRhbHNtaXRoIiwiZG9uZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZmlsZU1ldGEiLCJmaWxlIiwicGx1Z2luTWV0YSIsIm1vZGVsTmFtZSIsIm1vZGVsX25hbWUiLCJmaWxlbmFtZVBhdHRlcm4iLCJmaWxlbmFtZV9wYXR0ZXJuIiwibWV0YWRhdGEiLCJlbnRpdGllcyIsIm5ld0ZpbGVNZXRhIiwiZGF0YSIsImVudGl0eSIsImluY2x1ZGVzIiwia2V5IiwiZmlsZW5hbWUiLCJidWlsZEZpbGVuYW1lIiwidHBsRmlsZW5hbWUiLCJpc1Blcm1hbGluayIsImV4dGVuc2lvbiIsImZpbGVFeHRlbnNpb24iLCJzdWJzdHIiLCJleHRlbnNpb25zQ291bnQiLCJzcGxpdCIsInNwbGljZSIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7a0JBQ2VBLGE7OztBQUVmLElBQU1DLFdBQVcsZUFBakI7QUFDQSxJQUFNQyxhQUFhLFlBQW5COztBQUVBLFNBQVNGLGFBQVQsR0FBMEI7QUFDeEIsU0FBTyxVQUFDRyxLQUFELEVBQVFDLFVBQVIsRUFBb0JDLElBQXBCLEVBQTZCO0FBQ2xDQyxXQUFPQyxJQUFQLENBQVlKLEtBQVosRUFBbUJLLE9BQW5CLENBQTJCLGdCQUFRO0FBQ2pDLFVBQU1DLFdBQVdOLE1BQU1PLElBQU4sQ0FBakI7QUFDQSxVQUFNQyxhQUFhRixTQUFTUixRQUFULENBQW5CO0FBQ0EsVUFBSSxDQUFDVSxVQUFMLEVBQWlCOztBQUhnQixVQU1uQkMsU0FObUIsR0FRN0JELFVBUjZCLENBTS9CRSxVQU4rQjtBQUFBLFVBT2JDLGVBUGEsR0FRN0JILFVBUjZCLENBTy9CSSxnQkFQK0I7O0FBQUEsaUNBWTdCWCxXQUFXWSxRQUFYLEVBWjZCO0FBQUEsVUFXbEJDLFFBWGtCLHdCQVc5QkwsU0FYOEI7O0FBY2pDSyxlQUFTVCxPQUFULENBQWlCLGtCQUFVO0FBQ3pCLFlBQUlVLDJCQUFtQlQsUUFBbkIsQ0FBSjtBQUNBLGVBQU9TLFlBQVlqQixRQUFaLENBQVA7O0FBRUEsWUFBTWtCLG9CQUNEZixXQUFXWSxRQUFYLEVBREMsc0JBRUhKLFNBRkcsRUFFU1EsTUFGVCxFQUFOOztBQUtBO0FBQ0FkLGVBQU9DLElBQVAsQ0FBWUksVUFBWixFQUF3QkgsT0FBeEIsQ0FBZ0MsZUFBTztBQUNyQyxjQUFJLENBQUMsWUFBRCxFQUFlLGtCQUFmLEVBQW1DYSxRQUFuQyxDQUE0Q0MsR0FBNUMsQ0FBSixFQUFzRDtBQUN0REosc0JBQVlJLEdBQVosSUFBbUIsaUNBQWtCWCxXQUFXVyxHQUFYLENBQWxCLEVBQW1DSCxJQUFuQyxDQUFuQjtBQUNELFNBSEQ7O0FBS0EsWUFBTUksV0FBV0MsY0FBY1YsZUFBZCxFQUErQkssSUFBL0IsRUFBcUNULElBQXJDLENBQWpCO0FBQ0FQLGNBQU1vQixRQUFOLElBQWtCTCxXQUFsQjtBQUNELE9BakJEOztBQW1CQTtBQUNBLGFBQU9mLE1BQU1PLElBQU4sQ0FBUDtBQUNELEtBbkNEOztBQXFDQUw7QUFDRCxHQXZDRDtBQXdDRDs7QUFFRCxTQUFTbUIsYUFBVCxDQUF3QlYsZUFBeEIsRUFBeUNLLElBQXpDLEVBQStDTSxXQUEvQyxFQUE0RDtBQUMxRCxNQUFJRixXQUFXLGlDQUFrQlQsZUFBbEIsRUFBbUNLLElBQW5DLDBCQUFmOztBQUVBLE1BQUlPLFlBQVlILFFBQVosQ0FBSixFQUEyQjtBQUN6QixRQUFNSSxZQUFZQyxjQUFjSCxXQUFkLEVBQTJCLENBQTNCLENBQWxCO0FBQ0FGLHNCQUFnQnJCLFVBQWhCLFNBQThCeUIsU0FBOUI7QUFDRCxHQUhELE1BR087QUFDTCxRQUFNQSxhQUFZQyxjQUFjSCxXQUFkLEVBQTJCLENBQTNCLENBQWxCO0FBQ0FGLHNCQUFnQkksVUFBaEI7QUFDRDs7QUFFRCxTQUFPSixRQUFQO0FBQ0Q7O0FBRUQsU0FBU0csV0FBVCxDQUFzQkgsUUFBdEIsRUFBZ0M7QUFDOUIsU0FBT0EsU0FBU00sTUFBVCxDQUFnQixDQUFDLENBQWpCLE1BQXdCLEdBQS9CO0FBQ0Q7O0FBRUQsU0FBU0QsYUFBVCxDQUF3QkwsUUFBeEIsRUFBa0NPLGVBQWxDLEVBQW1EO0FBQ2pELFNBQU9QLFNBQ0pRLEtBREksQ0FDRSxHQURGLEVBQ08sQ0FEUCxFQUVKQyxNQUZJLENBRUcsQ0FBQyxDQUFELEdBQUtGLGVBRlIsRUFHSkcsSUFISSxDQUdDLEdBSEQsQ0FBUDtBQUlEIiwiZmlsZSI6Im05LW1ldGEtdG8tZmlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2x1ZyBmcm9tICdzbHVnLWNvbXBvbmVudCdcbmltcG9ydCBtYXR0ZXJJbnRlcnBvbGF0ZSBmcm9tICcuL21hdHRlci1pbnRlcnBvbGF0ZSdcbmV4cG9ydCBkZWZhdWx0IG05bWV0YVRvRmlsZXNcblxuY29uc3QgTUVUQV9LRVkgPSAnbWV0YV90b19maWxlcydcbmNvbnN0IElOREVYX0ZJTEUgPSAnaW5kZXguaHRtbCdcblxuZnVuY3Rpb24gbTltZXRhVG9GaWxlcyAoKSB7XG4gIHJldHVybiAoZmlsZXMsIG1ldGFsc21pdGgsIGRvbmUpID0+IHtcbiAgICBPYmplY3Qua2V5cyhmaWxlcykuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGNvbnN0IGZpbGVNZXRhID0gZmlsZXNbZmlsZV1cbiAgICAgIGNvbnN0IHBsdWdpbk1ldGEgPSBmaWxlTWV0YVtNRVRBX0tFWV1cbiAgICAgIGlmICghcGx1Z2luTWV0YSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbW9kZWxfbmFtZTogbW9kZWxOYW1lLFxuICAgICAgICBmaWxlbmFtZV9wYXR0ZXJuOiBmaWxlbmFtZVBhdHRlcm5cbiAgICAgIH0gPSBwbHVnaW5NZXRhXG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgW21vZGVsTmFtZV06IGVudGl0aWVzXG4gICAgICB9ID0gbWV0YWxzbWl0aC5tZXRhZGF0YSgpXG5cbiAgICAgIGVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IHtcbiAgICAgICAgbGV0IG5ld0ZpbGVNZXRhID0geyAuLi5maWxlTWV0YSB9XG4gICAgICAgIGRlbGV0ZSBuZXdGaWxlTWV0YVtNRVRBX0tFWV1cblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgIC4uLm1ldGFsc21pdGgubWV0YWRhdGEoKSxcbiAgICAgICAgICBbbW9kZWxOYW1lXTogZW50aXR5XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmFuc2ZlciBwbHVnaW4gZXh0cmEgcHJvcHMgdG8gcm9vdCBzY29wZSBpbiBmcm9udG1hdHRlclxuICAgICAgICBPYmplY3Qua2V5cyhwbHVnaW5NZXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKFsnbW9kZWxfbmFtZScsICdmaWxlbmFtZV9wYXR0ZXJuJ10uaW5jbHVkZXMoa2V5KSkgcmV0dXJuXG4gICAgICAgICAgbmV3RmlsZU1ldGFba2V5XSA9IG1hdHRlckludGVycG9sYXRlKHBsdWdpbk1ldGFba2V5XSwgZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGJ1aWxkRmlsZW5hbWUoZmlsZW5hbWVQYXR0ZXJuLCBkYXRhLCBmaWxlKVxuICAgICAgICBmaWxlc1tmaWxlbmFtZV0gPSBuZXdGaWxlTWV0YVxuICAgICAgfSlcblxuICAgICAgLy8gdW5wdWJsaXNoIG1ldGEgdGVtcGxhdGUgZmlsZVxuICAgICAgZGVsZXRlIGZpbGVzW2ZpbGVdXG4gICAgfSlcblxuICAgIGRvbmUoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRmlsZW5hbWUgKGZpbGVuYW1lUGF0dGVybiwgZGF0YSwgdHBsRmlsZW5hbWUpIHtcbiAgbGV0IGZpbGVuYW1lID0gbWF0dGVySW50ZXJwb2xhdGUoZmlsZW5hbWVQYXR0ZXJuLCBkYXRhLCBzbHVnKVxuXG4gIGlmIChpc1Blcm1hbGluayhmaWxlbmFtZSkpIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBmaWxlRXh0ZW5zaW9uKHRwbEZpbGVuYW1lLCAxKVxuICAgIGZpbGVuYW1lICs9IGAvJHtJTkRFWF9GSUxFfS4ke2V4dGVuc2lvbn1gXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZmlsZUV4dGVuc2lvbih0cGxGaWxlbmFtZSwgMilcbiAgICBmaWxlbmFtZSArPSBgLiR7ZXh0ZW5zaW9ufWBcbiAgfVxuXG4gIHJldHVybiBmaWxlbmFtZVxufVxuXG5mdW5jdGlvbiBpc1Blcm1hbGluayAoZmlsZW5hbWUpIHtcbiAgcmV0dXJuIGZpbGVuYW1lLnN1YnN0cigtMSkgPT09ICcvJ1xufVxuXG5mdW5jdGlvbiBmaWxlRXh0ZW5zaW9uIChmaWxlbmFtZSwgZXh0ZW5zaW9uc0NvdW50KSB7XG4gIHJldHVybiBmaWxlbmFtZVxuICAgIC5zcGxpdCgnLicsIDMpXG4gICAgLnNwbGljZSgtMSAqIGV4dGVuc2lvbnNDb3VudClcbiAgICAuam9pbignLicpXG59XG4iXX0=