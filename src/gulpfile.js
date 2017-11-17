import gulp from 'gulp'
import path from 'path'
import requireDir from 'require-dir'
import runSequence from 'run-sequence'

requireDir(path.join(__dirname, '/tasks'))

gulp.task('default', ['help'])
gulp.task('deploy', ['build', 'deploy-aws'])

gulp.task('build', (callback) => {
  runSequence(
    'build-clean',
    ['build-copy', 'build-webpack'],
    'build-metalsmith',
    'build-htmlmin',
    callback
  )
})

gulp.task('dev', (callback) => {
  runSequence(
    'build-clean',
    ['build-copy', 'dev-webpack'],
    'build-metalsmith',
    'dev-browsersync',
    'dev-watch',
    callback
  )
})

gulp.task('test', (callback) => {
  runSequence(
    'test-standard',
    callback
  )
})
