import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import Visualizer from 'webpack-visualizer-plugin'

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

  const isDevelopment = config.isDevTask
  const configWebpack = {
    entry,
    mode: isDevelopment ? 'development' : 'production',
    context: config.paths.src,
    output: {
      filename: isDevelopment ? '[name].js' : '[name]-[chunkhash].js',
      path: config.assets.dst,
      publicPath: config.assets.publicPath
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          'presets': [
            ['@babel/preset-env', {
              'targets': {
                'browsers': [
                  '>0.25%',
                  'not ie 11',
                  'not op_mini all'
                ]
              }
            }],
            '@babel/preset-stage-3'
          ]
        }
      }, {
        test: /\.css$/,
        use: [
          isDevelopment
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssImport(),
                postcssPresetEnv({
                  stage: 2,
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
            helperDirs: [config.paths.srcHelpers],
            partialDirs: [config.paths.srcPartials]
          }
        }]
      }]
    },
    plugins: [
      new ManifestPlugin({
        writeToFileEmit: true,
        filename: config.assets.manifest
      })
    ]
  }

  if (isDevelopment) {
    configWebpack.entry['webpack-hot-middleware-client'] =
      'webpack-hot-middleware/client'

    configWebpack.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new Visualizer({
        filename: '../webpack-visualizer/index.html'
      })
    )
  } else {
    configWebpack.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
        chunkFilename: '[id]-[hash].css'
      })
    )
  }

  return configWebpack
}
