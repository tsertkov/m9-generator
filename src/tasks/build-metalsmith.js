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
  return {
    ...config.inplace,
    engineOptions: {
      ...config.inplace.engineOptions,
      partials: readDirFiles(config.inplace.engineOptions.partials),
      helpers: requireDir(config.inplace.engineOptions.helpers)
    }
  }
}

gulp.task('build-metalsmith', callback => {
  if (!existsSync(config.pages.directory)) {
    log.warn('[metalsmith] no pages to build')
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
    .use(helpers(config.helpers))
    .use(inplace(metalsmithInplaceConfig()))

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
