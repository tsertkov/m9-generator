#!/usr/bin/env node

const path = require('path')
const argv = require('yargs').parse(process.argv)

// TODO autodetect if m9 should run from src when this directory is
// available and use dist otherwise (npm dependency mode)

// Run gulp from src when --m9-use-src argument is given on command line
const m9UseSrc = 'm9-use-src' in argv
const m9Dir = path.join(__dirname, '..', m9UseSrc ? 'src' : 'dist')

require('@babel/register')
require(path.join(m9Dir, 'gulp-runner'))
  .runGulp(process.cwd())
