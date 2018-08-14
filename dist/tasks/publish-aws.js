"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _s3Client = _interopRequireDefault(require("s3-client"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp.default.task('publish-aws', async () => {
  const deployConfig = _config.default.deploy;

  if (!deployConfig || !deployConfig.src || !deployConfig.region || !deployConfig.s3Bucket) {
    _fancyLog.default.warn('No valid deploy config given');

    return;
  }

  const {
    uploaded,
    deletedTotal
  } = await syncDirS3(deployConfig);

  if (uploaded.length || deletedTotal) {
    (0, _fancyLog.default)(`Uploaded: ${uploaded.length} file(s), Deleted: ${deletedTotal} file(s)`);
  } else {
    (0, _fancyLog.default)('No files were updated - nothing to deploy');
    return;
  }

  if (!deployConfig.cfId) return;
  const invalidationId = await invalidateCf(deployConfig.cfId);
  (0, _fancyLog.default)(`CloudFront invalidation created: '${invalidationId}'`);
});

function invalidateCf(cfId) {
  return new Promise((resolve, reject) => {
    const cloudFront = new _awsSdk.default.CloudFront();
    cloudFront.createInvalidation({
      DistributionId: cfId,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: 1,
          Items: ['/*']
        }
      }
    }, (error, data) => {
      error ? reject(error) : resolve(data.Invalidation.Id);
    });
  });
}

function syncDirS3(config) {
  return new Promise((resolve, reject) => {
    const s3client = _s3Client.default.createClient({
      s3Options: {
        region: config.region
      }
    });

    const uploader = s3client.uploadDir({
      localDir: config.src,
      deleteRemoved: true,
      s3Params: {
        ACL: 'public-read',
        Bucket: config.s3Bucket
      }
    });
    let uploadedFiles = [];
    uploader.on('error', reject);
    uploader.on('fileUploadEnd', (localFilePath, s3Key) => {
      const localFile = localFilePath.substr(config.src.length + 1);
      uploadedFiles.push([localFile, s3Key]);
      (0, _fancyLog.default)(`Uploaded: ${localFile} -> ${s3Key}`);
    });
    uploader.on('end', () => {
      resolve({
        uploaded: uploadedFiles,
        deletedTotal: uploader.deleteTotal
      });
    });
  });
}