"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _requireDir = _interopRequireDefault(require("require-dir"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(dirPath) {
  return function jsDirPlugin(content, next) {
    if (!(0, _fs.existsSync)(dirPath)) return next();
    const modifiers = (0, _requireDir.default)(dirPath);
    applyModifiers(modifiers, content);
    next();
  };
}

function applyModifiers(modifiers, content) {
  Object.keys(modifiers).forEach(contentType => {
    const modifierFn = modifiers[contentType];
    const entities = content[contentType];
    const config = content.__config;
    let updatedContent;

    if (!entities) {
      updatedContent = modifierFn({}, content, config);
    } else if (!Array.isArray(entities)) {
      updatedContent = modifierFn(entities, content, config);
    } else {
      updatedContent = entities.reduce((acc, currEntity) => {
        const entity = modifierFn(currEntity, content, config);

        if (typeof entity !== 'undefined') {
          acc.push(entity);
        }

        return acc;
      }, []);
    }

    if (typeof updatedContent === 'undefined') {
      delete content[contentType];
    } else {
      content[contentType] = updatedContent;
    }
  });
}