"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = normalize;
exports.default = _default;

function normalize(content) {
  Object.keys(content).forEach(contentType => {
    const entities = content[contentType];

    if (Array.isArray(entities)) {
      entities.forEach(entity => {
        removeCruft(entity);
        normalizeTitle(entity);
        normalizeDate(entity);
        normalizeAcf(entity);
      });
    } else {
      removeCruft(entities);
      normalizeTitle(entities);
      normalizeDate(entities);
      normalizeAcf(entities);
    }
  });
  return content;
}

function normalizeDate(entity) {
  if (entity.date) {
    entity.date = new Date(entity.date);
  }
}

function removeCruft(entity) {
  delete entity._links;
  delete entity.link;
  delete entity.modified_gmt;
  delete entity.date_gmt;
  delete entity.guid;
}

function normalizeTitle(entity) {
  if (typeof entity.title !== 'object') return;
  entity.title = entity.title.rendered;
  delete entity.title.rendered;
}

function normalizeAcf(entity) {
  if ('acf' in entity) {
    Object.keys(entity.acf).forEach(acfPropertyName => {
      if (acfPropertyName === '') return;
      entity[acfPropertyName] = entity.acf[acfPropertyName];
    });
    delete entity.acf;
  }
}