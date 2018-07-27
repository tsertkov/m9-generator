import requireDir from 'require-dir'
import { existsSync } from 'fs'

export default function (dirPath) {
  return function jsDirPlugin (content, next) {
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

    let updatedContent

    if (!entities) {
      updatedContent = modifierFn({}, content, config)
    } else if (!Array.isArray(entities)) {
      updatedContent = modifierFn(entities, content, config)
    } else {
      updatedContent = entities.reduce((acc, currEntity) => {
        const entity = modifierFn(currEntity, content, config)
        if (typeof entity !== 'undefined') {
          acc.push(entity)
        }
        return acc
      }, [])
    }

    if (typeof updatedContent === 'undefined') {
      delete content[contentType]
    } else {
      content[contentType] = updatedContent
    }
  })
}
