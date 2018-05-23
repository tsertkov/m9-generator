# m9 - site generator

> Static site generator powered by `gulp`, `metalsmith` and `webpack`.

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
