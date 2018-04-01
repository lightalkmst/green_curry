var hack = arr => function () {
  arr.push (this)
  return 0
}

var F = {
  /////////////
  //         //
  //  Basic  //
  //         //
  /////////////

  e: {},

  // 'a -> 'a
  id: x => x,

  // 'a -> unit -> 'a
  const: x => () => x,

  // 'a -> unit
  ignore: () => undefined,

  // (unit -> 'a) -> 'a
  exec: f => f (),

  // bool -> unit
  ex_if: x => {if (x) throw F.e},

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
    else if (typeof x == 'object' && typeof y == 'object') {
      if (Array.isArray (x) != Array.isArray (y)) {
        return false
      }
      else if (Array.isArray (x)) {
        return A.equals (x) (y)
      }
      else {
        return D.equals (x) (y)
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
  rcomp: fs => F.swap (A.fold (F['|>'])) (fs),

  // alternatively this operator overloading hack that i lifted from:
  // http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-33
  c: () => {
    var fs = []
    var valueOf = Function.prototype.valueOf
    Function.prototype.valueOf = hack (fs)
    return f => {
      Function.prototype.valueOf = valueOf
      return F.rcomp (fs.length ? fs : [f || F.id])
    }
  },

  // adaptation of above that pipes a given argument through the composed function
  p: x => {
    var fs = []
    var valueOf = Function.prototype.valueOf
    Function.prototype.valueOf = hack (fs)
    return f => {
      Function.prototype.valueOf = valueOf
      return F.rcomp (fs.length ? fs : [f || F.id]) (x)
    }
  },

  // ('a -> 'b) -> ('a -> 'b)
  memoize: f => {
    var memo = []
    return x => {
      var len = memo.length
      for (var i = 0; i < len; i++)
        if (memo[i][0] === x)
          return memo[i][1]
      memo[len] = [x, f (x)]
      return memo[len][1]
    }
  },

  // int -> (unit -> unit) -> unit
  times: x => f => {for (var n = 0; n < x; n++) f ()},

  // int -> ('a -> 'b') -> ('a -> unit/'b)
  after: n => f => x => n-- >= 1 ? undefined : f (x),

  // int -> ('a -> 'b') -> ('a -> unit/'b)
  before: n => f => x => n-- >= 1 ? f (x) : undefined,
}

var A = {
  //////////////
  //          //
  //  Arrays  //
  //          //
  //////////////

  // all functions assume dense 0-indexed arrays

  // 'a -> 'a array -> 'a array
  cons: h => l => [h, ...l],

  // 'a array -> 'a
  head: l => F.ex_if (A.is_empty (l)) || l[0],

  // 'a array -> 'a array
  tail: l => F.ex_if (A.is_empty (l)) || l.slice (1),

  // 'a array -> int
  length: l => l.length,

  // 'a array -> bool
  is_empty: l => l.length == 0,

  // int -> 'a array -> 'a
  get: n => l => l[n],

  // int -> int -> int array
  range: x => y => {
    var l = 0
    var ans = []
    for (var n = 0; n <= y - x; n++) ans[l++] = n + x
    return ans
  },

  // int -> 'a -> 'a array
  create: n => x => A.init (n) (F.const (x)),

  // int -> (int -> 'a) -> 'a array
  init: n => f => A.map (f) (A.range (0) (n - 1)),

  // 'a array -> 'a array
  rev: l => A.clone (l).reverse (),

  // (int -> 'a -> unit) -> 'a array -> unit
  iteri: f => l => {
    var len = l.length
    for (var i = 0; i < len; i++)
      f (i) (l[i])
  },

  // ('a -> unit) -> 'a array -> unit
  iter: f => A.iteri (F.const (f)),

  // ('a -> 'b -> 'a) -> 'a -> 'b array -> 'a
  fold: f => a => l => (A.iter (h => a = f (a) (h)) (l), a),

  // ('a -> 'a -> 'a) -> 'a array -> 'a
  reduce: f => l => A.fold (f) (A.head (l)) (A.tail (l)),

  // ('a -> 'b -> 'a) -> 'a -> 'b array -> 'a array
  scan: f => a => l => {
    var ans = [a]
    A.iteri (i => h => ans.push (a = f (a) (h))) (l)
    return ans
  },

  // (int -> 'a -> 'b) -> 'a array -> 'b array
  mapi: f => l => {
    var ans = []
    A.iteri (i => h => ans[i] = f (i) (h)) (l)
    return ans
  },

  // ('a -> 'b) -> 'a array -> 'b array
  map: f => A.mapi (F.const (f)),

  // ('a -> bool) -> 'a array -> 'a
  find: f => l => {
    var ans = l.find (x => f (x))
    if (ans === undefined)
      throw F.e
    return ans
  },

  // ('a -> unit/'b) -> 'a array -> unit/'b
  pick: f => l => f (A.find (x => f (x) != undefined) (l)),

  // ('a -> bool) -> 'a array -> 'a array
  filter: f => l => l.filter (x => f (x)),

  // ('a -> bool) -> 'a array -> bool
  for_all: f => l => l.every (x => f (x)),

  // ('a -> bool) -> 'a array -> bool
  exists: f => l => l.some (x => f (x)),

  // 'a -> 'a array -> bool
  contains: x => l => A.exists (F['='] (x)) (l),

  // 'a array -> 'a array
  clone: l => [...l],

  // ('a -> 'a -> int) -> 'a array -> 'a array
  sort: f => l => A.clone (l).sort ((x, y) => f (x) (y)),

  // ('a -> bool) -> 'a array -> ('a array * 'a array)
  partition: f => l => [A.filter (f) (l), A.filter (F.neg (f)) (l)],

  // 'a array -> 'a array
  uniq: l => {
    var ans = []
    A.iter (h => A.contains (h) (a) && ans.push (h)) (l)
    return ans
  },

  // ('a * 'b) array -> 'a array * 'b array
  unzip: l => {
    var ans = [[], []]
    A.iteri (i => h => {
      ans[0][i] = h[0]
      ans[1][i] = h[1]
    })
    return ans
  },

  ////////////////
  //            //
  //  2 Arrays  //
  //            //
  ////////////////

  // 'a array -> 'a array -> 'a array
  append: l1 => l2 => [...l1, ...l2],

  // 'a array -> 'b array -> bool
  eq_length: l1 => l2 => l1.length == l2.length,

  // 'a array -> 'b array -> bool
  uneq_length: l1 => l2 => l1.length != l2.length,

  // (int -> 'a -> 'b -> unit) -> 'a array -> 'b array -> unit
  iteri2: f => l1 => l2 => A.iteri (i => ([h1, h2]) => f (i) (h1) (h2)) (A.zip (l1) (l2)),

  // ('a -> 'b -> unit) -> 'a array -> 'b array -> unit
  iter2: f => A.iteri2 (F.const (f)),

  // ('a -> 'b -> 'c -> 'a) -> 'a -> 'b array -> 'c array -> 'a
  fold2: f => a => l1 => l2 => A.fold (a => ([h1, h2]) => f (a) (h1) (h2)) (a) (A.zip (l1) (l2)),

  // (int -> 'a -> 'b -> 'c) -> 'a array -> 'b array -> 'c array
  mapi2: f => l1 => l2 => A.mapi (i => ([h1, h2]) => f (i) (h1) (h2)) (A.zip (l1) (l2)),

  // ('a -> 'b -> 'c) -> 'a array -> 'b array -> 'c array
  map2: f => A.mapi2 (F.const (f)),

  // ('a -> 'b -> bool) -> 'a array -> 'b array -> bool
  for_all2: f => l1 => l2 => A.for_all (([h1, h2]) => f (h1) (h2)) (A.zip (l1) (l2)),

  // ('a -> 'b -> bool) -> 'a array -> 'b array -> bool
  exists2: f => l1 => l2 => A.exists (([h1, h2]) => f (h1) (h2)) (A.zip (l1) (l2)),

  // 'a array -> 'b array -> ('a * 'b) array
  zip: l1 => l2 => {
    F.ex_if (A.uneq_length (l1) (l2))
    var ans = []
    for (var i = 0; i < l1.length; i++)
      ans.push ([l1[i], l2[i]])
    return ans
  },

  // 'a array -> 'a array -> bool
  equals: l1 => l2 => ! A.uneq_length (l1) (l2) && A.for_all2 (F['=']) (l1) (l2),
}

var D = {
  //////////////////
  //              //
  //  Dictionary  //
  //              //
  //////////////////

  // ('a, 'b) dictionary -> bool
  is_empty: d => ! D.keys (d).length,

  // 'a -> ('a, 'b) dictionary -> 'b
  get: x => d => d[x],

  // ('a * 'b) array -> ('a, 'b) dictionary
  create: l => {
    var ans = {}
    A.iter (h => ans[h[0]] = h[1]) (l)
    return ans
  },

  // ('a, 'b) dictionary -> 'a array
  keys: d => Object.keys (d),

  // ('a, 'b) dictionary -> 'b array
  vals: d => A.map (F.swap (D.get) (d)) (D.keys (d)),

  // ('a, 'b) dictionary -> ('a * 'b) array
  pairs: d => A.map (h => [h, d[h]]) (D.keys (d)),

  // ('a, 'b) dictionary -> ('a, 'b) dictionary
  bind: o => {
    var ans = {}
    for (var k in o)
      ans[k] = typeof o[k] == 'function' ? o[k].bind (ans) : o[k]
    return ans
  },

  // ('a, 'b) dictionary -> ('a, 'b) dictionary
  freeze: d => (Object.freeze (D.clone (d)), d),

  // ('a, 'b) dictionary -> ('a, 'b) dictionary
  freeze_bind: d => D.freeze (D.bind (d)),

  // ('a -> 'b -> unit) -> ('a, 'b) dictionary -> unit
  iterk: f => d => A.iter (h => f (h) (d[h])) (D.keys (d)),

  // ('a -> unit) -> 'b, 'a dictionary -> unit
  iter: f => D.iterk (F.const (f)),

  // ('a -> 'b -> 'a) -> 'a -> ('c, 'b) array -> 'a
  fold: f => a => d => (A.iter (h => a = f (a) (h)) (D.vals (d)), a),

  // ('a -> 'b -> 'c) -> ('a, 'b) dictionary -> 'a, 'c dictionary
  mapk: f => d => {
    var ans = {}
    D.iterk (k => v => ans[k] = f (k) (v)) (d)
    return ans
  },

  // ('a -> 'b) -> 'c, 'a dictionary -> 'c, 'b dictionary
  map: f => D.mapk (F.const (f)),

  // ('a -> bool) -> 'b, 'a dictionary -> 'a
  find: f => d => F.ex_if (! A.contains (f) (D.vals (d))) || A.find (f) (D.vals (d)),

  // ('a -> 'b -> bool) -> 'a array -> 'a array
  filterk: f => d => {
    var ans = {}
    D.iterk (k => v => f (k) (v) && (ans[k] = d[v])) (d)
    return ans
  },

  // ('a -> bool) -> 'a array -> 'a array
  filter: f => D.filterk (F.const (f)),

  // ('a -> bool) -> 'b, 'a dictionary -> bool
  for_all: f => d => A.forall (f) (D.vals (d)),

  // ('a -> bool) -> 'b, 'a dictionary -> bool
  exists: f => d => A.exists (f) (D.vals (d)),

  // 'a -> 'b, 'a dictionary -> bool
  contains: x => d => A.contains (x) (D.vals (d)),

  // 'a -> 'a, 'b dictionary -> bool
  containsk: x => d => A.contains (x) (D.keys (d)),

  // ('a, 'b) dictionary -> int
  length: d => A.length (D.keys (d)),

  // ('a -> bool) -> 'b, 'a dictionary -> (('b, 'a) dictionary * ('b, 'a) dictionary)
  partition: f => d => {
    var ans = [{}, {}]
    D.iterk (k => v => f (v) ? ans[0][k] = v : ans[1][k] = v)
    return ans
  },

  // ('a, 'b) dictionary -> ('a, 'b) dictionary
  clone: d => D.map (F.id) (d),

  // ('a, 'b) dictionary -> ('a, 'b) dictionary -> ('a, 'b) dictionary
  extend: d1 => d2 => {
    var ans = {}
    D.iterk (k => v => ans[k] = v) (d1)
    D.iterk (k => v => ans[k] = v) (d2)
    return ans
  },

  // ('a, 'b) dictionary -> 'a array -> ('a, 'b) dictionary
  copy: l => d => {
    var ans = {}
    for (k in d)
      if (A.contains (k))
        ans[k] = d[k]
    return ans
  },

  // ('a, 'b) dictionary -> 'a array -> ('a, 'b) dictionary
  delete: l => d => {
    var ans = {}
    for (k in d)
      if (! A.contains (k))
        ans[k] = d[k]
    return ans
  },

  // ('a, 'b) dictionary -> ('a, 'b) dictionary -> bool
  equals: d1 => d2 => {
    if (! A.equals (D.keys (d1)) (D.keys (d2)))
      return false
    var ans = true
    D.iterk (k => v => ans = ans && F['='] (v) (d2[k])) (d1)
    return ans
  },
}

var S = {
  // string -> int
  length: s => s.length,

  // int -> string -> string
  get: n => s => s[n],

  // int -> int -> string -> string
  substr: x => y => s => s.substring (x, y < 0 ? s.length + y + 1 : y),

  // string -> string -> int
  index: s1 => s2 => s2.indexOf (s1),

  // string -> string -> bool
  contains: s1 => s2 => s2.includes (s1),

  // string -> string -> int
  compare: s1 => s2 => s1.localeCompare (s2),

  // string -> regex -> string array
  match: r => s => s.match (r),

  // regex -> string -> string -> string
  replace: r => s1 => s2 => s2.replace (r, s1),

  // string -> string -> int
  rindex: s1 => s2 => s2.lastIndexOf (s1),

  // regex -> string -> int
  search: r => s => s.search (r),

  // regex -> string -> string array
  split: r => s => s.split (r),

  // string -> string
  lower: s => s.toLocaleLowerCase (),

  // string -> string
  upper: s => s.toLocaleUpperCase (),

  // string -> string
  trim: s => s.trim (),

  // string -> string -> bool
  equals: s1 => s2 => s1 === s2,

  // string -> string array -> string
  join: s => A.reduce (a => h => `${a}${s}${h}`),
}

var library = {
  F,
  A,
  D,
  S,
  L: A,
  M: D,
}

var globalize = () => {
  D.iterk (k => v => {
    if (typeof window != 'undefined')
      window[k] = v
    else if (typeof global != 'undefined')
      global[k] = v
  }) (library)
}

var short_composition = () => {
  // ? -> ?
  var fs = []
  var valueOf = Function.prototype.valueOf
  Function.prototype.valueOf = hack (fs)
  F.c = f => {
    var fs2 = A.clone (fs)
    fs.length = 0
    return F.rcomp (fs2.length ? fs2 : [f || F.id])
  }
}

if (typeof exports != 'undefined')
  module.exports = options => {
    F.p ([
      ['globalize', globalize],
      ['short F.c', short_composition],
    ]) (
      A.filter (F.c () (A.get (0) >> F.swap (A.contains) (options)))
      >> A.map (A.get (1))
      >> A.iter (F.exec)
    )
    return library
  }
