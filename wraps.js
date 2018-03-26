/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
/*global Promise: true */
'use strict';

module.exports = (function () {
  var EX = {}, unPr = Promise.resolve(), emAr = [];

  function flatten(a) { return emAr.concat.apply(emAr, a); }
  function isEmpty(x) { return ((x === undefined) || (x === null)); }

  function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }
  //function needFunc(x, a) {
  //  if (ifFun(x)) { return x; }
  //  throw new TypeError('Expected a function' + (a || '') + ', not ' + x);
  //}
  //function needFuncArgs(x, i) { return needFunc(x, ' as arg #' + (i + 1)); }
  function thenF(f, args, ctx) {
    if (ifFun(f)) { return unPr.then(f.bind(ctx, args)); }
    return Promise.resolve(f);
  }

  EX.ifEmpty = function (f, e) {
    function c(r) { return (isEmpty(r) ? Promise.resolve(e) : r); }
    return thenF(f, arguments, this).then(c);
  };

  function chainCore(funcs, step) {
    var n = (+funcs.length || 0);
    return function () {
      if (!n) { return Promise.resolve(); }
      var z = { i: 0, n: n }, h;
      function g(r) {
        z.i += 1;
        z.r = r;
        if (step) { step(z); }
        if (z.i < n) {
          h = funcs[z.i];
          z.r = (ifFun(h) ? h(z.r) : h);
        }
        return Promise.resolve(z.r);
      }
      return thenF(funcs[z.i], arguments, this).then(g);
    };
  }

  EX.chain = function () { return chainCore(flatten(arguments)); };

  EX.or = function () {
    function c(z) { if (z.r) { z.i = z.n; } }
    return chainCore(flatten(arguments), c);
  };

  EX.and = function () {
    function c(z) { if (!z.r) { z.i = z.n; } }
    return chainCore(flatten(arguments), c);
  };












  return EX;
}());
