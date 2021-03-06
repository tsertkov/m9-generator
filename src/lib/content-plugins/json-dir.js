import requireDir from 'require-dir'
import { existsSync } from 'fs'

export default function (dirPath) {
  return function jsonDirPlugin (content, next) {
    if (!existsSync(dirPath)) return next()
    Object.assign(content, requireDir(dirPath))
    next()
  }
}
