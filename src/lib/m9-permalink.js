export default m9permalink

function m9permalink () {
  return (files, metalsmith, done) => {
    Object.keys(files).forEach(file => {
      const fileMeta = files[file]
      const permalinkPath = fileMeta.permalink
      if (!permalinkPath) return

      files[permalinkPath] = fileMeta
      delete files[file]
    })
    done()
  }
}
