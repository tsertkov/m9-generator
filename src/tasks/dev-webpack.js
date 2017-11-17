import gulp from 'gulp'
import gutil from 'gulp-util'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from '../config'

gulp.task('dev-webpack', (callback) => {
  const compiler = webpack(config.webpack)
  const webpackDevServer = new WebpackDevServer(compiler, {
    contentBase: config.paths.dst,
    publicPath: config.assets.publicPath,
    stats: {
      colors: true
    }
  })

  webpackDevServer.listen(config.dev.webpackPort, config.dev.host, (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
  })

  webpackDevServer.middleware.waitUntilValid(() => {
    callback()
  })
})
