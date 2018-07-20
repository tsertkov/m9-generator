import gulp from 'gulp'
import standard from 'gulp-standard'
import config from '../config'

gulp.task('test-standard', () => {
  return gulp
    .src([
      `${config.paths.src}/**/*.js`,
      `!${config.paths.srcPublic}/**/*`
    ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})
