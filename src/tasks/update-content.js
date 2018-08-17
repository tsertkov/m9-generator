import gulp from 'gulp'
import log from 'fancy-log'
import color from 'gulp-color'
import util from 'util'
import fs from 'fs'
import { fetchContentTypes, fetchWpContentType } from '../lib/fetch-wp'
import config from '../config'

const writeFile = util.promisify(fs.writeFile)

gulp.task('update-content', () => {
  const { wpJson } = config.content

  if (!wpJson.endpoint) {
    log.warn(color('No valid content config given', 'YELLOW'))
    return
  }

  return fetchWpJson(wpJson)
})

async function fetchWpJson (config) {
  const {
    endpoint,
    exclude = [],
    include = [],
    staticPath
  } = config

  let contentTypes = await fetchContentTypes({
    endpoint,
    exclude,
    include
  })

  await Promise.all(
    contentTypes.map(type =>
      fetchWpContentType(endpoint, type)
        .then(data =>
          writeFile(
            `${staticPath}/${type}.json`,
            JSON.stringify(data, null, 2)
          )
            .then(() =>
              log(type, data.length)
            )
        )
    )
  )
}
