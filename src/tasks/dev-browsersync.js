import gulp from 'gulp'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import path from 'path'
import config from '../config'

gulp.task('dev-browsersync', (done) => {
  const bsConfig = {
    open: false,
    notify: false,
    server: {
      https: true,
      baseDir: config.templates.destinationPath
    }
  }

  if (!config.__webpack) {
    done()
    browserSync.init(bsConfig)
    return
  }

  const compiler = webpack(config.__webpack)

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.assets.publicPath,
    stats: {
      colors: true,
      context: config.paths.src
    }
  })

  devMiddleware.waitUntilValid(() => {
    done()
    browserSync.init(bsConfig)
      .watch(path.join(
        config.assets.destinationPath,
        config.assets.manifestFile
      ))
      .on('change', () => {
        // Could not find out which bundle was actually updated here
        // since devMiddleware.context.webpackStats contains details
        // of all bundles. Trying our best and reloading css files with
        // browserSync on all webpack re-compilations including js-only
        browserSync.reload(['*.css'])
      })
  })

  bsConfig.server.middleware = [
    devMiddleware
  ]
})
