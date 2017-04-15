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
  const: x => _ => x,

  // 'a -> unit
  ignore: _ => undefined,

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

  // yes, i know it's weak equality
  '=': x => y => x == y,
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
	'~??': x => y => y !== undefined ? y : x,

	'?:': x => y => z => x ? y : z,
	'~?:': x => y => z => z ? x : y,

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
	neg: f => (...x) => ! f (...x),

	// (unit -> 'a) -> 'a
  try: p => fs => {
    var f = fs.shift ()
    try {
      return f ()
    }
    catch (e) {
      if (p) {
        F.log (e)
      }
      return fs[0] ? F.try (p) (fs) : undefined
    }
  },

  // (a' -> 'b -> 'c) -> 'b -> 'a -> 'c
  swap: f => x => y => f (y) (x),

  // int -> ('a -> 'b) -> unit
  delay: t => f => setTimeout (t, f),

  // ('a -> 'b) -> 'a -> 'a
  tap: f => x => (f (x), x),

  // note: all composition functions here are reverse composition

  // if JavaScript had operator overloading, i'd happily
  // use that and type it properly as
  // ('a -> 'b) -> ('b -> 'c) -> 'a -> 'c
  // but without an infix operator, it'd be verbose non-variadic
	// (? -> ?) list -> (? -> ?)
  rcomp: fs => F.swap (L.fold (F['|>'])) (fs),

  // alternatively this operator overloading hack that i lifted from:
  // http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-33
	// unit -> (? -> ?) list -> (? -> ?)
  c: _ => {
    var fs = []
    var valueOf = Function.prototype.valueOf
    Function.prototype.valueOf = function () {
      fs.push (this)
      return 1
    }
    return _ => {
      Function.prototype.valueOf = valueOf
			return F.rcomp (fs)
    }
  },

  // adaptation of above that pipes a given argument through the composed function
	// ? -> (? -> ?) list -> ?
  p: x => {
  	var fs = []
    var valueOf = Function.prototype.valueOf
    Function.prototype.valueOf = function () {
      fs.push (this)
      return 1
    }
    return _ => {
      Function.prototype.valueOf = valueOf
			return F.rcomp (fs) (x)
    }
  },

  // ('a -> 'b) -> ('a -> 'b)
  memoize: f => {
    var memo = []
    return x => {
			var len = memo.length
			for (var i = 0; i < len; i++) {
				if (memo[i][0] === x) {
					return memo[i][1]
				}
			}
			memo[len] = [x, f (x)]
			return memo[len][1]
		}
  },

  // int -> (unit -> unit) -> unit
  times: x => f => {for (var n = 0; n < x; n++) f ()},

	// int -> ('a -> 'b') -> ('a -> unit/'b)
	after: n => f => (...args) => n > 1 ? (n--, undefined) : f (...args),

	// int -> ('a -> 'b') -> ('a -> unit/'b)
	before: n => f => (...args) => n > 1 ? (n--, f (...args)) : undefined,

	// 'a, 'b map -> 'a, 'b map
	bind: o => {
		var ans = {}
		for (var k in o) {
			typeof o[k] == 'function'
			? (ans[k] = o[k].bind (ans))
			: (ans[k] = o[k])
		}
		return ans
	}
}

