import gulp from 'gulp'
import del from 'del'
import config from '../config'

const { dst } = config.paths

gulp.task('build-clean', () => (
  del([dst], { force: true })
))
