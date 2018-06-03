import gulp from 'gulp'
import log from 'fancy-log'
import PluginError from 'plugin-error'
import webpack from 'webpack'
import config from '../config'

gulp.task('build-webpack', (callback) => {
  if (!Object.keys(config.webpack.entry).length) {
    log.warn(['webpack] nothing to compile yet...'])
    callback()
    return
  }

  webpack(config.webpack, (err, stats) => {
    if (err) throw new PluginError('webpack', err)
    log.info('[webpack]', '\n' + stats.toString())
    callback()
  })
})