var L = {
  /////////////
  //         //
  //  Lists  //
  //         //
  /////////////

	// all functions assume dense 0-indexed arrays

  // 'a -> 'a list -> 'a list
  cons: h => l => [h, ...l],

  // 'a list -> 'a
	head: l => F.ex_if (L.isEmpty (l)) || l[0],

  // 'a list -> 'a list
	tail: l => F.ex_if (L.isEmpty (l)) || l.slice (1),

  // 'a list -> int
  length: l => l.length,

  // 'a list -> bool
	is_empty: l => l.length == 0,

  // int -> 'a list -> 'a
  get: n => l => F.ex_if (n >= L.length (l)) || l[n],

  // int -> int -> int list
  range: x => y => {
  	var ans = []
    for (var n = x; n <= y; n++) ans.push (n)
    return ans
  },

  // int -> 'a -> 'a list
  create: n => x => L.init (n) (F.const (x)),

  // int -> (int -> 'a) -> 'a list
  init: n => f => L.map (f) (L.range (0) (n - 1)),

  // 'a list -> 'a list
  rev: l => L.clone (l).reverse (),

  // (int -> 'a -> unit) -> 'a list -> unit
  iteri: f => l => {
		var len = l.length
		for (var i = 0; i < len; i++) {
			f (i) (l[i])
		}
	},

  // ('a -> unit) -> 'a list -> unit
  iter: f => L.iteri (F.const (f)),

  // ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a
	fold: f => a => l => (L.iter (h => a = f (a) (h)) (l), a),

  // ('a -> 'a -> 'a) -> 'a list -> 'a
  reduce: f => l => L.fold (f) (L.head (l)) (L.tail (l)),

  // ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a list
  scan: f => a => l => {
  	var ans = [a]
    L.iteri (i => h => ans[i + 1] = a = f (a) (h)) (l)
    return ans
  },

  // (int -> 'a -> 'b) -> 'a list -> 'b list
  mapi: f => l => {
  	var ans = []
    L.iteri (i => h => ans[i] = f (i) (h)) (l)
    return ans
  },

  // ('a -> 'b) -> 'a list -> 'b list
	map: f => L.mapi (F.const (f)),

  // ('a -> bool) -> 'a list -> 'a
  find: f => l => F.ex_if (! L.contains (f) (l)) || l.find (f),

  // ('a -> bool) -> 'a list -> 'a list
  filter: f => l => l.filter (f),

  // ('a -> bool) -> 'a list -> bool
  for_all: f => l => l.every (f),

  // ('a -> bool) -> 'a list -> bool
  exists: f => l => l.some (f),

  // 'a -> 'a list -> bool
  contains: x => l => l.includes (x),

  // ('a -> 'a -> int) -> 'a list -> 'a list
  sort: f => l => l.sort ((x, y) => f (x) (y)),

  // ('a -> bool) -> 'a list -> ('a list * 'a list)
  partition: f => l => [L.filter (f) (l), L.filter (h => ! f (h)) (l)],

  // 'a list -> 'a list
  uniq: l => {
  	var ans = []
    L.iter (h => L.contains (h) (a) && ans.push (h)) (l)
    return ans
  },

  // ('a * 'b) list -> 'a list * 'b list
  unzip: l => {
  	var ans = [[], []]
    L.iteri (i => h => {
    	ans[0][i] = h[0]
      ans[1][i] = h[1]
    })
    return ans
  },

  ///////////////
  //           //
  //  2 Lists  //
  //           //
  ///////////////

  // 'a list -> 'a list -> 'a list
  append: l1 => l2 => [...l1, ...l2],

  // 'a list -> 'b list -> bool
  unequal_length: l1 => l2 => l1.length == l2.length,

  // (int -> 'a -> 'b -> unit) -> 'a list -> 'b list -> unit
  iteri2: f => l1 => l2 => {
  	F.ex_if (L.unequal_length (l1) (l2))
    for (var i in l1) {
    	f (i) (l1[i]) (l2[i])
    }
  },

  // ('a -> 'b -> unit) -> 'a list -> 'b list -> unit
  iter2: f => L.iteri2 (F.const (f)),

  // ('a -> 'b -> 'c -> 'a) -> 'a -> 'b list -> 'c list -> 'a
  fold2: f => a => l1 => l2 => {
    L.iter2 (h1 => h2 => a = f (a) (l1[i]) (l2[i]))
    return a
  },

  // (int -> 'a -> 'b -> 'c) -> 'a list -> 'b list -> 'c list
  mapi2: f => l1 => l2 => {
  	var ans = []
    L.iteri2 (i => h1 => h2 => ans[i] = f (i) (h1) (h2)) (l1) (l2)
    return ans
  },

  // ('a -> 'b -> 'c) -> 'a list -> 'b list -> 'c list
  map2: f => L.mapi2 (F.const (f)),

  // ('a -> 'b -> bool) -> 'a list -> 'b list -> bool
  forall2: f => L.fold2 (a => h1 => h2 => a && f (h1) (h2)) (true),

  // ('a -> 'b -> bool) -> 'a list -> 'b list -> bool
  exists2: f => L.fold2 (a => h1 => h2 => a || f (h1) (h2)) (false),

  // 'a list -> 'b list -> ('a * 'b) list
  zip: l1 => l2 => {
    var ans = []
    L.iteri2 (i => h1 => h2 => ans[i] = [h1, h2]) (l1) (l2)
    return ans
  },
}

