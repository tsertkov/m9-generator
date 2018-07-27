import normalize from './normalize'
import resolveReferences from './resolve-references'

export default function () {
  return function transformWpJsonPlugin (content, done) {
    normalize(
      resolveReferences(content)
    )
    done()
  }
}
