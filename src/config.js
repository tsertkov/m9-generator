import path from 'path'
import yargs from 'yargs'
import loadConfigs from './lib/load-configs'
import loadTasks from './lib/load-tasks'
import webpackConfig from './config-webpack'
import registry from '../registry'

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
  srcEmbeddedHelpers: path.join(__dirname, './lib/helpers'),
  srcPartials: path.join(src, DIR_PARTIALS)
}

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
    embeddedHelpersPath: paths.srcEmbeddedHelpers,
    plugins: [
      'matter-parse',
      {
        name: 'handlebars-compile',
        options: {
          partials: paths.srcPartials,
          helpers: [
            paths.srcEmbeddedHelpers,
            paths.srcHelpers
          ]
        }
      },
      'multifile',
      'handlebars-execute',
      'path',
      {
        name: 'build-manifest',
        options: {
          manifestFile: 'build.json'
        }
      }
    ]
  },
  content: {
    contentPath: paths.srcContent,
    plugins: [
      {
        name: 'json-dir',
        options: path.join(paths.srcContent, 'static')
      },
      'transform-wp-json',
      'assets-manifest',
      {
        name: 'js-dir',
        options: path.join(paths.srcContent, 'dynamic')
      }
    ]
  },
  assets: {
    scripts: path.join(paths.srcScripts, '*.js'),
    styles: path.join(paths.srcStyles, '*.css'),
    manifestFile: 'assets.json',
    publicPath: `/${DIR_ASSETS}/`,
    destinationPath: paths.dstAssets
  },
  deploy: {
    src: dst
  }
}

config.__webpack = webpackConfig(config)
config = loadConfigs(src, config)
loadTasks(src, config)

export default config
