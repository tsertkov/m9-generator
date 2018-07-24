import path from 'path'
import gulp from 'gulp'
import { existsSync } from 'fs'
import requireDir from 'require-dir'

export default function loadTasks (src, configObj) {
  const tasksPath = path.join(src, 'tasks')
  if (!existsSync(tasksPath)) return
  const tasks = requireDir(tasksPath)
  Object.keys(tasks).forEach(task => gulp.task(task, async () => {
    tasks[task](configObj)
  }))
}
