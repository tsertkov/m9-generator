import gulp from 'gulp'
import log from 'fancy-log'
import color from 'gulp-color'
import util from 'util'
import fs from 'fs'
import https from 'https'
import { URLSearchParams } from 'url'
import config from '../config'

const writeFile = util.promisify(fs.writeFile)
const fetchUrl = fetcUrlFactory({ concurrency: 3 })

gulp.task('update-content', async () => {
  const { content } = config

  if (!content.wpApiEndpoint) {
    log.warn(color('No valid content config given', 'YELLOW'))
    return
  }

  return fetchWpJson(content)
})

async function fetchWpJson (config) {
  const {
    wpApiEndpoint,
    excludedTypes,
    additionalTypes,
    staticPath
  } = config

  let contentTypes = Object.keys(
    await fetchWordpressJson(`${wpApiEndpoint}/types`)
  )

  if (excludedTypes) {
    contentTypes = contentTypes.filter(type => !excludedTypes.includes(type))
  }

  if (additionalTypes) {
    contentTypes = contentTypes.concat(additionalTypes)
  }

  await Promise.all(
    contentTypes.map(type =>
      fetchWordpressJson(`${wpApiEndpoint}/${type}`)
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

function fetchWordpressJson (url, { page = null, perPage = 100 } = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const params = new URLSearchParams([
        ['per_page', perPage]
      ])
      if (page !== null) {
        params.append('page', page)
      }

      const pageUrl = `${url}?${params}`
      const { content: pageContent, headers } = await fetchUrl(pageUrl)
      let data = JSON.parse(pageContent)
      const totalPages = headers['x-wp-totalpages']

      if (page === null && totalPages > 1) {
        const pages = []
        for (let pageNum = 2; pageNum <= totalPages; pages.push(pageNum++));
        (
          await Promise.all(pages.map(page => fetchWordpressJson(url, { page })))
        )
          .forEach(pageData => (data = data.concat(pageData)))
      }

      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

function fetcUrlFactory ({ concurrency }) {
  let running = 0
  let queue = []

  function processQueue () {
    if (running >= concurrency) return
    if (!queue.length) return

    const getUrlTask = queue.shift()
    running++
    if (running.length < concurrency) processQueue()

    getUrl(getUrlTask)
  }

  function getUrl ({ url, resolve, reject }) {
    const req = https.get(url, (res) => {
      const { statusCode } = res
      if (statusCode !== 200) {
        reject(new Error(`Unexpected status code: ${statusCode}`))
        return
      }

      let content = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => (content += chunk))
      res.on('end', () => resolve({
        content,
        headers: res.headers
      }))
    })

    req.on('error', reject)
  }

  return function fetchUrl (url) {
    return new Promise((resolve, reject) => {
      const resolveFn = (...args) => {
        running--
        resolve(...args)
        processQueue()
      }

      const rejectFn = (...args) => {
        running--
        reject(...args) // eslint-disable-line
        processQueue()
      }

      queue.push({
        url,
        resolve: resolveFn,
        reject: rejectFn
      })
      processQueue()
    })
  }
}
