"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(manifestFile) {
  return function m9buildManifest(files, metalsmith, done) {
    files[manifestFile] = {
      contents: JSON.stringify(buildManifest(), null, 2)
    };
    done();
  };
}

function buildManifest() {
  return {
    buildDate: new Date().toUTCString()
  };
}