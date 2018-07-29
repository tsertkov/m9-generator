import handlebars from 'handlebars'
const fileMetaKey = 'handlebarsCompiledTpl'

export default function ({ partials = {}, helpers = {} }) {
  return function handlebarsCompile (files, metalsmith, done) {
    Object.keys(helpers).forEach(helper => {
      handlebars.registerHelper(helper, helpers[helper])
    })

    Object.keys(partials).forEach(partial => {
      handlebars.registerPartial(partial, partials[partial])
    })

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
