// var requireDir = require('require-dir');
// var dir = requireDir('./example/src/helpers');
// console.log(dir);
//
const path = require('path')
const fs = require('fs')
const dir = './example/src/partials'

const files = fs.readdirSync(dir).reduce((files, filename) => {
  const partialName = path.parse(filename)['name']
  const filePath = path.join(dir, filename)
  files[partialName] = fs.readFileSync(filePath, { encoding: 'utf8' })
  return files
}, {})


console.log(files)

