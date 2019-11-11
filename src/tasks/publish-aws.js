import gulp from 'gulp'
import s3 from 's3-client'
import AWS from 'aws-sdk'
import config from '../config'

gulp.task('publish-aws', async () => {
  const deployConfig = config.deploy

  if (
    !deployConfig ||
    !deployConfig.src ||
    !deployConfig.region ||
    !deployConfig.s3Bucket
  ) {
    console.log('No valid deploy config given')
    return
  }

  const { uploaded, deletedTotal } = await syncDirS3(deployConfig)
  if (uploaded.length || deletedTotal) {
    console.log(`Uploaded: ${uploaded.length} file(s), Deleted: ${deletedTotal} file(s)`)
  } else {
    console.log('No files were updated - nothing to deploy')
    return
  }

  if (!deployConfig.cfId) return
  const invalidationId = await invalidateCf(deployConfig.cfId)
  console.log(`CloudFront invalidation created: '${invalidationId}'`)
})

function invalidateCf (cfId) {
  return new Promise((resolve, reject) => {
    const cloudFront = new AWS.CloudFront()
    cloudFront.createInvalidation({
      DistributionId: cfId,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: 1,
          Items: [
            '/*'
          ]
        }
      }
    }, (error, data) => {
      error
        ? reject(error)
        : resolve(data.Invalidation.Id)
    })
  })
}

function syncDirS3 (config) {
  return new Promise((resolve, reject) => {
    const s3client = s3.createClient({
      s3Options: {
        region: config.region
      }
    })

    const uploader = s3client.uploadDir({
      localDir: config.src,
      deleteRemoved: true,
      s3Params: {
        ACL: 'public-read',
        Bucket: config.s3Bucket,
        Prefix: config.s3Prefix || ''
      }
    })

    let uploadedFiles = []

    uploader.on('error', reject)

    uploader.on('fileUploadEnd', (localFilePath, s3Key) => {
      const localFile = localFilePath.substr(config.src.length + 1)
      uploadedFiles.push([localFile, s3Key])
      console.log(`Uploaded: ${localFile} -> ${s3Key}`)
    })

    uploader.on('end', () => {
      resolve({
        uploaded: uploadedFiles,
        deletedTotal: uploader.deleteTotal
      })
    })
  })
}
