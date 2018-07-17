# m9 - site generator

> Static site generator powered by `gulp`, `webpack`, `metalsmith` and `handlebars`.

## Overview

TBD

- Babel
- PostCSS
- Handlebars
- Webpack
- Metalsmith

## Installation

### Use Yarn instead of Npm

Use `yarn` instead of `npm`. m9-generator depends on `peerDependencies` in `package.json` and so far only `yarn` installs them.

### Install m9-generator local dependency

Install `@tsertkov/m9-generator` as your local depencency by running:

```sh
$ yarn add @tsertkov/m9-generator
```

## Stages
## Command line tool
### Commands overview
### package.json scripts

Add following `scripts` in your site `package.json`:

```json
"scripts": {
  "m9": "m9",
  "build": "m9 build",
  "dev": "m9 dev",
  "test": "m9 test"
}
```

To run m9-generator tasks with `yarn` locally

```sh
$ yarn test
$ yarn run dev
$ yarn run build
$ yarn run m9
$ yarn run m9 <task>
```

## Source and Build directories
## BrowserSync
## Entry points
### Webpack entry points
### Static files entry points
## Target browsers
## Babel
### Node.js babel-register
### Webpack babel-loader
## Handlebars
### Partials
### Layouts
### Helpers
### Embedded handlebars-helpers package
## Webpack
### Handlebars loader
### Babel loader
### PostCSS loader
## Metalsmith
### Static content
### Dynamic content

## Developing m9-generator

TBD

- src/ and dist/ directories
- embedded docs site
- npm link
- publishing new package version
