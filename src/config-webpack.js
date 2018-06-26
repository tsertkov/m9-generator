import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import postcssImport from 'postcss-import'
import postcssCssnext from 'postcss-cssnext'
import Visualizer from 'webpack-visualizer-plugin'

export default (config) => {
  const { isDevelopment } = config
  const configWebpack = {
    mode: 'none',
    context: config.paths.src,
    output: {
      filename: isDevelopment ? '[name].js' : '[name]-[chunkhash].js',
      path: config.assets.dst,
      publicPath: config.assets.publicPath
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: 'babel-loader'
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
              plugins: (loader) => [
                postcssImport(),
                postcssCssnext()
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
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name]-[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id]-[hash].css'
      }),
      new ManifestPlugin({
        writeToFileEmit: true,
        filename: config.assets.manifest
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true
          },
          sourceMap: isDevelopment
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  }

  configWebpack.entry = [
    ...glob.sync(config.assets.scripts),
    ...glob.sync(config.assets.styles)
  ].reduce((acc, filePath) => {
    const { name } = path.parse(filePath)
    acc[name] = filePath
    return acc
  }, {})

  if (isDevelopment && configWebpack.entry.length) {
    configWebpack.plugins.push(
      new Visualizer({ filename: '../webpack-visualizer/index.html' })
    )

    configWebpack.entry['webpack-hot-middleware-client'] =
      'webpack-hot-middleware/client'

    configWebpack.plugins.unshift(
      new webpack.HotModuleReplacementPlugin()
    )
  }

  config.webpack = configWebpack
  return config
}
