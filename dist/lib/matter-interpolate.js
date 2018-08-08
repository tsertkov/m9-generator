"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = matterInterpolate;
exports.default = _default;
const VARIABLE_PATTERN = '{{\\s*([^}]+)\\s*}}';
const VARIABLE_REGEXP = new RegExp(VARIABLE_PATTERN, 'g');
const SINGLE_VARIABLE_REGEXP = new RegExp(`^${VARIABLE_PATTERN}$`);

function matterInterpolate(input, metadata) {
  let result = input.match(SINGLE_VARIABLE_REGEXP);

  if (result) {
    const variable = result[1];
    return resolve(variable, metadata);
  }

  return input.replace(VARIABLE_REGEXP, (match, variable) => resolve(variable, metadata));
}

function resolvePath(path, object) {
  const value = (0, _lodash.get)(object, path);

  if (value === undefined) {
    throw new Error('Cannot resolve data path: ' + JSON.stringify({
      path,
      object
    }, null, 2));
  }

  return value;
}

function resolve(path, object) {
  const parts = path.split(/\s+/).filter(v => v !== '');
  if (parts.length === 1) return resolvePath(parts[0], object);
  const [helperName, ...params] = parts;
  const resolvedParams = params.map(param => resolvePath(param, object));
  const helper = _handlebars.default.helpers[helperName];
  return helper(...resolvedParams);
}