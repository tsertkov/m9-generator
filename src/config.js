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

let config = {
  isGulpDebug,
  isProduction,
  isDevelopment,
  paths: {
    root,
    src,
    dst,
    srcScripts: path.join(src, DIR_SCRIPTS)
  },
  metaToFiles: {
    slugOptions: {
      replace: /[^a-z0-9]/g
    }
  },
  htmlmin: {
    pattern: '**/*.html'
  },
  pages: {
    directory: path.join(src, DIR_PAGES)
  },
  contentDir: {
    directory: path.join(src, DIR_CONTENT),
    transformer: 'wordpress'
  },
  helpers: {
    directory: path.join(src, DIR_HELPERS)
  },
  layouts: {
    engine: TPL_ENGINE,
    directory: path.join(src, DIR_LAYOUTS),
    partials: path.join(src, DIR_PARTIALS)
  },
  inplace: {
    engineOptions: {
      partials: readPartialsDir(path.join(src, DIR_PARTIALS))
    }
  },
  copy: {
    src: path.join(src, DIR_PUBLIC, '**/*')
  },
  assets: {
    scripts: path.join(src, DIR_SCRIPTS, '*.js'),
    styles: path.join(src, DIR_STYLES, '*.css'),
    manifest: 'assets.json',
    publicPath: `/${DIR_ASSETS}/`,
    dst: path.join(dst, DIR_ASSETS)
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
