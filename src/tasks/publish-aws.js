import path from 'path'
import gulp from 'gulp'
import log from 'fancy-log'
import awspublish from 'gulp-awspublish'
import cloudfront from 'gulp-cloudfront-invalidate-aws-publish'
import parallelize from 'concurrent-transform'
import config from '../config'

const DEFAULT_CONCURRENCY = 10

gulp.task('publish-aws', (done) => {
  const deployConfig = config.deploy

  if (
    !deployConfig ||
    !deployConfig.src ||
    !deployConfig.region ||
    !deployConfig.s3Bucket
  ) {
    log.warn('No valid deploy config given')
    done()
    return
  }

  const publisher = awspublish.create({
    region: deployConfig.region,
    params: {
      Bucket: deployConfig.s3Bucket
    }
  }, {
    cacheFileName: path.join(
      deployConfig.cacheDir
        ? deployConfig.cacheDir
        : deployConfig.src,
      `.awspublish-${deployConfig.s3Bucket}`
    )
  })

  let stream = gulp
    .src(path.join(deployConfig.src, '**/*'))
    .pipe(parallelize(
      publisher.publish(),
      deployConfig.concurrency || DEFAULT_CONCURRENCY
    ))
    .pipe(publisher.sync())

  if (deployConfig.cfId) {
    stream = stream.pipe(cloudfront({
      distribution: deployConfig.cfId
    }))
  }

  stream = stream
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())

  return stream
})
