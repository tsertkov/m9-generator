import gulp from 'gulp'
import path from 'path'
import requireDir from 'require-dir'
import log from 'fancy-log'

requireDir(path.join(__dirname, '/tasks'))

gulp.on('error', (error) => {
  log.error(error.name, error.message)
})

gulp.task('build', gulp.series(
  'build-clean',
  'build-copy',
  'build-webpack',
  'build-metalsmith'
))

gulp.task('dev', gulp.series(
  'build-clean',
  'build-copy',
  'dev-browsersync',
  'build-metalsmith',
  'dev-watch'
))

gulp.task('test', gulp.series(
  'test-standard'
))

gulp.task('deploy', gulp.series(
  'build',
  'publish-aws'
))

gulp.task('default', gulp.series(
  'help'
))
