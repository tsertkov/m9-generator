#!/usr/bin/env node

const path = require('path')
const argv = require('yargs').parse(process.argv)

// Run gulp from src in m9 development mode
const m9Env = argv['m9-env'] || process.env.M9_ENV || 'production'
const m9Dir = m9Env === 'development' ? 'src' : 'dist'
const gulpfile = path.resolve(__dirname, '..', m9Dir, 'gulpfile.js')

// Gulp automatically changes working directory to the one containing gulpfile.js
// To correctly resolve site source directory relative to current working directory
// it is necessary to know what was initial working directory.
//
// Using command line arguments interface to pass intial working directory to
// code running under gulp control.

const m9InitialCwd = process.cwd()
process.argv.push(
  `--gulpfile=${gulpfile}`,
  `--m9-initial-cwd=${m9InitialCwd}`
)

require('@babel/register')
require('gulp/bin/gulp')
