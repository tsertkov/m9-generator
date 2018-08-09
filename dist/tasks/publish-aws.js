"use strict";

var _path = _interopRequireDefault(require("path"));

var _gulp = _interopRequireDefault(require("gulp"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _gulpAwspublish = _interopRequireDefault(require("gulp-awspublish"));

var _gulpCloudfrontInvalidateAwsPublish = _interopRequireDefault(require("gulp-cloudfront-invalidate-aws-publish"));

var _concurrentTransform = _interopRequireDefault(require("concurrent-transform"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_CONCURRENCY = 10;

_gulp.default.task('publish-aws', done => {
  const deployConfig = _config.default.deploy;

  if (!deployConfig || !deployConfig.src || !deployConfig.region || !deployConfig.s3Bucket) {
    _fancyLog.default.warn('No valid deploy config given');

    done();
    return;
  }

  const publisher = _gulpAwspublish.default.create({
    region: deployConfig.region,
    params: {
      Bucket: deployConfig.s3Bucket
    }
  }, {
    cacheFileName: _path.default.join(deployConfig.cacheDir ? deployConfig.cacheDir : deployConfig.src, `.awspublish-${deployConfig.s3Bucket}`)
  });

  let stream = _gulp.default.src(_path.default.join(deployConfig.src, '**/*')).pipe((0, _concurrentTransform.default)(publisher.publish(), deployConfig.concurrency || DEFAULT_CONCURRENCY)).pipe(publisher.sync());

  if (deployConfig.cfId) {
    stream = stream.pipe((0, _gulpCloudfrontInvalidateAwsPublish.default)({
      distribution: deployConfig.cfId
    }));
  }

  stream = stream.pipe(publisher.cache()).pipe(_gulpAwspublish.default.reporter());
  return stream;
});