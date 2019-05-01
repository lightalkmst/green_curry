var hack = arr => function () {
  arr.push (this)
  return 0
}

const F = module.exports = {
  /////////////
  //         //
  //  Basic  //
  //         //
  /////////////

  // 'a -> 'a
  id: x => x,

  // 'a -> unit -> 'a
  const: x => () => x,

  // 'a -> unit
  ignore: () => undefined,

  // (unit -> 'a) -> 'a
  exec: f => f (),

  // bool -> unit
  throw: x => {throw x},

  // 'a -> unit
  log: console.log.bind (console),

  // string -> 'a
  // wrapper for eval required
  // operates at global scope (ie: ignores variables) if pointless form
  eval: x => eval (x),

  '=': x => y => {
    if (x === y) {
      return true
    }
    else if (typeof x === 'object' && typeof y === 'object') {
      if (Array.isArray (x) !== Array.isArray (y)) {
        return false
      }
      else if (Array.isArray (x) && Array.isArray (y)) {
        if (x.length !== y.length) {
          return false
        }
        for (let i = 0; i < x.length; i++) {
          if (! F['='] (x[i]) (y[i])) {
            return false
          }
        }
        return true
      }
      else {
        const kx = Object.keys (x)
        const ky = Object.keys (y)
        if (kx.length !== ky.length) {
          return false
        }
        for (let i = 0; i < kx.length; i++) {
          if (! F['='] (x[kx[i]]) (y[kx[i]])) {
            return false
          }
        }
        return true
      }
    }
    else {
      return false
    }
  },

  '==': x => y => x == y,

  '===': x => y => x === y,

  '!=': x => y => x != y,
  '<>': x => y => x != y,

  '!==': x => y => x !== y,

  '>': x => y => x > y,
  '>=': x => y => x >= y,

  '<': x => y => x < y,
  '<=': x => y => x <= y,

  '!': x => ! x,

  '~': x => ~ x,

  '+': x => y => x + y,

  '-': x => y => x - y,

  '*': x => y => x * y,

  '/': x => y => x / y,

  '%': x => y => x % y,

  '|': x => y => x | y,

  '||': x => y => x || y,

  '&': x => y => x & y,

  '&&': x => y => x && y,

  '^': x => y => x ^ y,

  '>>>': x => y => x >> y,
  '>>>>': x => y => x >>> y,

  '<<<': x => y => x << y,

  '??': x => y => x !== undefined ? x : y,

  '?:': x => y => z => x ? y : z,

  '|>': x => f => f (x),
  '@@': x => f => f (x),

  '<|': f => x => f (x),

  '>>': f => g => x => g (f (x)),

  '<<': f => g => x => f (g (x)),

  /////////////////
  //             //
  //  Functions  //
  //             //
  /////////////////

  // ('a -> bool) -> ('a -> bool)
  neg: f => x => ! f (x),

  // ('a -> bool) -> ('a -> bool) -> ('a -> bool)
  union: f => g => x => f (x) || g (x),

  // ('a -> bool) -> ('a -> bool) -> ('a -> bool)
  inter: f => g => x => f (x) && g (x),

  // (unit -> 'a) -> 'a
  try: p => fs => {
    var f = fs.shift ()
    try {
      return f && f ()
    }
    catch (e) {
      p && F.log (e)
      return fs[0] ? F.try (p) (fs) : undefined
    }
  },

  // (a' -> 'b -> 'c) -> 'b -> 'a -> 'c
  swap: f => x => y => f (y) (x),

  // int -> ('a -> 'b) -> unit
  delay: t => f => setTimeout (f, t),

  // ('a -> 'b) -> 'a -> 'a
  tap: f => x => (f (x), x),

  // note: all composition functions here are reverse composition

  // if JavaScript had operator overloading, i'd happily
  // use that and type it properly as
  // ('a -> 'b) -> ('b -> 'c) -> 'a -> 'c
  // but without an infix operator, it'd be verbose non-variadic
  // (? -> ?) array -> (? -> ?)
  rcomp: fs => x => fs.reduce ((a, h) => h (a), x),

  // alternatively this operator overloading hack that i lifted from:
  // http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-33
  c: () => {
    const fs = []
    const valueOf = Function.prototype.valueOf
    Function.prototype.valueOf = hack (fs)
    return f => {
      Function.prototype.valueOf = valueOf
      return F.rcomp (fs.length ? fs : [f || F.id])
    }
  },

  // adaptation of above that pipes a given argument through the composed function
  p: x => {
    const fs = []
    const valueOf = Function.prototype.valueOf
    Function.prototype.valueOf = hack (fs)
    return f => {
      Function.prototype.valueOf = valueOf
      return F.rcomp (fs.length ? fs : [f || F.id]) (x)
    }
  },

  // ('a -> 'b) -> ('a -> 'b)
  memoize: f => {
    const memo = []
    return x => {
      const len = memo.length
      for (var i = 0; i < len; i++)
        if (memo [i] [0] === x)
          return memo [i] [1]
      memo [len] = [x, f (x)]
      return memo [len] [1]
    }
  },

  // int -> (unit -> unit) -> unit
  times: x => f => {for (var n = 0; n < x; n++) f ()},

  // int -> ('a -> 'b') -> ('a -> unit/'b)
  after: n => f => x => n-- >= 1 ? undefined : f (x),

  // int -> ('a -> 'b') -> ('a -> unit/'b)
  before: n => f => x => n-- >= 1 ? f (x) : undefined,

  match: x => {
    const cases = []
    const exec = f => ((cases.find (y => y [0] === x) || []) [1] || f) (x)
    const o = {
      case: p => f => {
        cases.push ([p, f])
        return o
      },
      default: exec,
      end: () => exec (() => F.throw (new Error (`F.match: no matching case found - ${JSON.stringify (x)}`))),
    }
    return o
  },

  match_f: x => {
    const cases = []
    const exec = f => ((cases.find (y => y [0] (x)) || []) [1] || f) (x)
    const o = {
      case: p => f => {
        cases.push ([p, f])
        return o
      },
      default: exec,
      end: () => exec (() => F.throw (new Error (`F.match: no matching case found - ${JSON.stringify (x)}`))),
    }
    return o
  },
}
