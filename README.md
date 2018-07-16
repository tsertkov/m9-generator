# m9 - site generator

> Static site generator powered by `gulp`, `webpack`, `metalsmith` and `handlebars`.

## Installation

### Yarn instead of Npm

Use `yarn` instead of `npm`. m9-generator depends on peerDependencies in package.json and so far only `yarn` installs them.

### Install m9-generator local dependemcy

Install `@tsertkov/m9-generator` as your local depencency by running:

`yarn install @tsertkov/m9-generator --save`

### Npm script automation

Add following `scripts` in your site `package.json`:

```js
"scripts": {
  "m9": "m9",
  "build": "m9 build",
  "dev": "m9 dev",
  "test": "m9 test"
}
```

To run gulp tasks with `yarn` locally

```
$ yarn test
$ yarn run dev
$ yarn run build
$ yarn run m9
$ yarn run m9 <task>
```

## Usage

TBD

## Principles

- Opinionated but provides generic alternative
    - extending gulp and metalsmith workflows with local configs
- Templates live next to Data they render (data snapshot)
    - possibility to track template + data + build results in separate repo
- Generator is decoupled from template and data
    - designed to be used as npm module
    - generator may be updated independently of templates
- No tolerance for generation errors - no deploy for potentially broken builds
- Prefer templates over plugins
