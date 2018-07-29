"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileMetaKey = 'handlebarsCompiledTpl';

function _default({
  partials = {},
  helpers = {}
}) {
  return function handlebarsCompile(files, metalsmith, done) {
    Object.keys(helpers).forEach(helper => {
      _handlebars.default.registerHelper(helper, helpers[helper]);
    });
    Object.keys(partials).forEach(partial => {
      _handlebars.default.registerPartial(partial, partials[partial]);
    });
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