# No Exports with Element

This rule disallows exports (other than the element class) in a file with a Custom Element.

## Rule Details

👎 Examples of **incorrect** code for this rule:

```js
```

👍 Examples of **correct** code for this rule:

```js
```

Exporting values other than the Custom Element can cause confusion when importing code. It may also be a sign that there is too much code in a single file. If you have utility functions that the Custom Element depends on, it might be worth splitting this out into a separate file.

## When Not To Use It

If you intentionally want multiple exports in a single file then you can disable this rule.

## Version

This rule was introduced in v0.0.1
