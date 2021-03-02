const rule = require('../lib/rules/define-tag-after-class-definition')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})

ruleTester.run('define-tag-after-class-definition', rule, {
  valid: [{code: 'class SomeMap extends Map {}', filename: 'not-an-element.js'}],
  invalid: [
    {
      code: '',
      filename: 'barfooelement.ts',
      errors: [
        {
          message: 'File name should be "foo-bar-element" or "fooBarElement" but was "barfooelement"',
          type: 'ClassDeclaration'
        }
      ]
    }
  ]
})
