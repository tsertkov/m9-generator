"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

function _default() {
  return function pathPlugin(files, metalsmith, done) {
    Object.keys(files).forEach(fileName => {
      const fileMeta = files[fileName];
      const {
        path
      } = fileMeta;
      if (!path) return;
      const filePath = buildFilePath(path, fileName);
      files[filePath] = fileMeta;
      delete files[fileName];
    });
    done();
  };
}

function buildFilePath(path, tplPath) {
  let newPath = path.replace(/\/+/, '/');
  const tplDir = (0, _path.dirname)(tplPath);

  if (newPath[0] === '/') {
    newPath = newPath.substr(1);
  } else if (tplDir !== '.') {
    newPath = (0, _path.join)(tplDir, newPath);
  }

  if (newPath.substr(-1) === '/') {
    newPath += 'index.html';
  }

  return newPath;
}