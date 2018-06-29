import gulp from 'gulp'
import log from 'fancy-log'
import PluginError from 'plugin-error'
import webpack from 'webpack'
import config from '../config'

gulp.task('build-webpack', (done) => {
  if (!config.webpack) {
    log.warn(['webpack] nothing to compile yet...'])
    done()
    return
  }

  webpack(config.webpack, (err, stats) => {
    if (err) throw new PluginError('webpack', err)
    log.info('[webpack]', '\n' + stats.toString())
    done()
  })
})