var M = {
	///////////
  //       //
  //  Map  //
  //       //
  ///////////

  // 'a, 'b map -> bool
	is_empty: m => m.keys ().length == 0,

	// 'a -> ('a, 'b') map -> 'b
	get: x => m => m [x],

  // ('a * 'b) list -> 'a, 'b map
  create: l => {
  	var ans = {}
    L.iter (h => ans[h[0]] = h[1])
    return ans
  },

  // 'a, 'b map -> 'a list
  keys: m => Object.keys (m),

  // 'a, 'b map -> 'b list
  vals: m => L.map (F.swap (M.get) (m)) (M.keys (m)),

  // 'a, 'b map -> ('a * 'b) list
  pairs: m => L.map (h => [h, m[h]]) (M.keys (m)),

  // ('a -> 'b -> unit) -> 'a, 'b map -> unit
  iterk: f => m => L.iter (h => f (h) (m[h])) (M.keys (m)),

  // ('a -> unit) -> ('b, 'a) map -> unit
	iter: f => M.iterk (F.const (f)),

  // ('a -> 'b -> 'a) -> 'a -> ('c, 'b) list -> 'a
	fold: f => a => m => (L.iter (h => a = f (a) (h)) (M.vals (m)), a),

  // ('a -> 'a -> 'a) -> ('b, 'a) map -> 'a
  reduce: f => m => L.fold (f) (L.head (M.keys (m))) (L.tail (M.keys (m))),

  // ('a -> 'b -> 'a) -> 'a -> ('c, 'b) map -> 'a list
  scan: f => a => m => {
  	var ans = [a]
    L.iteri (i => h => ans[i + 1] = a = f (a) (h)) (M.vals (m))
    return ans
  },

  // ('a -> 'b -> 'c) -> 'a, 'b map -> ('a, 'c) map
  mapk: f => m => {
  	var ans = {}
    M.iterk (k => v => ans[k] = f (k) (v)) (m)
    return ans
  },

  // ('a -> 'b) -> ('c, 'a) map -> ('c, 'b) map
	map: f => m => {
  	var ans = {}
  	M.iterk (k => v => ans[k] = f (v)) (m)
    return ans
  },

  // ('a -> bool) -> ('b, 'a) map -> 'a
  find: f => m => F.ex_if (! L.contains (f) (M.vals (m))) || L.find (f) (M.vals (m)),

  // ('a -> 'b -> bool) -> 'a list -> 'a list
  filterk: f => m => {
  	var ans = {}
  	M.iterk (k => v => f (k) (v) && (ans[k] = m[v])) (m)
    return ans
  },

	// ('a -> bool) -> 'a list -> 'a list
	filter: f => m => {
  	var ans = {}
  	M.iterk (k => v => f (v) && (ans[k] = m[v])) (m)
    return ans
	},

  // ('a -> bool) -> ('b, 'a) map -> bool
  for_all: f => m => L.forall (f) (M.vals (m)),

  // ('a -> bool) -> ('b, 'a) map -> bool
  exists: f => m => L.exists (f) (M.vals (m)),

  // 'a -> ('b, 'a) map -> bool
  contains: x => m => L.contains (x) (M.vals (m)),

  // 'a, 'b map -> int
  length: m => L.length (M.keys (m)),

  // ('a -> bool) -> ('b, 'a) map -> (('b, 'a) map * ('b, 'a) map)
  partition: f => m => [M.filter (f) (m), M.filter (h => ! f (h)) (m)],

	// 'a, 'b map -> 'a, 'b map -> 'a, 'b map
	extend: m1 => m2 => {
		var ans = {}
		M.iterk (k => v => ans[k] = v) (m1)
		M.iterk (k => v => ans[k] = v) (m2)
		return ans
	},

	// 'a, 'b map -> 'a list -> 'a, 'b map
	delete: m => l => {
		var ans = {}
		for (k in m) {
			if (! L.contains (k)) {
				ans [k] = m [k]
			}
		}
		return ans
	}
}

var S = {
	// string -> int
	length: s => s.length,

	// int -> string -> string
	get: n => s => s[n],

	// int -> int -> string -> string
	substr: s => x => y => s.substring (x, y > -1 ? y : y + 1 + S.length (s)),

	concat: (...s) => L.fold (F['+']) ('') (s),

	// string -> string -> int
	index: s1 => s2 => s1.indexOf (s2),

	// string -> string -> bool
	contains: s1 => s2 => s1.includes (s2),

	// string -> string -> int
	compare: s1 => s2 => s1.localeCompare (s2),

	// string -> regex -> string array
	match: r => s => s.match (r),

	// string -> regex -> string -> string
	// regex -> string -> string -> string
	replace: r => s1 => s2 => s2.replace (r, s1),

	// string -> string -> int
	rindex: s1 => s2 => s1.lastIndexOf (s2),

	// string -> regex -> int
	search: s => r => s.search (r),

	// string -> string/regex -> string array
	split: s => r => s.split (r),

	// string -> string
	lower: s => s.toLocaleLowerCase (),

	// string -> string
	upper: s => s.toLocaleUpperCase (),

	// string -> string
	trim: s => s.trim (),

	// string -> string -> string
	wrap: s1 => s2 => s3 => s1 + s3 + s2,
}

module.exports = {
	F: F,
	L: L,
	M: M,
	S: S,
	globalize: function () {
		for (var k in this) {
			if (k != 'globalize') {
				if (typeof window != 'undefined') {
					window[k] = this[k]
				}
				else if (typeof global != 'undefined') {
					global[k] = this[k]
				}
			}
		}
	}
}
