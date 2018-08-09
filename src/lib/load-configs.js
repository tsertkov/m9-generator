import { existsSync } from 'fs'
import path from 'path'
import { merge } from 'lodash'

export default loadConfigs

function loadConfigs (src, configObj) {
  const configJson = loadConfigJson(src, configObj)
  const configJs = loadConfigJs(src, configJson)
  return configJs
}

function loadConfigJson (src, configObj) {
  const result = { ...configObj }
  ;[
    'config.json',
    `config.${configObj.stage}.json`
  ].forEach(configFile => {
    const configJson = path.join(src, configFile)
    if (existsSync(configJson)) {
      const loadedConfigObj = require(configJson)
      merge(result, loadedConfigObj)
    }
  })

  return result
}

function loadConfigJs (src, configObj) {
  const configJs = path.join(src, 'config.js')
  return existsSync(configJs)
    ? require(configJs)(configObj)
    : configObj
}
