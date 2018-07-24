"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _requireDir = _interopRequireDefault(require("require-dir"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(dirPath) {
  return function loaderJsDir(content, next) {
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

    if (!entities) {
      content[contentType] = modifierFn({}, content, config);
      return;
    }

    if (!Array.isArray(entities)) {
      content[contentType] = modifierFn(entities, content, config);
      return;
    }

    content[contentType] = entities.map(entity => modifierFn(entity, content, config));
  });
}