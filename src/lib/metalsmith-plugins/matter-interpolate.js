import matterInterpolate from '../matter-interpolate'

const EXCLUDE_PROPS = [
  'contents',
  'mode'
]

export default function () {
  return function matterInterpolatePlugin (files, metalsmith, done) {
    Object.keys(files).forEach(file => (
      processFileMeta(files[file], metalsmith.metadata())
    ))
    done()
  }
}

function processFileMeta (fileMeta, metadata) {
  Object.keys(fileMeta).forEach(propName => {
    const propValue = fileMeta[propName]
    if (EXCLUDE_PROPS.includes(propName)) return
    if (typeof propValue !== 'string') return
    fileMeta[propName] = matterInterpolate(propValue, metadata)
  })
}
