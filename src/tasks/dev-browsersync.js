import gulp from 'gulp'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'
import config from '../config'

const bsServer = browserSync.create()
const compiler = webpack(config.webpack)
const webpackSnippet = '<script async src="/assets/webpack-hot-middleware-client.js"></script>'

gulp.task('dev-browsersync', (callback) => {
  const hotMiddleware = webpackHotMiddleware(compiler)
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.assets.publicPath,
    stats: {
      colors: true,
      context: config.paths.src
    }
  })

  devMiddleware.waitUntilValid(() => {
    // return early from task
    callback()
    // and start browserSync in background
    bsServer.init({
      open: false,
      notify: false,
      snippetOptions: {
        rule: {
          match: /<body[^>]*>/i,
          fn: (snippet, match) => (match + snippet + webpackSnippet)
        }
      },
      server: {
        https: true,
        baseDir: config.paths.dst,
        middleware: [
          devMiddleware,
          hotMiddleware
        ]
      }
    })

    bsServer
      .watch(path.join(config.paths.dst, '**/*.html'))
      .on('change', bsServer.reload)

    // FIME remove following line when HMR works again
    bsServer
      .watch(path.join(config.assets.dst, config.assets.manifest))
      .on('change', bsServer.reload)
  })
})
