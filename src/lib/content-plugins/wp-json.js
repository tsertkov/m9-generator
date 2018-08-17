import { fetchWpContent } from '../fetch-wp'

export default function (options) {
  return async function updateContentPlugin (content, next) {
    Object.assign(
      content,
      await fetchWpContent(options)
    )
    next()
  }
}
