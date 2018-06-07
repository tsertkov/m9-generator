import path from 'path'
import gulp from 'gulp'
import config from '../config'

function clearRequireCaches (callback) {
  Object.keys(require.cache)
    .filter(modulePath => (
      modulePath.includes(config.paths.srcContent) ||
      modulePath.includes(config.inplace.engineOptions.helpers)
    ))
    .forEach(modulePath => {
      delete require.cache[modulePath]
    })

  callback()
}

gulp.task('dev-watch', () => {
  gulp.watch(config.copy.src, gulp.parallel('build-copy'))
  gulp.watch([
    path.join(config.contentDir.directory, '**/*'),
    path.join(config.pages.directory, '**/*'),
    path.join(config.layouts.directory, '**/*'),
    path.join(config.layouts.partials, '**/*'),
    path.join(config.helpers.directory, '**/*.js')
  ], gulp.series(
    clearRequireCaches,
    'build-metalsmith'
  ))
})
