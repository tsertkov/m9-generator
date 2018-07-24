"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadTasks;

var _path = _interopRequireDefault(require("path"));

var _gulp = _interopRequireDefault(require("gulp"));

var _fs = require("fs");

var _requireDir = _interopRequireDefault(require("require-dir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadTasks(src, configObj) {
  const tasksPath = _path.default.join(src, 'tasks');

  if (!(0, _fs.existsSync)(tasksPath)) return;
  const tasks = (0, _requireDir.default)(tasksPath);
  Object.keys(tasks).forEach(task => _gulp.default.task(task, async () => {
    tasks[task](configObj);
  }));
}