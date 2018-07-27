"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return function assetsManifestPlugin(content, next) {
    const config = content.__config;

    const assetsManifestFile = _path.default.join(config.assets.destinationPath, config.assets.manifestFile);

    if ((0, _fs.existsSync)(assetsManifestFile)) {
      content.__assets = require(assetsManifestFile);
    }

    next();
  };
}