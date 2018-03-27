
Related packages
================

* [promisefallback](https://www.npmjs.com/package/promisefallback):
  Try multiple strategies in series, resolve with the first result that
  isn't a rejected promise. Each strategy can be a value, a promise or
  a potentially promising function. Elegant and straightforward.

* [promise-fallback](https://www.npmjs.com/package/promise-fallback):
  Similar to above, but only accepts results that aren't empty
  (i.e. `null` or `undefined`).

* [promise-or](https://www.npmjs.com/package/promise-or):
  Even more strict – only accepts `true`-y results.

* [promise-map-first](https://www.npmjs.com/package/promise-map-first):
  Map a promise-returning function over a list of values,
  ignore rejections, resolve with the result *and index* of the first
  resolved promise.
  * At time of writing, doesn't seem to support resolving to just the value.
    Also no option to get the input value alongside the input index.



