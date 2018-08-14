import gulp from 'gulp'
import log from 'fancy-log'
import execSh from 'exec-sh'
import util from 'util'
import config from '../config'

const exec = util.promisify(execSh)

gulp.task('publish-aws', async () => {
  const deployConfig = config.deploy
  if (
    !deployConfig ||
    !deployConfig.src ||
    !deployConfig.s3Bucket
  ) {
    log.warn('No valid deploy config given')
    return
  }

  const s3Log = await exec([
    'aws s3 sync',
    `"${deployConfig.src}"`,
    `"s3://${deployConfig.s3Bucket}"`,
    deployConfig.sizeOnlyCompare ? '--size-only' : '',
    '--delete',
    '--acl public-read',
    '--no-progress'
  ].join(' '), {
    cwd: deployConfig.src,
    stdio: null
  })

  if (s3Log) {
    const logLines = s3Log.trim().split('\n')
    const numFiles = logLines.length
    log(`Files were updated and deployed: ${numFiles} file(s)`)
  } else {
    log('No files were updated - nothing to deploy')
    return
  }

  if (!deployConfig.cfId) return

  await exec([
    'aws cloudfront create-invalidation',
    `--distribution-id "${deployConfig.cfId}"`,
    '--paths "/*"'
  ].join(' '), true)

  log('CloudFront invalidation created')
})
