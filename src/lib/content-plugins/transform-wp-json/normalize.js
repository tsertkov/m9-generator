export default normalize

function normalize (content) {
  Object.keys(content).forEach(contentType => {
    const entities = content[contentType]
    if (Array.isArray(entities)) {
      entities.forEach(entity => {
        removeCruft(entity)
        normalizeTitle(entity)
        normalizeDate(entity)
        normalizeAcf(entity)
        removeFuturePostsReferences(entity)
      })
    } else if (typeof entities === 'object') {
      removeCruft(entities)
      normalizeTitle(entities)
      normalizeDate(entities)
      normalizeAcf(entities)
      removeFuturePostsReferences(entities)
    }
  })
  return content
}

function normalizeDate (entity) {
  if (entity.date) {
    entity.date = new Date(entity.date)
  }
}

function removeCruft (entity) {
  delete entity._links
  delete entity.link
  delete entity.modified_gmt
  delete entity.date_gmt
  delete entity.guid
}

function normalizeTitle (entity) {
  if (typeof entity.title !== 'object') return
  entity.title = entity.title.rendered
  delete entity.title.rendered
}

function normalizeAcf (entity) {
  if ('acf' in entity) {
    Object.keys(entity.acf).forEach(acfPropertyName => {
      if (acfPropertyName === '') return
      entity[acfPropertyName] = entity.acf[acfPropertyName]
    })
    delete entity.acf
  }
}

function removeFuturePostsReferences (entity) {
  Object.keys(entity).forEach(propertyName => {
    const property = entity[propertyName]
    if (!Array.isArray(propertyName)) return

    property.forEach((entity, i) => {
      if (typeof entity !== 'object') return

      // remove future posts reference
      if (entity.post_status === 'future') {
        property.splice(i, 1)
      } else {
        // process nested entities
        removeFuturePostsReferences(property)
      }
    })
  })
}
