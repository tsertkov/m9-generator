"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = loadConfigs;
exports.default = _default;

function loadConfigs(src, configObj) {
  loadConfigJson(src, configObj);
  loadConfigJs(src, configObj);
}

function loadConfigJson(src, configObj) {
  ['config.json', `config.${configObj.stage}.json`].forEach(configFile => {
    const configJson = _path.default.join(src, configFile);

    if ((0, _fs.existsSync)(configJson)) {
      const loadedConfigObj = require(configJson);

      (0, _lodash.merge)(configObj, loadedConfigObj);
    }
  });
}

function loadConfigJs(src, configObj) {
  const configJs = _path.default.join(src, 'config.js');

  if ((0, _fs.existsSync)(configJs)) {
    require(configJs)(configObj);
  }
}