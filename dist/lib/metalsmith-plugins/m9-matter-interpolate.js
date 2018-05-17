'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matterInterpolate = require('../matter-interpolate');

var _matterInterpolate2 = _interopRequireDefault(_matterInterpolate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = m9matterInterpolate;


const EXCLUDE_PROPS = ['contents', 'mode'];

function m9matterInterpolate() {
  return (files, metalsmith, done) => {
    Object.keys(files).forEach(file => processFileMeta(files[file], metalsmith.metadata()));
    done();
  };
}

function processFileMeta(fileMeta, metadata) {
  Object.keys(fileMeta).forEach(propName => {
    const propValue = fileMeta[propName];
    if (EXCLUDE_PROPS.includes(propName)) return;
    if (typeof propValue !== 'string') return;
    fileMeta[propName] = (0, _matterInterpolate2.default)(propValue, metadata);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1hdHRlci1pbnRlcnBvbGF0ZS5qcyJdLCJuYW1lcyI6WyJtOW1hdHRlckludGVycG9sYXRlIiwiRVhDTFVERV9QUk9QUyIsImZpbGVzIiwibWV0YWxzbWl0aCIsImRvbmUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImZpbGUiLCJwcm9jZXNzRmlsZU1ldGEiLCJtZXRhZGF0YSIsImZpbGVNZXRhIiwicHJvcE5hbWUiLCJwcm9wVmFsdWUiLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztrQkFDZUEsbUI7OztBQUVmLE1BQU1DLGdCQUFnQixDQUNwQixVQURvQixFQUVwQixNQUZvQixDQUF0Qjs7QUFLQSxTQUFTRCxtQkFBVCxHQUFnQztBQUM5QixTQUFPLENBQUNFLEtBQUQsRUFBUUMsVUFBUixFQUFvQkMsSUFBcEIsS0FBNkI7QUFDbENDLFdBQU9DLElBQVAsQ0FBWUosS0FBWixFQUFtQkssT0FBbkIsQ0FBMkJDLFFBQ3pCQyxnQkFBZ0JQLE1BQU1NLElBQU4sQ0FBaEIsRUFBNkJMLFdBQVdPLFFBQVgsRUFBN0IsQ0FERjtBQUdBTjtBQUNELEdBTEQ7QUFNRDs7QUFFRCxTQUFTSyxlQUFULENBQTBCRSxRQUExQixFQUFvQ0QsUUFBcEMsRUFBOEM7QUFDNUNMLFNBQU9DLElBQVAsQ0FBWUssUUFBWixFQUFzQkosT0FBdEIsQ0FBOEJLLFlBQVk7QUFDeEMsVUFBTUMsWUFBWUYsU0FBU0MsUUFBVCxDQUFsQjtBQUNBLFFBQUlYLGNBQWNhLFFBQWQsQ0FBdUJGLFFBQXZCLENBQUosRUFBc0M7QUFDdEMsUUFBSSxPQUFPQyxTQUFQLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ25DRixhQUFTQyxRQUFULElBQXFCLGlDQUFrQkMsU0FBbEIsRUFBNkJILFFBQTdCLENBQXJCO0FBQ0QsR0FMRDtBQU1EIiwiZmlsZSI6Im05LW1hdHRlci1pbnRlcnBvbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtYXR0ZXJJbnRlcnBvbGF0ZSBmcm9tICcuLi9tYXR0ZXItaW50ZXJwb2xhdGUnXG5leHBvcnQgZGVmYXVsdCBtOW1hdHRlckludGVycG9sYXRlXG5cbmNvbnN0IEVYQ0xVREVfUFJPUFMgPSBbXG4gICdjb250ZW50cycsXG4gICdtb2RlJ1xuXVxuXG5mdW5jdGlvbiBtOW1hdHRlckludGVycG9sYXRlICgpIHtcbiAgcmV0dXJuIChmaWxlcywgbWV0YWxzbWl0aCwgZG9uZSkgPT4ge1xuICAgIE9iamVjdC5rZXlzKGZpbGVzKS5mb3JFYWNoKGZpbGUgPT4gKFxuICAgICAgcHJvY2Vzc0ZpbGVNZXRhKGZpbGVzW2ZpbGVdLCBtZXRhbHNtaXRoLm1ldGFkYXRhKCkpXG4gICAgKSlcbiAgICBkb25lKClcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzRmlsZU1ldGEgKGZpbGVNZXRhLCBtZXRhZGF0YSkge1xuICBPYmplY3Qua2V5cyhmaWxlTWV0YSkuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgY29uc3QgcHJvcFZhbHVlID0gZmlsZU1ldGFbcHJvcE5hbWVdXG4gICAgaWYgKEVYQ0xVREVfUFJPUFMuaW5jbHVkZXMocHJvcE5hbWUpKSByZXR1cm5cbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycpIHJldHVyblxuICAgIGZpbGVNZXRhW3Byb3BOYW1lXSA9IG1hdHRlckludGVycG9sYXRlKHByb3BWYWx1ZSwgbWV0YWRhdGEpXG4gIH0pXG59XG4iXX0=