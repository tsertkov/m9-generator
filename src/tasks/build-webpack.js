import gulp from 'gulp'
import gutil from 'gulp-util'
import webpack from 'webpack'
import config from '../config'

gulp.task('build-webpack', (callback) => {
  if (!Object.keys(config.webpack.entry).length) {
    gutil.log(['nothing to compile yet...'])
    callback()
    return
  }

  webpack(config.webpack, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', '\n' + stats.toString())
    callback()
  })
})
