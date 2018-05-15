import path from 'path'
import { argv } from 'yargs'
import loadConfigs from './lib/load-configs'
import readPartialsDir from './lib/read-partials-dir'
import webpackConfig from './config-webpack'

const isGulpDebug = process.env.GULP_DEBUG === 'true'
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

const root = argv.root
const src = path.join(root, 'src')
const dst = path.join(root, 'build')

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
  root,
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
  metaToFiles: {
    slugOptions: {
      replace: /[^a-z0-9]/g
    }
  },
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
      partials: readPartialsDir(paths.srcPartials)
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
loadConfigs(config, root)

export default config
