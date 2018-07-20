import path from 'path'
import gulp from 'gulp'
import browserSync from 'browser-sync'
import config from '../config'

function clearRequireCaches (done) {
  Object.keys(require.cache)
    .filter(modulePath => (
      modulePath.includes(config.paths.srcContent) ||
      modulePath.includes(config.inplace.engineOptions.helpers)
    ))
    .forEach(modulePath => {
      delete require.cache[modulePath]
    })

  done()
}

function reloadBrowsers (done) {
  browserSync.reload('*.html')
  done()
}

gulp.task('dev-watch', () => {
  gulp.watch(config.copy.src, gulp.parallel('build-copy'))
  gulp.watch([
    path.join(config.paths.srcContent, '**/*'),
    path.join(config.paths.srcPages, '**/*'),
    path.join(config.paths.srcHelpers, '**/*'),
    path.join(config.paths.srcPartials, '**/*.js')
  ], gulp.series(
    clearRequireCaches,
    'build-metalsmith',
    reloadBrowsers
  ))
})
