'use strict';

var _normalize = require('./normalize');

var _normalize2 = _interopRequireDefault(_normalize);

var _resolveReferences = require('./resolve-references');

var _resolveReferences2 = _interopRequireDefault(_resolveReferences);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = wordpress;

function wordpress(content) {
  (0, _normalize2.default)((0, _resolveReferences2.default)(content));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29udGVudC10cmFuc2Zvcm1lcnMvd29yZHByZXNzL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJ3b3JkcHJlc3MiLCJjb250ZW50Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCQyxTQUFqQjs7QUFFQSxTQUFTQSxTQUFULENBQW9CQyxPQUFwQixFQUE2QjtBQUMzQiwyQkFDRSxpQ0FBa0JBLE9BQWxCLENBREY7QUFHRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBub3JtYWxpemUgZnJvbSAnLi9ub3JtYWxpemUnXG5pbXBvcnQgcmVzb2x2ZVJlZmVyZW5jZXMgZnJvbSAnLi9yZXNvbHZlLXJlZmVyZW5jZXMnXG5cbm1vZHVsZS5leHBvcnRzID0gd29yZHByZXNzXG5cbmZ1bmN0aW9uIHdvcmRwcmVzcyAoY29udGVudCkge1xuICBub3JtYWxpemUoXG4gICAgcmVzb2x2ZVJlZmVyZW5jZXMoY29udGVudClcbiAgKVxufVxuIl19