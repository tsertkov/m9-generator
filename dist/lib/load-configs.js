"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = loadConfigs;
exports.default = _default;

function loadConfigs(config, dir) {
  const configJs = _path.default.join(dir, 'config.js');

  if ((0, _fs.existsSync)(configJs)) {
    require(configJs)(config);
  }
}