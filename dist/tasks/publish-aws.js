"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _execSh = _interopRequireDefault(require("exec-sh"));

var _util = _interopRequireDefault(require("util"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exec = _util.default.promisify(_execSh.default);

_gulp.default.task('publish-aws', async () => {
  const deployConfig = _config.default.deploy;

  if (!deployConfig || !deployConfig.src || !deployConfig.s3Bucket) {
    _fancyLog.default.warn('No valid deploy config given');

    return;
  }

  const s3Log = await exec(['aws s3 sync', `"${deployConfig.src}"`, `"s3://${deployConfig.s3Bucket}"`, deployConfig.sizeOnlyCompare ? '--size-only' : '', '--delete', '--acl public-read', '--no-progress'].join(' '), {
    cwd: deployConfig.src,
    stdio: null
  });

  if (s3Log) {
    const logLines = s3Log.trim().split('\n');
    const numFiles = logLines.length;
    (0, _fancyLog.default)(`Files were updated and deployed: ${numFiles} file(s)`);
  } else {
    (0, _fancyLog.default)('No files were updated - nothing to deploy');
    return;
  }

  if (!deployConfig.cfId) return;
  await exec(['aws cloudfront create-invalidation', `--distribution-id "${deployConfig.cfId}"`, '--paths "/*"'].join(' '), true);
  (0, _fancyLog.default)('CloudFront invalidation created');
});