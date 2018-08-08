export default function () {
  return function pathPlugin (files, metalsmith, done) {
    Object.keys(files).forEach(file => {
      const fileMeta = files[file]
      const { path } = fileMeta
      if (!path) return

      const filePath = buildFilePath(path)
      files[filePath] = fileMeta
      delete files[file]
    })
    done()
  }
}

function buildFilePath (path) {
  if (path.substr(-1) === '/') {
    return `${path}index.html`
  }

  return path
}
