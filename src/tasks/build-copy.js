import gulp from 'gulp'
import config from '../config'

gulp.task('build-copy', () => {
  return gulp
    .src(config.copy.src, {})
    .pipe(gulp.dest(config.paths.dst))
})
