"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _requireDir = _interopRequireDefault(require("require-dir"));

var _fs = require("fs");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = loadContent;
exports.default = _default;

function loadContent(options) {
  const {
    directory,
    transformer
  } = options;

  const staticDir = _path.default.join(directory, 'static');

  const dynamicDir = _path.default.join(directory, 'dynamic');

  const content = loadJsonContent(staticDir);
  if (transformer) transformContent(content, transformer);
  runAugmentersFromDir(dynamicDir, content);
  return content;
}

function loadJsonContent(dir) {
  if ((0, _fs.existsSync)(dir)) {
    return (0, _requireDir.default)(dir);
  }

  return {};
}

function runAugmentersFromDir(dir, content) {
  if (!(0, _fs.existsSync)(dir)) {
    return;
  }

  const augmenters = (0, _requireDir.default)(dir);
  Object.keys(augmenters).forEach(contentType => {
    const augment = augmenters[contentType];
    const entities = content[contentType];

    if (!entities) {
      content[contentType] = augment({}, content, _config.default);
      return;
    }

    if (!Array.isArray(entities)) {
      content[contentType] = augment(entities, content, _config.default);
      return;
    }

    content[contentType] = entities.map(entity => augment(entity, content, _config.default));
  });
}

function transformContent(content, transformerName) {
  const transformerFn = transformerByName(transformerName);
  transformerFn(content);
}

function transformerByName(transformerName) {
  try {
    return require(`./content-transformers/${transformerName}`);
  } catch (error) {
    throw new Error(`Unsupported transformer "${transformerName}"`);
  }
}