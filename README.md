# m9-generator

> Static site generator powered by `webpack` bundling, `handlebars` templating and `browser-sync` live-reloading.

## Table of Contents

* [Overview](#overview)
* [Installation](#installation)
  + [Yarn tasks as package.json scripts](#yarn-tasks-as-packagejson-scripts)
* [CLI interface](#cli-interface)
* [API interface](#api-interface)
* [Development mode](#development-mode)
* [Source and Destination directories](#source-and-destination-directories)
* [Stages](#stages)
* [Entrypoint files](#entrypoint-files)
* [Target browsers](#target-browsers)
* [Babel](#babel)
* [Handlebars](#handlebars)
  + [Partials](#partials)
  + [Layouts](#layouts)
  + [Helpers](#helpers)
  + [Embedded handlebars-helpers](#embedded-handlebars-helpers)
* [Webpack](#webpack)
  + [Development and Production modes](#development-and-production-modes)
  + [Handlebars loader](#handlebars-loader)
  + [Babel loader](#babel-loader)
  + [PostCSS loader](#postcss-loader)
  + [Visualizer](#visualizer)
* [Metalsmith](#metalsmith)
  + [Configuration](#configuration)
  + [Front-matter](#front-matter)
  + [Handlebars template data context](#handlebars-template-data-context)
    - [System data](#system-data)
    - [Static content](#static-content)
    - [Dynamic content](#dynamic-content)
  + [Public directory](#public-directory)
* [Developing m9-generator](#developing-m9-generator)

## Overview

m9-generator is static site generator relying on `handlebars` for static files templating, `webpack` for JavaScript and CSS bundling and `browser-sync` for local live-reload development server.

m9-generator follows future-focused approach and provides support to new standard solutions when handling CSS and JavaScript.

- JavaScript: [Stage3](https://babeljs.io/docs/en/babel-preset-stage-3)
- CSS: [Stage2, nesting-rules, custom-media-queries](https://preset-env.cssdb.org/features)

## Installation

> NB! Use `yarn` instead of `npm`. m9-generator depends on `peerDependencies` in `package.json` and so far only `yarn` installs them.

> NB! It is assumed that per-site directory layout with package.json is used in this documentation examples. Use `yarn init` to create one.

Install `@tsertkov/m9-generator` as your local depencency:

```sh
$ yarn add @tsertkov/m9-generator
```

### Yarn tasks as package.json scripts

Add following `scripts` in your site `package.json`:

```json
"scripts": {
  "m9": "m9",
  "test": "m9 test",
  "dev": "m9 dev",
  "build": "m9 build"
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

## CLI interface

m9-generator comes with `m9` command line tool to execute `gulp` tasks.

Run `yarn run m9` to execute default help task printing complete list of available tasks to run with `yarn run m9 <task>`.

There are tasks and sub-tasks in m9-generator. Tasks are always a groups of sub-tasks.

Main tasks are:
- `build`: build static site files into destination directory
- `dev`: continuously build and live-reload site with local development server
- `test`: test site

Run `./node_modules/.bin/m9` to see default help screen:

```
Main Tasks
------------------------------
    build
    dev
    help
    test

Sub Tasks
------------------------------
    build-clean
    build-copy
    build-metalsmith
    build-webpack
    dev-browsersync
    dev-watch
    test-standard
```

Run `./node_modules/.bin/m9 --tasks` to see complete task tree generated by `gulp`.

```
[13:23:38] ├── build-clean
[13:23:38] ├── build-copy
[13:23:38] ├── build-metalsmith
[13:23:38] ├── build-webpack
[13:23:38] ├── dev-browsersync
[13:23:38] ├── dev-watch
[13:23:38] ├── help
[13:23:38] ├── test-standard
[13:23:38] ├─┬ build
[13:23:38] │ └─┬ <series>
[13:23:38] │   ├── build-clean
[13:23:38] │   ├── build-copy
[13:23:38] │   ├── build-webpack
[13:23:38] │   └── build-metalsmith
[13:23:38] ├─┬ dev
[13:23:38] │ └─┬ <series>
[13:23:38] │   ├── build-clean
[13:23:38] │   ├── build-copy
[13:23:38] │   ├── dev-browsersync
[13:23:38] │   ├── build-metalsmith
[13:23:38] │   └── dev-watch
[13:23:38] ├─┬ test
[13:23:38] │ └─┬ <series>
[13:23:38] │   └── test-standard
[13:23:38] └─┬ default
[13:23:38]   └─┬ <series>
[13:23:38]     └── help
```

## API interface

m9-generator exports preconfigured `gulp` instance. See [gulp API docs](https://github.com/gulpjs/gulp/blob/master/docs/API.md) for details.

Example using m9-generator API:

```javascript
const m9 = require('@tsertkov/m9-generator')()
m9.series('build')(err => {
  if (err) {
    console.log('error happened', err)
  } else {
    console.log('build done')
  }
})
```

## Development mode

`yarn run dev` executes BrowserSync serving static files from build directory connected to webpack-dev-middleware for dynamic asset serving.

Look for BrowserSync details in output:

```
[Browsersync] Access URLs:
 --------------------------------------
       Local: https://localhost:3000
    External: https://192.168.0.1:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.0.1:3001
 --------------------------------------
[Browsersync] Serving files from: /Users/example/Projects/example.com/build
```

Updates to most of the `src/**/*` files must trigger recompilation and live-reload updated pages opened in browsers.

Run `yarn run test` to execute automated tests for current site.

## Source and Destination directories

`m9` works by reading input from files in source directory, builds site, then persists files in destination directory. By default source and destination directories are `./src` and `./build` accordingly.

Directories can be set with command line argument `--src=<SRC>`, `--dst=<DST>` or environment variable `SRC` and `DST`.

## Stages

Stage defaults to `development` and defines environment current site is building for.

Stage can be set with command line argument `--stage` or `STAGE` environment variable:

- `STAGE=staging yarn run build`
- `yarn run build --stage=staging`

## Entrypoint files

m9-generator uses `metalsmith` to build static files and `webpack` to bundle JavaScript and CSS. Both are relying on entrypoint files as their input.

Each file matched by `<SRC>/pages/**/*.hbs` pattern is processed by `metalsmith` resulting in one or many files build in destination directory. All other files in `<SRC>/pages/**/*` are copied as is.

Each file matched by `<SRC>/scripts/*.js|.css` pattern is bundled in corresponding JS or CSS file in `<DST>/assets` directory.

## Target browsers

Webpack loaders for JavaScript and CSS are respecting configured target browsers defined in [`.browserslistrc`](https://www.npmjs.com/package/browserslist) file.

> NB! The most pragmatic browserlist query is used by default when `.browserslistrc` file is not given.

## Babel

Two different babel transformation processes are running in m9-generator. One is done by `@babel/register` transpiling files on the fly for current node version using require hook. Another by webpack bundling client-side package with `babel-loader`.

Both transformations use the same presets `@babel/preset-stage-3` and `@babel/preset-env`, but differ in targets for `preset-env`.

## Handlebars

Handlebars is simple, powerful and extendable templating system. Custom Partials and Helpers allow building reusable components with ease. Read more on https://handlebarsjs.com/.

### Partials

By default handlebars partials are loaded from `<SRC>/partials/*.hbs`. Read more about handlebars partials on https://handlebarsjs.com/partials.html.

### Layouts

Layouts are implemented by native handlebars [partial blocks](https://handlebarsjs.com/partials.html#partial-block).

Layout example `<SRC>/partials/layout-default.hbs`:

```handlebars
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{{title}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="{{__assets.[styles.css]}}">
</head>
<body>
  {{> header}}
  <section class="content">
    {{> @partial-block}}
  </section>
  {{> footer}}
  <script src="{{__assets.[scripts.js]}}"></script>
</body>
</html>
```

Page template example `<SRC>/pages/index.html.hbs`:

```handlebars
---
title = "{{site.title}}"
---
{{#> layout-default}}
<article>
  <div class="body">
    {{{readme.content}}}
  </div>
</article>
{{/layout-default}}
```

### Helpers

Helpers are loaded with `<SRC>/helpers/*.js` pattern.

These are native JavaScript files and must use `module.exports = (content) => 'output string'` format to enable dynamic loading.

### Embedded handlebars-helpers

188 helpers from [`handlebars-helpers`](https://github.com/helpers/handlebars-helpers) are available to handlebars engine. Before writing your own first consider searching similar in [handlebars-helpers](https://github.com/helpers/handlebars-helpers).

## Webpack

Webpack searches for entry points in `<SRC>/scripts/*.js` and `<SRC>/styles/*.css` and writes files in `<DST>/assets/`.

There is `<DST>/assets/manifest.json` file with assets manifest pre-loaded into templating context as `__assets` variable.

### Development and Production modes

`development` mode is enabled when `stage === 'development'` is true. Otherwise `production` mode is active. Different optimizations and loader settings are enabled based on active mode.

### Handlebars loader

`*.hbs` files are converted to compiled handlebars template functions including resolved helpers, partials and runtime automatically.

```JavaScript
import itemCard from '../../partials/item-card.hbs'

// ..
const item = { key: "value" }
const html = itemCard(item)
// ..

```

Read more about `handlebars-loader` at https://github.com/pcardune/handlebars-loader#readme.

### Babel loader

`*.js` files are processed by babel using browsers target defined in `.browserslistrc` or default one for browsers.

Ream more about `babel-loader` at https://github.com/babel/babel-loader#readme.

### PostCSS loader

`*.css` files are processed by PostCSS with `postcss-preset-env`.

Read more about `postcss-loader` at https://github.com/postcss/postcss-loader#readme.

### Visualizer

In `development` mode [webpack-visualizer-plugin](https://github.com/chrisbateman/webpack-visualizer#readme) is enabled and results are avalable at `https://localhost:3000/webpack-visualizer/` or other domain/port you use locally.

## Metalsmith

Metalsmith compiles static files found in `<SRC>/pages/` into `<DST>/` directory. It extracts front-matter headers and passes `*.hbs` files through Handlebars templating system.

### Configuration

m9-generator builds single configuration object internally. This object can be modified per site by exporting configuration function in `<SRC>/config.js`.

Stage aware configuration file example:

```JavaScript
const config = {
  default: {
    apiEndpoint: 'https://staging-api.example.com'
  },
  development: {
    site_url: 'https://localhost:3000'
  },
  staging: {
    site_url: 'https://staging.example.com'
  },
  production: {
    site_url: 'https://example.com',
    apiEndpoint: 'https://api.example.com'
  }
}

module.exports = m9config => Object.assign(
  m9config,
  Object.assign(
    {},
    config.default,
    config[m9config.stage]
  )
)
```

### Front-matter

Metalsmith is parsing front-matter headers in template files using `---` as delimiter. Front-matter content must be in TOML format. It is used to control metalsmith plugins and overwrite data context variables.

### Data context

m9-generator preloads data context and exponses it to Handlebars templating. There are two types of input data: **static content** in form of json files and **dynamic content** as JavaScript files.

#### System data

System variables avaialble in template context are prefixed with `__`.

| Variable name | Description |
| --- | --- |
| `__assets` | Webpack assets manifest: `asset-name -> asset-filename` |
| `__config` | Configuration object |

#### Static content by `json-dir` content plugin

Static content is loaded from JSON files found in `<SRC>/content/static` directory.

For example following static content files in `content/static` directory:

```javascript
// content/static/user.json
{
  [
    "name": "user1",
    "email": "user1@example.com",
    "group": [{
      "ID": 1
    }
  ],
  [
    "name": "user2",
    "email": "user2@example.com",
    "group": [{
      "ID": 2
    }
  ]
}

// content/static/group.json
{
  [
    "id": 1,
    "name": "group1"
  ],
  [
    "id": 2,
    "name": "group2"
  ]
}

// content/static/site.json
{
  "adminEmail": "admin@example.com",
  "title": "site title",
  "description": "site description"
}
```

This content is accessible in handlebars templates as variables: `user`, `group` and `site` accordingly to JSON file names.

```handlebars
site title:                                 {{site.title}}
name property of first user in collection:  {{user.[0].name}}
name property of first group in collection: {{group.[0].name}}
first user group name:                      {{user.[0].group.[0].name}}
second user group name:                     {{user.[1].group.[0].name}}
```

#### Dynamic content by `js-dir` content plugin

It is possible to define dynamic (programmable) content and expose it to template data. Each JavaScript file in `<SRC>/content/dynamic` must follow pattern `<content-type>.js` and export function of a form:

```javascript

module.exports = function (proto, content, config) {
  // do something with the proto (it is actual entity obj in fact)
  Object.defineProperty(proto, 'content', {
    configurable: true,
    enumerable: true,
    get: () => {
      // return smth
      return 'empty value'
    }
  })

  return proto
}
```

Augmenting initial content loaded from static JSON files with dynamic functions is a common integration method. In cases when static content of the same content type is not found new empty object is passed as `proto` to a content function.

### Public directory

All files and folders from `<SRC>/public/` directory are copied to destination `<DST>` directory. This is a good place to put static image files, favicons, etc.

## Custom gulp tasks

Gulp tasks found matching `<SRC>/tasks/*.js` are automatically registrered and available via m9 cli.

For example `<SRC>/tasks/custom-task.js` to define `custom-task`:
```javascript
module.exports = async function customTask (config) {
  console.log('Custom task test')
}
```

## Developing m9-generator

### JavaScript transpilation

JavaScript sources of m9-generator are transpiled with babel. Sources are located in `src/` directory. Compiled files are placed in `dist/`.

Run `npm run build-dist` to compile files in `dist/`.

By default m9 runs from `dist/` directory. To run from `src/` during development pass `--m9-use-src` command line argument.

### Embedded documentation site

Documentation site is embedded with m9-generator. Its source directory is `docs-src/` and destination `docs/`.

Run `npm run dev` to start development server for documentation site.

### Using `npm link`

Run `npm link` inside m9-generator local repo to link it from global node_modules. To link dev version of m9-generator in site project run `npm link @tsertkov/m9-generator`.

For example assume having `~/m9-generator` and `~/my-example-site` with generator repo and site repo accordingly. Then to run example-site using m9-generator from `~/m9-generator` do the following:

```sh
$ cd ~/m9-generator
$ npm link
$ cd ~/my-example-site
$ npm link @tsertkov/m9-generator
$ npm run dev --m9-use-src
```

### Publish new npm version

Use `npm version` command to publish new version of npm package and push new git tag to remote.
