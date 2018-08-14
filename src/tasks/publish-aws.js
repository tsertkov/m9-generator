import gulp from 'gulp'
import log from 'fancy-log'
import execSh from 'exec-sh'
import config from '../config'

// const exec = util.promisify(execSh)
const exec = (command, options) => {
  return new Promise((resolve, reject) => {
    const childProcess = execSh(command, options, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout
        error.stderr = stderr
        error.childProcess = childProcess
        reject(error)
      } else {
        resolve({ stdout, stderr, childProcess })
      }
    })
  })
}

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

  let s3Result
  try {
    s3Result = await exec([
      '/usr/bin/aws s3 sync',
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
  } catch (error) {
    log.error(error.stderr)
    throw error
  }

  const s3Out = s3Result.stdout.trim()
  if (s3Out) {
    const logLines = s3Out.split('\n')
    const numFiles = logLines.length
    log(`Files were updated and deployed: ${numFiles} file(s)`)
  } else {
    log('No files were updated - nothing to deploy')
    return
  }

  if (!deployConfig.cfId) return

  try {
    await exec([
      '/usr/bin/aws cloudfront create-invalidation',
      `--distribution-id "${deployConfig.cfId}"`,
      '--paths "/*"'
    ].join(' '), true)
  } catch (error) {
    log.error(error.stderr)
    throw error
  }

  log('CloudFront invalidation created')
})
