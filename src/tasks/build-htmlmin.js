import gulp from 'gulp'
import debug from 'gulp-debug'
import gulpif from 'gulp-if'
import htmlmin from 'gulp-htmlmin'
import config from '../config'

gulp.task('build-htmlmin', () => (
  gulp
    .src(config.htmlmin.src)
    .pipe(gulpif(config.isGulpDebug, debug({ title: 'HTML Minified:' })))
    .pipe(gulpif(config.isProduction, htmlmin(config.htmlmin.options)))
    .pipe(gulp.dest(config.paths.dst))
))
