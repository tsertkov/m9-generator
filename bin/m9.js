#!/usr/bin/env node

const path = require('path')
const gulpfile = path.resolve(__dirname, '..', 'dist', 'gulpfile.js')
const cwd = process.cwd()

process.argv.push(
  `--gulpfile=${gulpfile}`,
  `--originalCwd=${cwd}`
)

require('babel-register')
require('gulp/bin/gulp')
