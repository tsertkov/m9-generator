"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runGulp = runGulp;
exports.registry = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Registry object instance
const registry = {};
exports.registry = registry;

function runGulp(cwd) {
  // Gulp automatically changes working directory to the one containing gulpfile.js
  // To correctly resolve site source directory relative to current working directory
  // it is necessary to know what was initial working directory.
  //
  // Given cwd is stored in registry object for accing it under gulp environment.
  registry.cwd = cwd; // Define early dev mode as it is required before loading dynamic configuration

  registry.isDevTask = process.argv.includes('dev');

  const gulpfile = _path.default.join(__dirname, 'gulpfile.js');

  process.argv.push(`--gulpfile=${gulpfile}`);

  require('gulp/bin/gulp');
}