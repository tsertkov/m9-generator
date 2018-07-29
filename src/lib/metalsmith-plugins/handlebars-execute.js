const fileMetaKey = 'handlebarsCompiledTpl'

export default function () {
  return function handlebarsExecute (files, metalsmith, done) {
    const metadata = metalsmith.metadata()
    Object.keys(files).forEach(file => {
      const fileMeta = files[file]
      const compiledTpl = fileMeta[fileMetaKey]
      if (!compiledTpl) return

      fileMeta.contents = compiledTpl({
        ...metadata,
        ...fileMeta
      })
    })
    done()
  }
}
