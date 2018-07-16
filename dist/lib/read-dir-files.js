"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = readDirFiles;
exports.default = _default;

function readDirFiles(dir) {
  if (!_fs.default.existsSync(dir)) {
    return {};
  }

  return _fs.default.readdirSync(dir).reduce((partials, filename) => {
    const partialName = _path.default.parse(filename)['name'];

    const filePath = _path.default.join(dir, filename);

    partials[partialName] = _fs.default.readFileSync(filePath, {
      encoding: 'utf8'
    });
    return partials;
  }, {});
}