import ware from 'ware'
import config from '../config'

export default class Content {
  constructor () {
    this.middleware = ware()
  }

  use (plugin) {
    return this.middleware.use(plugin)
  }

  getContext () {
    return new Promise((resolve, reject) => {
      this.middleware.run({
        __config: config
      }, (err, context) => {
        if (err) return reject(err)
        resolve(context)
      })
    })
  }
}
