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

	// ('a -> bool) -> ('a -> bool) -> ('a -> bool)
	union: f => g => x => f (x) || g (x),

	// ('a -> bool) -> ('a -> bool) -> ('a -> bool)
	inter: f => g => x => f (x) && g (x),

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

	// 'a, 'b dictionary -> 'a, 'b dictionary
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

	// all functions assume dense 0-indexed lists

  // 'a -> 'a list -> 'a list
  cons: h => l => [h, ...l],

  // 'a list -> 'a
	head: l => F.ex_if (L.is_empty (l)) || l[0],

  // 'a list -> 'a list
	tail: l => F.ex_if (L.is_empty (l)) || l.slice (1),

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
  sort: f => l => l.concat ().sort ((x, y) => f (x) (y)),

  // ('a -> bool) -> 'a list -> ('a list * 'a list)
  partition: f => l => [L.filter (f) (l), L.filter (F.neg (f)) (l)],

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
  uneq_length: l1 => l2 => l1.length == l2.length,

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
  for_all2: f => L.fold2 (a => h1 => h2 => a && f (h1) (h2)) (true),

  // ('a -> 'b -> bool) -> 'a list -> 'b list -> bool
  exists2: f => L.fold2 (a => h1 => h2 => a || f (h1) (h2)) (false),

  // 'a list -> 'b list -> ('a * 'b) list
  zip: l1 => l2 => {
    var ans = []
    L.iteri2 (i => h1 => h2 => ans[i] = [h1, h2]) (l1) (l2)
    return ans
  },
}

var D = {
	//////////////////
  //              //
  //  Dictionary  //
  //              //
  //////////////////

  // 'a, 'b dictionary -> bool
	is_empty: d => d.keys ().length == 0,

	// 'a -> 'a, 'b dictionary -> 'b
	get: x => d => d[x],

  // ('a * 'b) list -> 'a, 'b dictionary
  create: l => {
  	var ans = {}
    L.iter (h => ans[h[0]] = h[1])
    return ans
  },

  // 'a, 'b dictionary -> 'a list
  keys: d => Object.keys (d),

  // 'a, 'b dictionary -> 'b list
  vals: d => L.map (F.swap (D.get) (d)) (D.keys (d)),

  // 'a, 'b dictionary -> ('a * 'b) list
  pairs: d => L.map (h => [h, d[h]]) (D.keys (d)),

  // ('a -> 'b -> unit) -> 'a, 'b dictionary -> unit
  iterk: f => d => L.iter (h => f (h) (d[h])) (D.keys (d)),

  // ('a -> unit) -> 'b, 'a dictionary -> unit
	iter: f => D.iterk (F.const (f)),

  // ('a -> 'b -> 'a) -> 'a -> ('c, 'b) list -> 'a
	fold: f => a => d => (L.iter (h => a = f (a) (h)) (D.vals (d)), a),

  // ('a -> 'b -> 'c) -> 'a, 'b dictionary -> 'a, 'c dictionary
  mapk: f => d => {
  	var ans = {}
    D.iterk (k => v => ans[k] = f (k) (v)) (d)
    return ans
  },

  // ('a -> 'b) -> 'c, 'a dictionary -> 'c, 'b dictionary
	map: f => d => D.mapk (F.const (f)),

  // ('a -> bool) -> 'b, 'a dictionary -> 'a
  find: f => d => F.ex_if (! L.contains (f) (D.vals (d))) || L.find (f) (D.vals (d)),

  // ('a -> 'b -> bool) -> 'a list -> 'a list
  filterk: f => d => {
  	var ans = {}
  	D.iterk (k => v => f (k) (v) && (ans[k] = d[v])) (d)
    return ans
  },

	// ('a -> bool) -> 'a list -> 'a list
	filter: f => d => D.filterk (F.const (f)),

  // ('a -> bool) -> 'b, 'a dictionary -> bool
  for_all: f => d => L.forall (f) (D.vals (d)),

  // ('a -> bool) -> 'b, 'a dictionary -> bool
  exists: f => d => L.exists (f) (D.vals (d)),

  // 'a -> 'b, 'a dictionary -> bool
  contains: x => d => L.contains (x) (D.vals (d)),

  // 'a, 'b dictionary -> int
  length: d => L.length (D.keys (d)),

  // ('a -> bool) -> 'b, 'a dictionary -> (('b, 'a) dictionary * ('b, 'a) dictionary)
  partition: f => d => [D.filter (f) (d), D.filter (F.neg (f)) (d)],

	// 'a, 'b dictionary -> 'a, 'b dictionary -> 'a, 'b dictionary
	extend: d1 => d2 => {
		var ans = {}
		D.iterk (k => v => ans[k] = v) (d1)
		D.iterk (k => v => ans[k] = v) (d2)
		return ans
	},

	// 'a, 'b dictionary -> 'a list -> 'a, 'b dictionary
	delete: d => l => {
		var ans = {}
		for (k in d) {
			if (! L.contains (k)) {
				ans[k] = d[k]
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

	// string -> string -> int
	index: s1 => s2 => s1.indexOf (s2),

	// string -> string -> bool
	contains: s1 => s2 => s1.includes (s2),

	// string -> string -> int
	compare: s1 => s2 => s1.localeCompare (s2),

	// string -> regex -> string list
	match: r => s => s.match (r),

	// string -> regex -> string -> string
	replace: s1 => r => s2 => s1.replace (r, s2),

	// string -> string -> int
	rindex: s1 => s2 => s1.lastIndexOf (s2),

	// string -> regex -> int
	search: s => r => s.search (r),

	// string -> regex -> string list
	split: s => r => s.split (r),

	// string -> string
	lower: s => s.toLocaleLowerCase (),

	// string -> string
	upper: s => s.toLocaleUpperCase (),

	// string -> string
	trim: s => s.trim (),
}

module.exports = {
	F: F,
	L: L,
	D: D,
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
