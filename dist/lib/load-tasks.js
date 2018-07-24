"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadTasks;

var _path = _interopRequireDefault(require("path"));

var _gulp = _interopRequireDefault(require("gulp"));

var _requireDir = _interopRequireDefault(require("require-dir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadTasks(src, configObj) {
  const tasks = (0, _requireDir.default)(_path.default.join(src, 'tasks'));
  Object.keys(tasks).forEach(task => _gulp.default.task(task, async () => {
    tasks[task](configObj);
  }));
}