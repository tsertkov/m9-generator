import path from 'path'
import glob from 'glob'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import Visualizer from 'webpack-visualizer-plugin'
import { existsSync, readFileSync } from 'fs'

export default (config) => {
  const entry = [
    ...glob.sync(config.assets.scripts),
    ...glob.sync(config.assets.styles)
  ].reduce((acc, filePath) => {
    const { name } = path.parse(filePath)
    acc[name] = filePath
    return acc
  }, {})

  // Return null config when no entrypoints found
  if (!Object.keys(entry).length) {
    return null
  }

  // For some reason babel seems to ignore .browserlistrc files. Manually
  // loading .browserslistrc from site src to use it by babel and posstcss.
  const browserslistRcFile = path.join(config.paths.src, '.browserslistrc')
  const browsers = existsSync(browserslistRcFile)
    ? readFileSync(browserslistRcFile)
      .toString()
      .trim()
      .split(/\n|\r\n/)
    // default browserslist query if .browserslistcrc is missing
    : [ '>0.25%', 'not ie 11', 'not op_mini all' ]

  const configWebpack = {
    entry,
    mode: config.isDevelopment ? 'development' : 'production',
    context: config.paths.src,
    output: {
      filename: config.isDevelopment ? '[name].js' : '[name]-[chunkhash].js',
      path: config.assets.destinationPath,
      publicPath: config.assets.publicPath
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers
              }
            }]
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            ['@babel/plugin-proposal-class-properties', { 'loose': false }],
            '@babel/plugin-proposal-json-strings'
          ]
        }
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssImport(),
                postcssPresetEnv({
                  stage: 2,
                  browsers,
                  features: {
                    'custom-properties': {
                      preserve: false
                    },
                    'nesting-rules': true,
                    'custom-media-queries': true
                  }
                })
              ]
            }
          }
        ]
      }, {
        test: /\.hbs$/,
        use: [{
          loader: 'handlebars-loader',
          options: {
            helperDirs: [config.templates.helpersPath],
            partialDirs: [config.templates.partialsPath]
          }
        }]
      }]
    },
    plugins: [
      new ManifestPlugin({
        writeToFileEmit: true,
        fileName: config.assets.manifestFile
      }),
      new MiniCssExtractPlugin(
        config.isDevelopment
          ? {
            filename: '[name].css',
            chunkFilename: '[id].css'
          }
          : {
            filename: '[name]-[hash].css',
            chunkFilename: '[id]-[hash].css'
          }
      )
    ]
  }

  if (config.isDevelopment) {
    configWebpack.plugins.push(
      new Visualizer({
        filename: '../webpack-visualizer/index.html'
      })
    )
  }

  return configWebpack
}
