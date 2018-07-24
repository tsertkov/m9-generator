"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = permalink;
exports.default = _default;

function permalink() {
  return (files, metalsmith, done) => {
    Object.keys(files).forEach(file => {
      const fileMeta = files[file];
      const permalinkPath = fileMeta.permalink;
      if (!permalinkPath) return;
      files[permalinkPath] = fileMeta;
      delete files[file];
    });
    done();
  };
}