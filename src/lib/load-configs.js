import { existsSync } from 'fs'
import path from 'path'
import { merge } from 'lodash'

export default loadConfigs

function loadConfigs (src, configObj) {
  loadConfigJson(src, configObj)
  loadConfigJs(src, configObj)
}

function loadConfigJson (src, configObj) {
  [
    'config.json',
    `config.${configObj.stage}.json`
  ].forEach(configFile => {
    const configJson = path.join(src, configFile)
    if (existsSync(configJson)) {
      const loadedConfigObj = require(configJson)
      merge(configObj, loadedConfigObj)
    }
  })
}

function loadConfigJs (src, configObj) {
  const configJs = path.join(src, 'config.js')
  if (existsSync(configJs)) {
    require(configJs)(configObj)
  }
}
