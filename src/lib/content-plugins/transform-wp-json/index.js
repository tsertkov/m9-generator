import normalize from './normalize'
import resolveReferences from './resolve-references'

export default function () {
  return function transformWpJson (content, done) {
    normalize(
      resolveReferences(content)
    )
    done()
  }
}
