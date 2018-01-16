export default resolveReferences

function resolveReferences (content) {
  Object.keys(content).forEach(contentType => {
    const entities = content[contentType]
    if (!Array.isArray(entities)) {
      processEntity(content, entities)
    } else {
      entities.forEach(entity => processEntity(content, entity))
    }
  })

  return content
}

function processEntity (srcContent, entity) {
  const { acf } = entity
  if (!acf) return

  Object.keys(acf).forEach(propertyName => {
    const propertyValue = acf[propertyName]
    if (!isReference(propertyValue)) return

    acf[propertyName] = resolvePropertyReferences(
      srcContent,
      propertyName,
      propertyValue
    )
  })
}

function isReference (entity) {
  return (
    Array.isArray(entity) &&
      entity.length &&
      entity[0].ID &&
      entity[0].post_type
  )
}

function getReferencedEntity (content, refEntitySrc) {
  const {
    ID: id,
    post_type: postType
  } = refEntitySrc

  const entities = content[postType]
  return entities
    ? getById(entities, id)
    : refEntitySrc
}

function resolvePropertyReferences (content, propertyName, propertyValue) {
  return propertyValue.map(refEntitySrc =>
    getReferencedEntity(content, refEntitySrc))
}

function getById (entities, id) {
  for (const entity of entities) {
    if (entity.id === id) return entity
  }

  throw new Error(`Entity with id: '${id}' was not found in given list`)
}
