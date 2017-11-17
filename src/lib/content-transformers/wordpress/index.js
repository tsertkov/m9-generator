import normalize from './normalize'
import resolveReferences from './resolve-references'

module.exports = wordpress

function wordpress (content) {
  normalize(
    resolveReferences(content)
  )
}
