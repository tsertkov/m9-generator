import gulp from 'gulp'
import PluginError from 'plugin-error'
import webpack from 'webpack'
import config from '../config'

gulp.task('build-webpack', (done) => {
  if (!config.__webpack) {
    console.log('Nothing to compile yet...')
    done()
    return
  }

  webpack(config.__webpack, (err, stats) => {
    if (err) throw new PluginError('webpack', err)
    console.log(stats.toString())
    done()
  })
})
