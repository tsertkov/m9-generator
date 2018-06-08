import path from 'path'
import yargs from 'yargs'
import loadConfigs from './lib/load-configs'
import webpackConfig from './config-webpack'

const isGulpDebug = process.env.GULP_DEBUG === 'true'
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

const argv = yargs.parse(process.argv)
const cwd = argv['m9-initial-cwd']
const src = path.resolve(cwd, argv.src || process.env.SRC || 'src')
const dst = path.resolve(cwd, argv.dst || process.env.DST || 'build')

const DIR_PAGES = 'pages'
const DIR_CONTENT = 'content'
const DIR_HELPERS = 'helpers'
const DIR_PARTIALS = 'partials'
const DIR_LAYOUTS = 'layouts'
const DIR_SCRIPTS = 'scripts'
const DIR_STYLES = 'styles'
const DIR_ASSETS = 'assets'
const DIR_PUBLIC = 'public'
const TPL_ENGINE = 'handlebars'

const paths = {
  cwd,
  src,
  dst,
  dstAssets: path.join(dst, DIR_ASSETS),
  srcPublic: path.join(src, DIR_PUBLIC),
  srcScripts: path.join(src, DIR_SCRIPTS),
  srcStyles: path.join(src, DIR_STYLES),
  srcLayouts: path.join(src, DIR_LAYOUTS),
  srcContent: path.join(src, DIR_CONTENT),
  srcPages: path.join(src, DIR_PAGES),
  srcHelpers: path.join(src, DIR_HELPERS),
  srcPartials: path.join(src, DIR_PARTIALS)
}

let config = {
  isGulpDebug,
  isProduction,
  isDevelopment,
  paths,
  htmlmin: {
    pattern: '**/*.html'
  },
  pages: {
    directory: paths.srcPages
  },
  contentDir: {
    directory: paths.srcContent,
    transformer: 'wordpress'
  },
  helpers: {
    directory: paths.srcHelpers
  },
  layouts: {
    engine: TPL_ENGINE,
    directory: paths.srcLayouts,
    partials: paths.srcPartials
  },
  inplace: {
    engineOptions: {
      partials: paths.srcPartials,
      helpers: paths.srcHelpers
    }
  },
  copy: {
    src: path.join(paths.srcPublic, '**/*')
  },
  assets: {
    scripts: path.join(paths.srcScripts, '*.js'),
    styles: path.join(paths.srcStyles, '*.css'),
    manifest: 'assets.json',
    publicPath: `/${DIR_ASSETS}/`,
    dst: paths.dstAssets
  },
  dev: {
    host: 'localhost',
    webpackPort: 9000,
    browsersyncPort: 3000
  }
}

config = webpackConfig(config)
loadConfigs(config, src)

export default config
