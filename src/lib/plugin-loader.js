import path from 'path'

export default function pluginLoader (pluginMeta, localPluginDir) {
  if (typeof pluginMeta === 'string') {
    pluginMeta = {
      name: pluginMeta,
      options: {}
    }
  }

  if (typeof pluginMeta !== 'object') {
    throw new Error(`Invalid plugin type: ${typeof pluginMeta}`)
  }

  const {
    name,
    options
  } = pluginMeta

  try {
    return require(path.join(localPluginDir, name))
      .default(options)
  } catch (e) {
  }

  try {
    return require(name)(options)
  } catch (e) {
  }

  throw new Error(`Failed to load plugin: '${name}'`)
}
