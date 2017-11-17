'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = normalize;


function normalize(content) {
  Object.keys(content).forEach(function (contentType) {
    var entities = content[contentType];
    if (Array.isArray(entities)) {
      entities.forEach(function (entity) {
        removeCruft(entity);
        normalizeTitle(entity);
        normalizeAcf(entity);
      });
    } else {
      removeCruft(entities);
      normalizeTitle(entities);
      normalizeAcf(entities);
    }
  });
  return content;
}

function removeCruft(entity) {
  delete entity._links;
  delete entity.link;
  delete entity.modified_gmt;
  delete entity.date_gmt;
  delete entity.guid;
}

function normalizeTitle(entity) {
  if (_typeof(entity.title) !== 'object') return;
  entity.title = entity.title.rendered;
  delete entity.title.rendered;
}

function normalizeAcf(entity) {
  if ('acf' in entity) {
    Object.keys(entity.acf).forEach(function (acfPropertyName) {
      if (acfPropertyName === '') return;
      entity[acfPropertyName] = entity.acf[acfPropertyName];
    });
    delete entity.acf;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29udGVudC10cmFuc2Zvcm1lcnMvd29yZHByZXNzL25vcm1hbGl6ZS5qcyJdLCJuYW1lcyI6WyJub3JtYWxpemUiLCJjb250ZW50IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJlbnRpdGllcyIsImNvbnRlbnRUeXBlIiwiQXJyYXkiLCJpc0FycmF5IiwicmVtb3ZlQ3J1ZnQiLCJlbnRpdHkiLCJub3JtYWxpemVUaXRsZSIsIm5vcm1hbGl6ZUFjZiIsIl9saW5rcyIsImxpbmsiLCJtb2RpZmllZF9nbXQiLCJkYXRlX2dtdCIsImd1aWQiLCJ0aXRsZSIsInJlbmRlcmVkIiwiYWNmIiwiYWNmUHJvcGVydHlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFBZUEsUzs7O0FBRWYsU0FBU0EsU0FBVCxDQUFvQkMsT0FBcEIsRUFBNkI7QUFDM0JDLFNBQU9DLElBQVAsQ0FBWUYsT0FBWixFQUFxQkcsT0FBckIsQ0FBNkIsdUJBQWU7QUFDMUMsUUFBTUMsV0FBV0osUUFBUUssV0FBUixDQUFqQjtBQUNBLFFBQUlDLE1BQU1DLE9BQU4sQ0FBY0gsUUFBZCxDQUFKLEVBQTZCO0FBQzNCQSxlQUFTRCxPQUFULENBQWlCLGtCQUFVO0FBQ3pCSyxvQkFBWUMsTUFBWjtBQUNBQyx1QkFBZUQsTUFBZjtBQUNBRSxxQkFBYUYsTUFBYjtBQUNELE9BSkQ7QUFLRCxLQU5ELE1BTU87QUFDTEQsa0JBQVlKLFFBQVo7QUFDQU0scUJBQWVOLFFBQWY7QUFDQU8sbUJBQWFQLFFBQWI7QUFDRDtBQUNGLEdBYkQ7QUFjQSxTQUFPSixPQUFQO0FBQ0Q7O0FBRUQsU0FBU1EsV0FBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDNUIsU0FBT0EsT0FBT0csTUFBZDtBQUNBLFNBQU9ILE9BQU9JLElBQWQ7QUFDQSxTQUFPSixPQUFPSyxZQUFkO0FBQ0EsU0FBT0wsT0FBT00sUUFBZDtBQUNBLFNBQU9OLE9BQU9PLElBQWQ7QUFDRDs7QUFFRCxTQUFTTixjQUFULENBQXlCRCxNQUF6QixFQUFpQztBQUMvQixNQUFJLFFBQU9BLE9BQU9RLEtBQWQsTUFBd0IsUUFBNUIsRUFBc0M7QUFDdENSLFNBQU9RLEtBQVAsR0FBZVIsT0FBT1EsS0FBUCxDQUFhQyxRQUE1QjtBQUNBLFNBQU9ULE9BQU9RLEtBQVAsQ0FBYUMsUUFBcEI7QUFDRDs7QUFFRCxTQUFTUCxZQUFULENBQXVCRixNQUF2QixFQUErQjtBQUM3QixNQUFJLFNBQVNBLE1BQWIsRUFBcUI7QUFDbkJSLFdBQU9DLElBQVAsQ0FBWU8sT0FBT1UsR0FBbkIsRUFBd0JoQixPQUF4QixDQUFnQywyQkFBbUI7QUFDakQsVUFBSWlCLG9CQUFvQixFQUF4QixFQUE0QjtBQUM1QlgsYUFBT1csZUFBUCxJQUEwQlgsT0FBT1UsR0FBUCxDQUFXQyxlQUFYLENBQTFCO0FBQ0QsS0FIRDtBQUlBLFdBQU9YLE9BQU9VLEdBQWQ7QUFDRDtBQUNGIiwiZmlsZSI6Im5vcm1hbGl6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IG5vcm1hbGl6ZVxuXG5mdW5jdGlvbiBub3JtYWxpemUgKGNvbnRlbnQpIHtcbiAgT2JqZWN0LmtleXMoY29udGVudCkuZm9yRWFjaChjb250ZW50VHlwZSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXMgPSBjb250ZW50W2NvbnRlbnRUeXBlXVxuICAgIGlmIChBcnJheS5pc0FycmF5KGVudGl0aWVzKSkge1xuICAgICAgZW50aXRpZXMuZm9yRWFjaChlbnRpdHkgPT4ge1xuICAgICAgICByZW1vdmVDcnVmdChlbnRpdHkpXG4gICAgICAgIG5vcm1hbGl6ZVRpdGxlKGVudGl0eSlcbiAgICAgICAgbm9ybWFsaXplQWNmKGVudGl0eSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZUNydWZ0KGVudGl0aWVzKVxuICAgICAgbm9ybWFsaXplVGl0bGUoZW50aXRpZXMpXG4gICAgICBub3JtYWxpemVBY2YoZW50aXRpZXMpXG4gICAgfVxuICB9KVxuICByZXR1cm4gY29udGVudFxufVxuXG5mdW5jdGlvbiByZW1vdmVDcnVmdCAoZW50aXR5KSB7XG4gIGRlbGV0ZSBlbnRpdHkuX2xpbmtzXG4gIGRlbGV0ZSBlbnRpdHkubGlua1xuICBkZWxldGUgZW50aXR5Lm1vZGlmaWVkX2dtdFxuICBkZWxldGUgZW50aXR5LmRhdGVfZ210XG4gIGRlbGV0ZSBlbnRpdHkuZ3VpZFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVUaXRsZSAoZW50aXR5KSB7XG4gIGlmICh0eXBlb2YgZW50aXR5LnRpdGxlICE9PSAnb2JqZWN0JykgcmV0dXJuXG4gIGVudGl0eS50aXRsZSA9IGVudGl0eS50aXRsZS5yZW5kZXJlZFxuICBkZWxldGUgZW50aXR5LnRpdGxlLnJlbmRlcmVkXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFjZiAoZW50aXR5KSB7XG4gIGlmICgnYWNmJyBpbiBlbnRpdHkpIHtcbiAgICBPYmplY3Qua2V5cyhlbnRpdHkuYWNmKS5mb3JFYWNoKGFjZlByb3BlcnR5TmFtZSA9PiB7XG4gICAgICBpZiAoYWNmUHJvcGVydHlOYW1lID09PSAnJykgcmV0dXJuXG4gICAgICBlbnRpdHlbYWNmUHJvcGVydHlOYW1lXSA9IGVudGl0eS5hY2ZbYWNmUHJvcGVydHlOYW1lXVxuICAgIH0pXG4gICAgZGVsZXRlIGVudGl0eS5hY2ZcbiAgfVxufVxuIl19