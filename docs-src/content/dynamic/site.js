module.exports = function (siteProto, content) {
  Object.defineProperty(siteProto, 'copyrightDate', {
    configurable: true,
    enumerable: true,
    get: () => '© 2016-' + new Date().getFullYear()
  })

  return siteProto
}
