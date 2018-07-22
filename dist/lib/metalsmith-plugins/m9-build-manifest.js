"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(manifestFile) {
  return function m9buildManifest(files, metalsmith, done) {
    files[manifestFile] = {
      contents: JSON.stringify(buildManifest(files), null, 2)
    };
    done();
  };
}

function buildManifest(files) {
  return {
    buildDate: new Date().toUTCString(),
    totalFiles: Object.keys(files).length
  };
}