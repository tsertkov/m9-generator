const path = require('path')
const gulp = require('gulp')
const babelRegister = require('@babel/register')
const registry = require('./registry')

module.exports = function m9GeneratorFactory ({
  interfaceType = 'api',
  useSrc = false,
  devMode = false,
  cwd: givenCwd
} = {}) {
  const cwd = typeof givenCwd === 'undefined'
    ? process.cwd()
    : givenCwd

  populateRegistry({ cwd, devMode })
  if (interfaceType === 'api') return apiFactory(useSrc)
  if (interfaceType === 'cli') return cliFactory(useSrc)
  throw new Error(`Unsupported interfaceType given: '${interfaceType}'`)
}

function cliFactory (useSrc) {
  registerBabel(useSrc)
  normalizeCliArgs()
  const gulpfile = getGulpfilePath(useSrc)
  process.argv.push(`--gulpfile=${gulpfile}`)
  require('gulp/bin/gulp')
}

function apiFactory (useSrc) {
  registerBabel(useSrc)
  require(getGulpfilePath(useSrc))
  return gulp
}

function populateRegistry ({ cwd, devMode }) {
  // Gulp automatically changes working directory to the one containing gulpfile.js
  // To correctly resolve site source directory relative to current working directory
  // it is necessary to know what was initial working directory.
  //
  // Given cwd is stored in registry object for accing it under gulp environment.
  registry.cwd = cwd

  // Define early dev mode as it is required before loading dynamic configuration
  registry.isDevelopment = devMode
}

function getM9Dir (useSrc) {
  return path.join(
    __dirname,
    useSrc ? 'src' : 'dist'
  )
}

function getGulpfilePath (useSrc) {
  return path.join(
    getM9Dir(useSrc),
    'gulpfile.js'
  )
}

function registerBabel (useSrc) {
  babelRegister(Object.assign(
    {
      ignore: [
        'node_modules',
        path.join(__dirname, 'dist'),
        // ignore node_modules from m9-generator when it is integrated
        // using `npm link` (usually for m9 development)
        path.join(__dirname, 'node_modules')
      ]
    },
    useSrc
      // Babel configuration used when m9 runs from src
      ? {
        extends: path.join(getM9Dir(useSrc), '.babelrc')
      }
      // Babel configuration used when m9 runs from dist
      : {
        presets: [
          ['@babel/preset-env', {
            targets: {
              node: 'current'
            }
          }]
        ],
        'plugins': [
          ['@babel/plugin-proposal-class-properties', { 'loose': false }],
          '@babel/plugin-proposal-json-strings'
        ]
      }
  ))
}

function normalizeCliArgs () {
  // Normalize arguments array by placing items which are not starting with '-'
  // to the beginning of array. This is necessary to allow specifying gulp task
  // after custom optional arguments and allow calling 'npm run m9 <task>'.
  process.argv = process.argv.slice(0, 2).concat(
    process.argv.slice(2).sort((a, b) => {
      if (a[0] === b[0]) return 0
      if (a[0] === '-') return 1
      return -1
    })
  )
}
