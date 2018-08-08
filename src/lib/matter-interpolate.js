import { get } from 'lodash'
import handlebars from 'handlebars'
export default matterInterpolate

const VARIABLE_PATTERN = '{{\\s*([^}]+)\\s*}}'
const VARIABLE_REGEXP = new RegExp(VARIABLE_PATTERN, 'g')
const SINGLE_VARIABLE_REGEXP = new RegExp(`^${VARIABLE_PATTERN}$`)

function matterInterpolate (input, metadata) {
  let result = input.match(SINGLE_VARIABLE_REGEXP)
  if (result) {
    const variable = result[1]
    return resolve(variable, metadata)
  }

  return input.replace(VARIABLE_REGEXP, (match, variable) =>
    resolve(variable, metadata))
}

function resolvePath (path, object) {
  const value = get(object, path)
  if (value === undefined) {
    throw new Error('Cannot resolve data path: ' + JSON.stringify({
      path,
      object
    }, null, 2))
  }

  return value
}

function resolve (path, object) {
  const parts = path.split(/\s+/).filter(v => v !== '')
  if (parts.length === 1) return resolvePath(parts[0], object)

  const [
    helperName,
    ...params
  ] = parts

  const resolvedParams = params.map(param => resolvePath(param, object))
  const helper = handlebars.helpers[helperName]
  return helper(...resolvedParams)
}
