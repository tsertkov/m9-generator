"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _execSh = _interopRequireDefault(require("exec-sh"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const exec = util.promisify(execSh)
const exec = (command, options) => {
  return new Promise((resolve, reject) => {
    const childProcess = (0, _execSh.default)(command, options, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        error.childProcess = childProcess;
        reject(error);
      } else {
        resolve({
          stdout,
          stderr,
          childProcess
        });
      }
    });
  });
};

_gulp.default.task('publish-aws', async () => {
  const deployConfig = _config.default.deploy;

  if (!deployConfig || !deployConfig.src || !deployConfig.s3Bucket) {
    _fancyLog.default.warn('No valid deploy config given');

    return;
  }

  let s3Result;

  try {
    s3Result = await exec(['/usr/bin/aws s3 sync', `"${deployConfig.src}"`, `"s3://${deployConfig.s3Bucket}"`, deployConfig.sizeOnlyCompare ? '--size-only' : '', '--delete', '--acl public-read', '--no-progress'].join(' '), {
      cwd: deployConfig.src,
      stdio: null
    });
  } catch (error) {
    _fancyLog.default.error(error.stderr);

    throw error;
  }

  const s3Out = s3Result.stdout.trim();

  if (s3Out) {
    const logLines = s3Out.split('\n');
    const numFiles = logLines.length;
    (0, _fancyLog.default)(`Files were updated and deployed: ${numFiles} file(s)`);
  } else {
    (0, _fancyLog.default)('No files were updated - nothing to deploy');
    return;
  }

  if (!deployConfig.cfId) return;

  try {
    await exec(['/usr/bin/aws cloudfront create-invalidation', `--distribution-id "${deployConfig.cfId}"`, '--paths "/*"'].join(' '), true);
  } catch (error) {
    _fancyLog.default.error(error.stderr);

    throw error;
  }

  (0, _fancyLog.default)('CloudFront invalidation created');
});