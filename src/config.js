import path from 'path'
import yargs from 'yargs'
import loadConfigs from './lib/load-configs'
import webpackConfig from './config-webpack'
import { registry } from './gulp-runner'

// Get original cwd
const { cwd, isDevelopment } = registry

const argv = yargs.parse(process.argv)

// Stage site is building for
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

let config = {
  stage,
  isDevelopment,
  paths,
  templates: {
    destinationPath: paths.dst,
    pagesPath: paths.srcPages,
    publicPath: paths.srcPublic,
    partialsPath: paths.srcPartials,
    helpersPath: paths.srcHelpers,
    metaToFiles: {},
    buildManifestFile: 'build.json',
    // TODO pluggable metalsmith plugins
    htmlmin: {
      pattern: '**/*.html'
    }
  },
  content: {
    contentPath: paths.srcContent,
    // TODO pluggable content sync gulp task
    // TODO pluggable content plugins
    transformer: 'wordpress'
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
loadConfigs(config, src)

export default config
