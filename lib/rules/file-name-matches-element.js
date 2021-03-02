const s = require('../custom-selectors')
const {basename, extname} = require('path')
const transformFuncs = {
  snake(str) {
    return str
      .replace(/([A-Z]($|[a-z]))/g, '_$1')
      .replace(/^_/g, '')
      .toLowerCase()
  },
  kebab(str) {
    return str
      .replace(/([A-Z]($|[a-z]))/g, '-$1')
      .replace(/^-/g, '')
      .toLowerCase()
  },
  pascal(str) {
    return str.replace(/^./g, c => c.toLowerCase())
  },
  none(str) {
    return str
  }
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)}
  },
  schema: [
    {
      type: 'object',
      properties: {
        transform: {
          oneOf: [
            {enum: ['none', 'snake', 'kebab', 'pascal']},
            {
              type: 'array',
              items: {enum: ['none', 'snake', 'kebab', 'pascal']},
              minItems: 1,
              maxItems: 4
            }
          ]
        },
        suffix: {
          onfOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}]
        },
        matchDirectory: {
          type: 'boolean'
        }
      }
    }
  ],
  create(context) {
    return {
      [s.HTMLElementClass](node) {
        const name = node.id.name
        const names = [name]
        const filename = basename(context.getFilename(), extname(context.getFilename()))
        if (filename === '<input>' || filename === '<text>') return
        let {transform: transforms, suffix: suffixes} = context.options[0] || {}
        transforms = [].concat(transforms || ['kebab', 'pascal'])
        suffixes = [].concat(suffixes || [])
        for (const suffix of suffixes) {
          if (name.endsWith(suffix)) {
            names.push(name.substr(0, name.length - suffix.length))
          }
        }
        const allowedFileNames = new Set()
        for (const className of names) {
          for (const transform of transforms) {
            allowedFileNames.add(transformFuncs[transform](className))
          }
        }
        if (!allowedFileNames.has(filename)) {
          const allowed = Array.from(allowedFileNames).join('" or "')
          context.report(node, `File name should be "${allowed}" but was "${filename}"`)
        }
      }
    }
  }
}
