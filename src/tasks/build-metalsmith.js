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

function getTplContext () {
  const context = {
    ...loadContent(config.contentDir),
    __config: config
  }

  const manifestPath = path.join(config.assets.dst, config.assets.manifest)
  if (existsSync(manifestPath)) {
    context.__assets = require(manifestPath)
  }

  return context
}

gulp.task('build-metalsmith', (done) => {
  if (!existsSync(config.pages.directory)) {
    const msg = `No templates to compile found:\n - ${config.pages.directory}`
    log.warn(color(msg, 'YELLOW'))
    done()
    return
  }

  const metalsmith = new Metalsmith(config.paths.cwd)
    .use(debug())
    .clean(false)
    .source(config.pages.directory)
    .destination(config.paths.dst)
    .metadata(getTplContext())
    .use(m9metaToFiles(config.metaToFiles || {}))
    .use(m9matterInterpolate())
    .use(inplace(metalsmithInplaceConfig()))

  metalsmith
    .use(m9permalink())
    .use(htmlmin(config.htmlmin))
    .use(m9buildManifest('build.json'))
    .build(done)
})
