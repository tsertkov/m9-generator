import handlebars from 'handlebars'
import { existsSync } from 'fs'
import requireDir from 'require-dir'
import readDirFiles from '../read-dir-files'

const fileMetaKey = 'handlebarsCompiledTpl'

export default function ({partials, helpers}) {
  return function handlebarsCompile (files, metalsmith, done) {

    registerHelpersDir(helpers)
    registerPartialsDir(partials)

    Object.keys(files).forEach(file => {
      if (file.substr(-4) !== '.hbs') return
      const fileMeta = files[file]
      const template = fileMeta.contents.toString('utf8')
      const compiled = handlebars.compile(template)
      fileMeta[fileMetaKey] = compiled

      const newFile = file.substring(0, file.length - 4)
      files[newFile] = fileMeta
      delete files[file]
    })
    done()
  }
}

function registerHelpersDir (dir) {
  if (Array.isArray(dir)) {
    dir.forEach(registerHelpersDir)
    return
  }

  if (!existsSync(dir)) return

  const helpers = requireDir(dir)
  Object.keys(helpers).forEach(helper => {
    handlebars.registerHelper(helper, helpers[helper])
  })
}

function registerPartialsDir (dir) {
  if (Array.isArray(dir)) {
    dir.forEach(registerPartialsDir)
    return
  }

  if (!existsSync(dir)) return

  const partials = readDirFiles(dir)
  Object.keys(partials).forEach(partial => {
    handlebars.registerPartial(partial, partials[partial])
  })
}
