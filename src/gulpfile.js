import gulp from 'gulp'
import path from 'path'
import requireDir from 'require-dir'

requireDir(path.join(__dirname, '/tasks'))

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

gulp.task('deploy', gulp.series(
  'build'
))

gulp.task('test', gulp.series(
  'test-standard'
))

gulp.task('default', gulp.series(
  'help'
))
