const s = require('../custom-selectors')
const url = new URL(require('../../package.json').homepage)
url.pathname += '/blob/main/docs/rules/no-constructor.md'
const classCount = new WeakMap()
module.exports = {
  meta: {
    type: 'layout',
    docs: {description: '', url: require('../url')(module)}
  },
  schema: [],
  create(context) {
    return {
      [s.HTMLElementClass](node) {
        let count = classCount.get(context) || 0
        count += 1
        classCount.set(context, count)
        if (count > 1) {
          context.report(node, 'Only one Custom Element should be specified per file')
        }
      }
    }
  }
}
