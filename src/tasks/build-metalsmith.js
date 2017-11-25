import gulp from 'gulp'
import Metalsmith from 'metalsmith'
import browserSync from 'browser-sync'
import inplace from 'metalsmith-in-place'
import layouts from 'metalsmith-layouts'
import helpers from 'metalsmith-register-helpers'
import handlebarsHelpers from 'handlebars-helpers'
import debug from 'metalsmith-debug'
import htmlmin from 'metalsmith-html-minifier'
import loadContent from '../lib/load-content'
import m9metaToFiles from '../lib/metalsmith-plugins/m9-meta-to-files'
import m9matterInterpolate from '../lib/metalsmith-plugins/m9-matter-interpolate'
import m9permalink from '../lib/metalsmith-plugins/m9-permalink'
import config from '../config'

// register handlebars-helpers
handlebarsHelpers()

gulp.task('build-metalsmith', callback => {
  return new Metalsmith(config.paths.root)
    .use(debug())
    .clean(false)
    .source(config.pages.directory)
    .destination(config.paths.dst)
    .metadata({
      ...loadContent(config.contentDir),
      config
    })
    .use(m9metaToFiles())
    .use(m9matterInterpolate())
    .use(helpers(config.helpers))
    .use(inplace(config.inplace))
    .use(layouts(config.layouts))
    .use(m9permalink())
    .use(htmlmin(config.htmlmin.src, config.htmlmin.options))
    .build(error => {
      if (error) return callback(error)
      browserSync.reload()
      callback()
    })
})
