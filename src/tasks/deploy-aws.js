import path from 'path'
import gulp from 'gulp'
import awspublish from 'gulp-awspublish'
import config from '../config'

gulp.task('deploy-aws', () => {
  const publisher = awspublish.create(config.awspublish)
  const headers = {}

  return gulp
    .src(path.join(config.paths.dst, '**/*'))
    .pipe(awspublish.gzip({ ext: '.gz' }))
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
})
