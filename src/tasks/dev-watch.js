import path from 'path'
import gulp from 'gulp'
import browserSync from 'browser-sync'
import config from '../config'

function clearRequireCaches (done) {
  Object.keys(require.cache)
    .filter(modulePath => (
      modulePath.includes(config.content.contentPath) ||
      modulePath.includes(config.templates.helpersPath) ||
      modulePath.includes(config.templates.embeddedHelpersPath)
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
  gulp.watch(config.templates.publicPath, gulp.parallel('build-copy'))
  gulp.watch([
    path.join(config.content.contentPath, '**/*'),
    path.join(config.templates.pagesPath, '**/*'),
    path.join(config.templates.helpersPath, '**/*'),
    path.join(config.templates.embeddedHelpersPath, '**/*'),
    path.join(config.templates.partialsPath, '**/*'),
    path.join(config.paths.src, 'config.js'),
    path.join(config.paths.src, 'config.json'),
    path.join(config.paths.src, 'config.*.json')
  ], gulp.series(
    clearRequireCaches,
    'build-metalsmith',
    reloadBrowsers
  ))
})
