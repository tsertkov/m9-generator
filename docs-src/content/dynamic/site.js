module.exports = function (siteProto, content) {
  Object.defineProperty(siteProto, 'copyrightDate', {
    configurable: true,
    enumerable: true,
    get: () => '© 2016-' + new Date().getFullYear()
  })

  Object.defineProperty(siteProto, 'repository', {
    configurable: true,
    enumerable: true,
    get: () => require('../../../package.json')
      .repository
      .url
      .substr(4)
  })

  return siteProto
}
