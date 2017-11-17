import gulp from 'gulp'
import debug from 'gulp-debug'
import gulpif from 'gulp-if'
import config from '../config'

gulp.task('build-copy', () => (
  gulp
    .src(config.copy.src, {})
    .pipe(gulpif(config.isGulpDebug, debug({ title: 'Files copied:' })))
    .pipe(gulp.dest(config.paths.dst))
))
