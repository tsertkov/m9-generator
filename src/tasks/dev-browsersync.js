import gulp from 'gulp'
import browserSync from 'browser-sync'
import config from '../config'

const webpackSnippet = '<script async src="/webpack-dev-server.js"></script>'

gulp.task('dev-browsersync', () => {
  browserSync.init({
    open: false,
    notify: false,
    https: true,
    proxy: {
      target: `${config.dev.host}:${config.dev.webpackPort}`,
      ws: true
    },
    snippetOptions: {
      rule: {
        match: /<body[^>]*>/i,
        fn: (snippet, match) => (match + snippet + webpackSnippet)
      }
    }
  })
})
