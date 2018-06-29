#!/usr/bin/env node

const path = require('path')

// Normalize arguments array by placing items which are not starting with '-'
// to the beginning of array. This is necessary to allow specifying gulp task
// after custom optional arguments and allow calling 'npm run m9 <task>'.
process.argv = process.argv.slice(0, 2).concat(
  process.argv.slice(2).sort((a, b) => {
    const a0 = a[0]
    const b0 = b[0]
    if (a0 === b0) return 0
    if (a0 === '-') return 1
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
      path.join(__dirname, '..', 'dist')
    ]
  },
  // For some reason babel seems to ignore .babelrc when integrated with
  // register hook. Implementing here conditional babel configuration
  // logic to workaround this issue.
  m9UseSrc
    ? { extends: path.join(m9Dir, '.babelrc') }
    : {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }],
        '@babel/preset-stage-3'
      ]
    }
))

require(path.join(m9Dir, 'gulp-runner'))
  .runGulp(process.cwd())
