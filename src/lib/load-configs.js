import { existsSync } from 'fs'
import path from 'path'

export default loadConfigs

function loadConfigs (config, dir) {
  const configJs = path.join(dir, 'config.js')
  if (existsSync(configJs)) {
    require(configJs)(config)
  }
}
