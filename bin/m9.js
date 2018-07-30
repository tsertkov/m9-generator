#!/usr/bin/env node

require('..')({
  interfaceType: 'cli',
  useSrc: process.argv.includes('--m9-use-src'),
  devMode: process.argv.includes('dev')
})
