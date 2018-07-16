import gulp from 'gulp'

gulp.task('help', (done) => {
  const { tasks, subTasks } = gulp
    .tree({ deep: true })
    .nodes
    .reduce((acc, { label, nodes }) => {
      if (!['default', 'help'].includes(label)) {
        acc[nodes.length ? 'tasks' : 'subTasks'].push(label)
      }
      return acc
    }, { tasks: [], subTasks: [] })

  console.log([
    'Usage: m9 <task>',
    `\nAvailable tasks:\n  ${tasks.join('\n  ')}`,
    `\nAvailable sub-tasks:\n  ${subTasks.join('\n  ')}`
  ].join('\n'))

  done()
})
