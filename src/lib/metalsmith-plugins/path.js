import { dirname, join } from 'path'

export default function () {
  return function pathPlugin (files, metalsmith, done) {
    Object.keys(files).forEach(fileName => {
      const fileMeta = files[fileName]
      const { path } = fileMeta
      if (!path) return

      const filePath = buildFilePath(path, fileName)
      files[filePath] = fileMeta
      delete files[fileName]
    })
    done()
  }
}

function buildFilePath (path, tplPath) {
  let newPath = path.replace(/\/+/, '/')
  const tplDir = dirname(tplPath)

  if (newPath[0] === '/') {
    newPath = newPath.substr(1)
  } else if (tplDir !== '.') {
    newPath = join(tplDir, newPath)
  }

  if (newPath.substr(-1) === '/') {
    newPath += 'index.html'
  }

  return newPath
}
