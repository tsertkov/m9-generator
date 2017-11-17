import path from 'path'
import requireDir from 'require-dir'
import config from '../config'

export default loadContent

function loadContent (options) {
  const {
    directory,
    transformer
  } = options

  const staticDir = path.join(directory, 'static')
  const dynamicDir = path.join(directory, 'dynamic')

  const content = loadJsonContent(staticDir)
  if (transformer) transformContent(content, transformer)
  runAugmentersFromDir(dynamicDir, content)

  return content
}

function loadJsonContent (dir) {
  return requireDir(dir)
}

function runAugmentersFromDir (dir, content) {
  const augmenters = requireDir(dir)
  Object.keys(augmenters).forEach(contentType => {
    const augment = augmenters[contentType]
    const entities = content[contentType]

    if (!entities) {
      content[contentType] = augment({}, content, config)
      return
    }

    if (!Array.isArray(entities)) {
      content[contentType] = augment(entities, content, config)
      return
    }

    content[contentType] = entities.map(entity => augment(entity, content, config))
  })
}

function transformContent (content, transformerName) {
  const transformerFn = transformerByName(transformerName)
  transformerFn(content)
}

function transformerByName (transformerName) {
  try {
    return require(`./content-transformers/${transformerName}`)
  } catch (error) {
    throw new Error(`Unsupported transformer "${transformerName}"`)
  }
}
