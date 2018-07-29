import path from 'path'
import dodoSlug from 'slug'
import matterInterpolate from '../matter-interpolate'

const META_KEY = 'meta_to_files'
const INDEX_FILE = 'index.html'

export default function ({ slug }) {
  let slugFn
  if (typeof slug === 'function') {
    slugFn = slug
  } else if (slug) {
    slugFn = function slugFn (v) {
      return dodoSlug(v, slug)
    }
  } else {
    slugFn = dodoSlug
  }

  return function metaToFilesPlugin (files, metalsmith, done) {
    Object.keys(files).forEach(file => {
      const fileMeta = files[file]
      const pluginMeta = fileMeta[META_KEY]
      if (!pluginMeta) return

      const {
        model_name: modelName,
        filename_pattern: filenamePattern
      } = pluginMeta

      const {
        [modelName]: entities
      } = metalsmith.metadata()

      entities.forEach(entity => {
        let newFileMeta = { ...fileMeta }
        delete newFileMeta[META_KEY]

        const data = {
          ...metalsmith.metadata(),
          [modelName]: entity
        }

        // transfer plugin extra props to root scope in frontmatter
        Object.keys(pluginMeta).forEach(key => {
          if (['model_name', 'filename_pattern'].includes(key)) return
          newFileMeta[key] = matterInterpolate(pluginMeta[key], data)
        })

        const filename = buildFilename(filenamePattern, data, file, slugFn)
        files[filename] = newFileMeta
      })

      // unpublish meta template file
      delete files[file]
    })

    done()
  }
}

function buildFilename (filenamePattern, data, tplFilename, slugFn) {
  let filename = matterInterpolate(filenamePattern, data, slugFn)

  if (isPermalink(filename)) {
    filename += INDEX_FILE
  } else {
    const extension = path.extname(tplFilename)
    if (extension.length) {
      filename += `.${extension}`
    }
  }

  return filename
}

function isPermalink (filename) {
  return filename.substr(-1) === '/'
}
