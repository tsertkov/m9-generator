import path from 'path'

// Registry object instance
export const registry = {}

export function runGulp (cwd) {
  // Gulp automatically changes working directory to the one containing gulpfile.js
  // To correctly resolve site source directory relative to current working directory
  // it is necessary to know what was initial working directory.
  //
  // Given cwd is stored in registry object for accing it under gulp environment.
  registry.cwd = cwd

  // Define early dev mode as it is required before loading dynamic configuration
  registry.isDevTask = process.argv.includes('dev')

  const gulpfile = path.join(__dirname, 'gulpfile.js')
  process.argv.push(`--gulpfile=${gulpfile}`)
  require('gulp/bin/gulp')
}
