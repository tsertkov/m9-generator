import gulp from 'gulp'
import path from 'path'
import Metalsmith from 'metalsmith'
import inplace from 'metalsmith-in-place'
import requireDir from 'require-dir'
import handlebarsHelpers from 'handlebars-helpers'
import debug from 'metalsmith-debug'
import htmlmin from 'metalsmith-html-minifier'
import log from 'fancy-log'
import color from 'gulp-color'
import { existsSync } from 'fs'
import loadContent from '../lib/load-content'
import m9metaToFiles from '../lib/metalsmith-plugins/m9-meta-to-files'
import m9matterInterpolate from '../lib/metalsmith-plugins/m9-matter-interpolate'
import m9permalink from '../lib/metalsmith-plugins/m9-permalink'
import m9buildManifest from '../lib/metalsmith-plugins/m9-build-manifest'
import readDirFiles from '../lib/read-dir-files'
import config from '../config'

// register handlebars-helpers
handlebarsHelpers()

function metalsmithInplaceConfig () {
  const {
    partialsPath,
    helpersPath
  } = config.templates

  const inplaceConfig = {
    engineOptions: {}
  }

  if (existsSync(partialsPath)) {
    inplaceConfig.engineOptions.partials = readDirFiles(partialsPath)
  }

  if (existsSync(helpersPath)) {
    inplaceConfig.engineOptions.helpers = requireDir(helpersPath)
  }

  return inplaceConfig
}

function getTplContext () {
  const context = {
    ...loadContent(config.content),
    __config: config
  }

  const assetsManifestFile = path.join(
    config.assets.destinationPath,
    config.assets.manifestFile
  )

  if (existsSync(assetsManifestFile)) {
    context.__assets = require(assetsManifestFile)
  }

  return context
}

gulp.task('build-metalsmith', (done) => {
  if (!existsSync(config.templates.pagesPath)) {
    const msg = `No templates to compile found:\n - ${config.templates.pagesPath}`
    log.warn(color(msg, 'YELLOW'))
    done()
    return
  }

  const inplaceConfig = metalsmithInplaceConfig()
  const metalsmith = new Metalsmith(config.paths.cwd)
    .use(debug())
    .clean(false)
    .source(config.templates.pagesPath)
    .destination(config.templates.destinationPath)
    .metadata(getTplContext())
    .use(m9metaToFiles(config.templates.metaToFiles))
    .use(m9matterInterpolate())
    .use(inplace(inplaceConfig))

  metalsmith
    .use(m9permalink())
    .use(htmlmin(config.templates.htmlmin))
    .use(m9buildManifest(config.templates.buildManifestFile))
    .build(done)
})
