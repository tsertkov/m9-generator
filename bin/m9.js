#!/usr/bin/env node

const path = require('path')

// Babel configuration used to transpile package client
// local JavaScript files
const BABEL_CONFIG_CLIENT = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }],
    '@babel/preset-stage-3'
  ]
}

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

// TODO autodetect if m9 should run from src when this directory is
// available and use dist otherwise (npm dependency mode)

// Run gulp from src when --m9-use-src argument is given on command line
const m9UseSrc = process.argv.includes('--m9-use-src')
const m9Dir = path.join(__dirname, '..', m9UseSrc ? 'src' : 'dist')

// Register require hook to transpile files on the fly
require('@babel/register')(Object.assign(
  {
    ignore: [
      'node_modules',
      path.join(__dirname, '..', 'dist'),
      // ignore node_modules from m9-generator when it is integrated
      // using `npm link` (usually for m9 development)
      path.join(__dirname, '..', 'node_modules')
    ]
  },
  // For some reason babel seems to ignore .babelrc when integrated with
  // register hook. Implementing here conditional babel configuration
  // logic to workaround this issue.
  m9UseSrc
    ? { extends: path.join(m9Dir, '.babelrc') }
    : BABEL_CONFIG_CLIENT
))

require(path.join(m9Dir, 'gulp-runner'))
  .runGulp(process.cwd())
