import gulp from 'gulp'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'
import config from '../config'

const bsServer = browserSync.create()
const compiler = webpack(config.webpack)
const webpackHMRSnippet = '<script async src="/assets/webpack-hot-middleware-client.js"></script>'

gulp.task('dev-browsersync', (callback) => {
  const noWebpack = !Object.keys(config.webpack.entry).length
  const bsConfig = {
    open: false,
    notify: false,
    server: {
      https: true,
      baseDir: config.paths.dst
    }
  }

  if (noWebpack) {
    launchBrowserSync(bsConfig, callback)
    return
  }

  bsConfig.snippetOptions = {
    rule: {
      match: /<body[^>]*>/i,
      fn: (snippet, match) => (match + snippet + webpackHMRSnippet)
    }
  }

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.assets.publicPath,
    stats: {
      colors: true,
      context: config.paths.src
    }
  })

  bsConfig.server.middleware = [
    devMiddleware,
    webpackHotMiddleware(compiler)
  ]

  devMiddleware.waitUntilValid(() => {
    launchBrowserSync(bsConfig, callback)
      // FIME remove following line when HMR works again
      .watch(path.join(config.assets.dst, config.assets.manifest))
      .on('change', bsServer.reload)
  })
})

function launchBrowserSync (options, callback) {
  // return early from task
  // and start browserSync in background
  callback()
  bsServer.init(options)

  bsServer
    .watch(path.join(config.paths.dst, '**/*.html'))
    .on('change', bsServer.reload)

  return bsServer
}
