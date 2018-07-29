"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
const fileMetaKey = 'handlebarsCompiledTpl';

function _default() {
  return function handlebarsExecute(files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    Object.keys(files).forEach(file => {
      const fileMeta = files[file];
      const compiledTpl = fileMeta[fileMetaKey];
      if (!compiledTpl) return;
      fileMeta.contents = compiledTpl({ ...metadata,
        ...fileMeta
      });
    });
    done();
  };
}