"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluginLoader;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pluginLoader(pluginMeta, localPluginDir) {
  if (typeof pluginMeta === 'string') {
    pluginMeta = {
      name: pluginMeta,
      options: {}
    };
  }

  if (typeof pluginMeta !== 'object') {
    throw new Error(`Invalid plugin type: ${typeof pluginMeta}`);
  }

  const {
    name,
    options
  } = pluginMeta;

  try {
    return require(_path.default.join(localPluginDir, name)).default(options);
  } catch (e) {}

  try {
    return require(name)(options);
  } catch (e) {}

  throw new Error(`Failed to load plugin: '${name}'`);
}