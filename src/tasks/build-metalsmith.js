import gulp from 'gulp'
import path from 'path'
import Metalsmith from 'metalsmith'
import handlebars from 'handlebars'
import handlebarsHelpers from 'handlebars-helpers'
import debug from 'metalsmith-debug'
import log from 'fancy-log'
import color from 'gulp-color'
import { existsSync } from 'fs'
import pluginLoader from '../lib/plugin-loader'
import Content from '../lib/content'
import config from '../config'

// register handlebars-helpers
handlebarsHelpers({ handlebars })

gulp.task('build-metalsmith', async () => {
  if (!existsSync(config.templates.pagesPath)) {
    const msg = `No templates to compile found:\n - ${config.templates.pagesPath}`
    log.warn(color(msg, 'YELLOW'))
    return
  }

  const metalsmith = new Metalsmith(config.paths.cwd)
    .use(debug())
    .frontmatter(false)
    .clean(false)
    .source(config.templates.pagesPath)
    .destination(config.templates.destinationPath)
    .metadata(await getDataContext())

  const metalsmithPluginsDir = path.join(__dirname, '../lib/metalsmith-plugins')
  config.templates.plugins.forEach(pluginMeta => {
    metalsmith.use(pluginLoader(pluginMeta, metalsmithPluginsDir))
  })

  return new Promise((resolve, reject) =>
    metalsmith.build(error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  )
})

async function getDataContext () {
  const content = new Content(config.content)
  const contentPluginsDir = path.join(__dirname, '../lib/content-plugins')
  config.content.plugins.forEach(pluginMeta => {
    content.use(pluginLoader(pluginMeta, contentPluginsDir))
  })
  return content.getContext()
}
