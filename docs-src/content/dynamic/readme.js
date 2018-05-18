import fs from 'fs'
import path from 'path'
import marked from 'marked'

module.exports = function (readmeProto, content, config) {
  Object.defineProperty(readmeProto, 'content', {
    configurable: true,
    enumerable: true,
    get: () => (
      marked(
        fs.readFileSync(
          path.join(config.paths.src, '..', 'README.md'),
          'utf8'
        )
      )
    )
  })

  return readmeProto
}
