"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _matterInterpolate = _interopRequireDefault(require("../matter-interpolate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = m9matterInterpolate;
exports.default = _default;
const EXCLUDE_PROPS = ['contents', 'mode'];

function m9matterInterpolate() {
  return (files, metalsmith, done) => {
    Object.keys(files).forEach(file => processFileMeta(files[file], metalsmith.metadata()));
    done();
  };
}

function processFileMeta(fileMeta, metadata) {
  Object.keys(fileMeta).forEach(propName => {
    const propValue = fileMeta[propName];
    if (EXCLUDE_PROPS.includes(propName)) return;
    if (typeof propValue !== 'string') return;
    fileMeta[propName] = (0, _matterInterpolate.default)(propValue, metadata);
  });
}