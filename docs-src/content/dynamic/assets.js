import path from 'path'

module.exports = function (assetsProto, content, config) {
  return require(path.join(config.assets.dst, config.assets.manifest))
}
