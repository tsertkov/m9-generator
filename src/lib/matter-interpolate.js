import { get } from 'lodash'
export default matterInterpolate

const VARIABLE_PATTERN = '\\$\\{([^}]+)\\}'
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

function resolve (path, object) {
  const value = get(object, path)
  if (value === undefined) {
    throw new Error('Cannot resolve data path: ' + JSON.stringify({
      path,
      object
    }, null, 2))
  }

  return value
}
