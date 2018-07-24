import requireDir from 'require-dir'
import { existsSync } from 'fs'

export default function (dirPath) {
  return function loaderJsDir (content, next) {
    if (!existsSync(dirPath)) return next()
    const modifiers = requireDir(dirPath)
    applyModifiers(modifiers, content)
    next()
  }
}

function applyModifiers (modifiers, content) {
  Object.keys(modifiers).forEach(contentType => {
    const modifierFn = modifiers[contentType]
    const entities = content[contentType]
    const config = content.__config

    if (!entities) {
      content[contentType] = modifierFn({}, content, config)
      return
    }

    if (!Array.isArray(entities)) {
      content[contentType] = modifierFn(entities, content, config)
      return
    }

    content[contentType] = entities.map(
      entity => modifierFn(entity, content, config)
    )
  })
}
