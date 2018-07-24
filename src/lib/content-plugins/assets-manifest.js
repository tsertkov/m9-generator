import path from 'path'
import { existsSync } from 'fs'

export default function () {
  return function assetsManifest (content, next) {
    const config = content.__config
    const assetsManifestFile = path.join(
      config.assets.destinationPath,
      config.assets.manifestFile
    )

    if (existsSync(assetsManifestFile)) {
      content.__assets = require(assetsManifestFile)
    }
    next()
  }
}
