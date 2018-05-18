import path from 'path'

module.exports = function (assetsProto, content, config) {
  return require(path.join(config.paths.dst, config.assets.manifest))
}
