const s = require('../custom-selectors')
const ClassRefTracker = require('../class-ref-tracker')
const {builtInTagMap} = require('../tag-names')

function getExtendsOption(context, node) {
  if (!node) return null
  if (node.type !== 'ObjectExpression') return null
  const extendsOption = node.properties.find(p => p.key.name === 'extends')
  if (!extendsOption) return null
  const value = extendsOption.value
  if (value.type === 'Literal') return value.value
  if (value.type === 'TemplateLiteral' && value.expressions.length === 0) {
    return value.quasis.map(q => q.value.raw).join('')
  }
  return null
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {description: '', url: require('../url')(module)}
  },
  schema: [],
  create(context) {
    const classes = new ClassRefTracker(context)
    return {
      [s.HTMLElementClass](node) {
        classes.add(node)
      },
      [s.customElements.define](node) {
        const classRef = classes.get(node.arguments[1])
        if (!classRef) return
        const extendsTag = getExtendsOption(context, node.arguments[2])
        const desiredSuperName = builtInTagMap[extendsTag] || 'HTMLElement'
        if (!classRef.superClass) {
          return context.report(node.arguments[1], `Custom Element must extend ${desiredSuperName}`)
        }
        const superName = classRef.superClass.name
        if (superName !== desiredSuperName) {
          const entry = Object.entries(builtInTagMap).find(e => e[1] === superName)
          const expectedExtendsTag = entry && entry[0]
          if (extendsTag && expectedExtendsTag) {
            context.report(node, 'foobar')
          } else if (extendsTag && !expectedExtendsTag) {
            context.report(node, `${superName} !== ${desiredSuperName}`)
          } else if (!extendsTag && expectedExtendsTag) {
            context.report(
              node,
              `Custom Element must extend ${desiredSuperName}, or pass {extends:'${expectedExtendsTag}'} as a third argument to define`
            )
          } else {
            context.report(node, `Custom Element must extend ${desiredSuperName} not ${superName}`)
          }
        }
      }
    }
  }
}
