import path from 'path'
import requireDir from 'require-dir'
import { existsSync } from 'fs'
import config from '../config'

export default loadContent

function loadContent (options) {
  const {
    contentPath,
    transformer
  } = options

  const staticDir = path.join(contentPath, 'static')
  const dynamicDir = path.join(contentPath, 'dynamic')

  const content = loadJsonContent(staticDir)
  if (transformer) transformContent(content, transformer)
  runAugmentersFromDir(dynamicDir, content)

  return content
}

function loadJsonContent (dir) {
  if (existsSync(dir)) {
    return requireDir(dir)
  }
  return {}
}

function runAugmentersFromDir (dir, content) {
  if (!existsSync(dir)) {
    return
  }

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
