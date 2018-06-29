import gulp from 'gulp'
import config from '../config'

gulp.task('build-copy', () => (
  gulp
    .src(config.copy.src, {})
    .pipe(gulp.dest(config.paths.dst))
))
