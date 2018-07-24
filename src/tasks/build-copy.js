import gulp from 'gulp'
import config from '../config'

gulp.task('build-copy', () => {
  return gulp
    .src(`${config.templates.publicPath}/**/*`)
    .pipe(gulp.dest(config.templates.destinationPath))
})
