import path from 'path'
import gulp from 'gulp'
import requireDir from 'require-dir'

export default function loadTasks (src, configObj) {
  const tasks = requireDir(path.join(src, 'tasks'))
  Object.keys(tasks).forEach(task => gulp.task(task, async () => {
    tasks[task](configObj)
  }))
}
