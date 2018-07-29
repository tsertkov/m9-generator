import path from 'path'
import yargs from 'yargs'
import { existsSync } from 'fs'
import requireDir from 'require-dir'
import loadConfigs from './lib/load-configs'
import loadTasks from './lib/load-tasks'
import readDirFiles from './lib/read-dir-files'
import webpackConfig from './config-webpack'
import { registry } from './gulp-runner'

// NB! Gulp has changed cwd to m9-generator package directory
// Get original cwd
const { cwd, isDevelopment } = registry

const argv = yargs.parse(process.argv)

// A stage site is building for
const stage = argv.stage || process.env.STAGE || 'development'

const src = path.resolve(cwd, argv.src || process.env.SRC || 'src')
const dst = path.resolve(cwd, argv.dst || process.env.DST || 'build')

const DIR_PAGES = 'pages'
const DIR_CONTENT = 'content'
const DIR_HELPERS = 'helpers'
const DIR_PARTIALS = 'partials'
const DIR_SCRIPTS = 'scripts'
const DIR_STYLES = 'styles'
const DIR_ASSETS = 'assets'
const DIR_PUBLIC = 'public'

const paths = {
  cwd,
  src,
  dst,
  dstAssets: path.join(dst, DIR_ASSETS),
  srcPublic: path.join(src, DIR_PUBLIC),
  srcScripts: path.join(src, DIR_SCRIPTS),
  srcStyles: path.join(src, DIR_STYLES),
  srcContent: path.join(src, DIR_CONTENT),
  srcPages: path.join(src, DIR_PAGES),
  srcHelpers: path.join(src, DIR_HELPERS),
  srcPartials: path.join(src, DIR_PARTIALS)
}

const handlebarsOptions = ((options = {}) => {
  if (existsSync(paths.srcPartials)) {
    options.partials = readDirFiles(paths.srcPartials)
  }
  if (existsSync(paths.srcHelpers)) {
    options.helpers = requireDir(paths.srcHelpers)
  }
  return options
})()

let config = {
  stage,
  isDevelopment,
  paths,
  templates: {
    destinationPath: paths.dst,
    publicPath: paths.srcPublic,
    pagesPath: paths.srcPages,
    partialsPath: paths.srcPartials,
    helpersPath: paths.srcHelpers,
    plugins: [
      { name: 'handlebars-compile', options: handlebarsOptions },
      'meta-to-files',
      'matter-interpolate',
      'handlebars-execute',
      'permalink',
      { name: 'build-manifest', options: { manifestFile: 'build.json' } }
    ]
  },
  content: {
    contentPath: paths.srcContent,
    plugins: [
      { name: 'json-dir', options: path.join(paths.srcContent, 'static') },
      'transform-wp-json',
      'assets-manifest',
      { name: 'js-dir', options: path.join(paths.srcContent, 'dynamic') },
    ]
  },
  assets: {
    scripts: path.join(paths.srcScripts, '*.js'),
    styles: path.join(paths.srcStyles, '*.css'),
    manifestFile: 'assets.json',
    publicPath: `/${DIR_ASSETS}/`,
    destinationPath: paths.dstAssets
  }
}

config.__webpack = webpackConfig(config)
loadConfigs(src, config)
loadTasks(src, config)

export default config
