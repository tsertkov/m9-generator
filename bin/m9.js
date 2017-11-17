#!/usr/bin/env node

const path = require('path')
const gulpfile = path.resolve(__dirname, '..', 'dist', 'gulpfile.js')
const site = process.env.SITE
  ? path.resolve(process.env.SITE)
  : process.cwd()

// required gulp cli arguments
process.argv.push(
  `--gulpfile=${gulpfile}`,
  `--root=${site}`
)

require('babel-register')
require('gulp/bin/gulp')
