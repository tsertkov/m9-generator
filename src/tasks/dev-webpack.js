import gulp from 'gulp'
import PluginError from 'plugin-error'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import log from 'fancy-log'
import config from '../config'

gulp.task('dev-webpack', (callback) => {
  if (!Object.keys(config.webpack.entry).length) {
    log.warn('[webpack] nothing to compile yet...')
    callback()
    return
  }

  const compiler = webpack(config.webpack)
  const webpackDevServer = new WebpackDevServer(compiler, {
    contentBase: config.paths.dst,
    publicPath: config.assets.publicPath,
    stats: {
      colors: true
    }
  })

  webpackDevServer.listen(config.dev.webpackPort, config.dev.host, (err) => {
    if (err) throw new PluginError('webpack-dev-server', err)
  })

  webpackDevServer.middleware.waitUntilValid(() => callback())
})
