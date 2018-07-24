export default normalize

function normalize (content) {
  Object.keys(content).forEach(contentType => {
    const entities = content[contentType]
    if (Array.isArray(entities)) {
      entities.forEach(entity => {
        removeCruft(entity)
        normalizeTitle(entity)
        normalizeAcf(entity)
      })
    } else {
      removeCruft(entities)
      normalizeTitle(entities)
      normalizeAcf(entities)
    }
  })
  return content
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
