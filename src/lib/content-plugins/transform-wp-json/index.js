import normalize from './normalize'
import resolveReferences from './resolve-references'

export default function () {
  return function transformWpJsonPlugin (content, done) {
    content.__static = JSON.parse(JSON.stringify(content))
    normalize(
      resolveReferences(content)
    )
    done()
  }
}
