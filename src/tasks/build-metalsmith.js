import gulp from 'gulp'
import Metalsmith from 'metalsmith'
import browserSync from 'browser-sync'
import inplace from 'metalsmith-in-place'
import layouts from 'metalsmith-layouts'
import requireDir from 'require-dir'
import helpers from 'metalsmith-register-helpers'
import handlebarsHelpers from 'handlebars-helpers'
import debug from 'metalsmith-debug'
import htmlmin from 'metalsmith-html-minifier'
import log from 'fancy-log'
import color from 'gulp-color'
import { readdirSync, existsSync } from 'fs'
import loadContent from '../lib/load-content'
import m9metaToFiles from '../lib/metalsmith-plugins/m9-meta-to-files'
import m9matterInterpolate from '../lib/metalsmith-plugins/m9-matter-interpolate'
import m9permalink from '../lib/metalsmith-plugins/m9-permalink'
import readDirFiles from '../lib/read-dir-files'
import config from '../config'

// register handlebars-helpers
handlebarsHelpers()

function metalsmithInplaceConfig () {
  const inplaceConfig = {
    ...config.inplace,
    engineOptions: {
      ...config.inplace.engineOptions
    }
  }

  if (existsSync(inplaceConfig.engineOptions['partials'])) {
    inplaceConfig.engineOptions['partials'] = readDirFiles(
      inplaceConfig.engineOptions['partials']
    )
  }

  if (existsSync(inplaceConfig.engineOptions['helpers'])) {
    inplaceConfig.engineOptions['helpers'] = requireDir(
      inplaceConfig.engineOptions['helpers']
    )
  }

  return inplaceConfig
}

gulp.task('build-metalsmith', callback => {
  if (!existsSync(config.pages.directory)) {
    const msg = `No templates to compile found:\n - ${config.pages.directory}`
    log.warn(color(msg, 'YELLOW'))
    callback()
    return
  }

  const metalsmith = new Metalsmith(config.paths.cwd)
    .use(debug())
    .clean(false)
    .source(config.pages.directory)
    .destination(config.paths.dst)
    .metadata({
      ...loadContent(config.contentDir),
      config
    })
    .use(m9metaToFiles(config.metaToFiles || {}))
    .use(m9matterInterpolate())

  if (
    existsSync(config.helpers.directory) &&
    readdirSync(config.helpers.directory).length
  ) {
    metalsmith.use(helpers(config.helpers))
  }

  metalsmith.use(inplace(metalsmithInplaceConfig()))

  if (
    existsSync(config.layouts.directory) &&
    readdirSync(config.layouts.directory).length
  ) {
    metalsmith.use(layouts(config.layouts))
  }

  metalsmith
    .use(m9permalink())
    .use(htmlmin(config.htmlmin))
    .build(error => {
      if (error) return callback(error)
      browserSync.reload()
      callback()
    })

  return metalsmith
})
