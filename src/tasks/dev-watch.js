import path from 'path'
import gulp from 'gulp'
import config from '../config'

gulp.task('dev-watch', () => {
  gulp.watch(config.copy.src, ['dev-copy'])
  gulp.watch([
    path.join(config.contentDir.directory, '**/*'),
    path.join(config.pages.directory, '**/*'),
    path.join(config.layouts.directory, '**/*'),
    path.join(config.layouts.partials, '**/*'),
    path.join(config.helpers.directory, '**/*.js')
  ], ['build-metalsmith'])
})
