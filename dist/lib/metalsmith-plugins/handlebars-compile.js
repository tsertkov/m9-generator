"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = require("fs");

var _requireDir = _interopRequireDefault(require("require-dir"));

var _readDirFiles = _interopRequireDefault(require("../read-dir-files"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileMetaKey = 'handlebarsCompiledTpl';

function _default({
  partials,
  helpers
}) {
  return function handlebarsCompile(files, metalsmith, done) {
    registerHelpersDir(helpers);
    registerPartialsDir(partials);
    Object.keys(files).forEach(file => {
      if (file.substr(-4) !== '.hbs') return;
      const fileMeta = files[file];
      const template = fileMeta.contents.toString('utf8');

      const compiled = _handlebars.default.compile(template);

      fileMeta[fileMetaKey] = compiled;
      const newFile = file.substring(0, file.length - 4);
      files[newFile] = fileMeta;
      delete files[file];
    });
    done();
  };
}

function registerHelpersDir(dir) {
  if (Array.isArray(dir)) {
    dir.forEach(registerHelpersDir);
    return;
  }

  if (!(0, _fs.existsSync)(dir)) return;
  const helpers = (0, _requireDir.default)(dir);
  Object.keys(helpers).forEach(helper => {
    _handlebars.default.registerHelper(helper, helpers[helper]);
  });
}

function registerPartialsDir(dir) {
  if (Array.isArray(dir)) {
    dir.forEach(registerPartialsDir);
    return;
  }

  if (!(0, _fs.existsSync)(dir)) return;
  const partials = (0, _readDirFiles.default)(dir);
  Object.keys(partials).forEach(partial => {
    _handlebars.default.registerPartial(partial, partials[partial]);
  });
}