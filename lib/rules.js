module.exports = {
  'define-tag-after-class-definition': require('./rules/define-tag-after-class-definition'),
  'expose-class-on-global': require('./rules/expose-class-on-global'),
  'extends-correct-class': require('./rules/extends-correct-class'),
  'file-name-matches-element': require('./rules/file-name-matches-element'),
  'no-constructor': require('./rules/no-constructor'),
  'no-dom-traversal-in-connectedcallback': require('./rules/no-dom-traversal-in-connectedcallback'),
  'no-exports-with-element': require('./rules/no-exports-with-element'),
  'one-element-per-file': require('./rules/one-element-per-file'),
  'valid-tag-name': require('./rules/valid-tag-name')
}
