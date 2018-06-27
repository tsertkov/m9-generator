"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('help', async () => {
  const {
    tasks,
    subTasks
  } = _gulp.default.tree({
    deep: true
  }).nodes.reduce((acc, {
    label,
    nodes
  }) => {
    if (label !== 'default') {
      acc[nodes.length ? 'tasks' : 'subTasks'].push(label);
    }

    return acc;
  }, {
    tasks: [],
    subTasks: []
  });

  console.log(['Usage: m9 <task>', `\nAvailable tasks:\n  ${tasks.join('\n  ')}`, `\nAvailable sub-tasks:\n  ${subTasks.join('\n  ')}`].join('\n'));
});