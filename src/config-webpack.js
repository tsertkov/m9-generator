import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import postcssImport from 'postcss-import'
import postcssCssnext from 'postcss-cssnext'

export default (config) => {
  const { isDevelopment } = config
  const configWebpack = {
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
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                postcssImport(),
                postcssCssnext()
              ]
            }
          }]
        })
      }]
    },
    plugins: [
      new ExtractTextPlugin(isDevelopment ? '[name].css' : '[name]-[contenthash].css'),
      new AssetsPlugin({
        path: config.paths.dst,
        filename: config.assets.manifest,
        prettyPrint: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: !isDevelopment
      })
    ]
  }

  configWebpack.entry = [
    ...glob.sync(config.assets.scripts),
    ...glob.sync(config.assets.styles)
  ].reduce((acc, filePath) => {
    const { name } = path.parse(filePath)
    acc[name] = filePath
    return acc
  }, {})

  if (isDevelopment) {
    configWebpack.devtool = 'inline-source-map'
  } else {
    configWebpack.plugins.push(new webpack.optimize.UglifyJsPlugin())
  }

  config.webpack = configWebpack
  return config
}
