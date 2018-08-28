import gulp from 'gulp'
import util from 'util'
import fs from 'fs'
import { fetchContentTypes, fetchWpContentType } from '../lib/fetch-wp'
import config from '../config'

const writeFile = util.promisify(fs.writeFile)

gulp.task('update-content', () => {
  const { wpJson } = config.content

  if (!wpJson.endpoint) {
    console.log('No valid content config given')
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

  const stats = {}
  await Promise.all(
    contentTypes.map(type =>
      fetchWpContentType(endpoint, type)
        .then(data => {
          stats[type] = data.length
          return writeFile(
            `${staticPath}/${type}.json`,
            JSON.stringify(data, null, 2)
          )
        })
    )
  )

  console.log('Downloaded content stats:')
  Object.keys(stats).forEach(type => {
    console.log(type, stats[type])
  })
}
