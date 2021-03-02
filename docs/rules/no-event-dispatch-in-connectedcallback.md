# No Event Dispatch in connectedCallback

The intent of the `connectedCallback` is to set up event listeners and instantiate state. The `connectedCallback` fires synchronously once an element has been appended to the DOM. Dispatching events during this callback will trigger any event listeners added before the element is appended to the DOM, but any event listeners added in _reaction_ to being appended to the DOM, such as `MutationObserver` callbacks won't be triggered, because these are queued _after_ `connectedCallback`. This can often lead to difficult to use events, because the order of adding event listeners is tightly bound to the flow of execution.

If you need to fire an event during the `connectedCallback` life cycle hook, it should be queued in a "MicroTask" (e.g. `Promise.resolve().then(() => ...)`, or "Task" (e.g. `setTimeout(() => ..., 0)`), so that it fires asynchronously, providing consumers of the element more flexibility of when event listeners need to be bound.
