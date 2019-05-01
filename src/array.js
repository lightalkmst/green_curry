const F = require ('./function')

const A = module.exports = {
  //////////////
  //          //
  //  Arrays  //
  //          //
  //////////////

  // all functions assume dense 0-indexed arrays

  // 'a array -> 'a array
  clone: xs => [...xs],

  // 'a -> 'a array -> 'a array
  cons: h => xs => [h, ...xs],

  // 'a array -> 'a
  head: xs => xs.length ? xs [0] : F.throw (new Error ('A.head: given an empty array')),

  // 'a array -> 'a array
  tail: xs => xs.length ? xs.slice (1) : F.throw (new Error ('A.tail: given an empty array')),

  // 'a array -> int
  length: xs => xs.length,

  // 'a array -> bool
  is_empty: xs => xs.length === 0,

  // int -> 'a array -> 'a
  get: n => xs => xs [n],

  // int -> int -> int array
  range: x => y => {
    let l = 0
    const ans = []
    ans.length = y - x
    for (var n = 0; n <= y - x; n++) ans [l++] = n + x
    return ans
  },

  // int -> 'a -> 'a array
  create: n => x => A.init (n) (F.const (x)),

  // int -> (int -> 'a) -> 'a array
  init: n => f => A.map (f) (A.range (0) (n - 1)),

  // 'a array -> 'a array
  rev: xs => xs.map ((x, i) => xs [len - i - 1]),

  // int -> int -> 'a array -> 'a array
  slice: x => y => xs => xs.slice (x, y),

  // (int -> 'a -> unit) -> 'a array -> unit
  iteri: f => xs => xs.forEach ((x, i) => f (i) (x)),

  // ('a -> unit) -> 'a array -> unit
  iter: f => xs => xs.forEach (x => f (x)),

  // ('a -> 'b -> 'a) -> 'a -> 'b array -> 'a
  fold: f => a => xs => xs.reduce ((a, h) => f (a) (h), a),

  // ('a -> 'a -> 'a) -> 'a array -> 'a
  reduce: f => xs => xs.reduce ((a, h) => f (a) (h)),

  // ('a -> 'b -> 'a) -> 'a -> 'b array -> 'a array
  scan: f => a => xs => xs.reduce ((a, h) => [...a, f (a) (h)], [a]),

  // (int -> 'a -> 'b) -> 'a array -> 'b array
  mapi: f => xs => xs.map ((x, i) => f (i) (x)),

  // ('a -> 'b) -> 'a array -> 'b array
  map: f => xs => xs.map (x => f (x)),

  // ('a -> bool) -> 'a array -> 'a
  find: f => xs => {
    const ans = xs.find (x => f (x))
    if (ans === undefined)
      throw new Error ('A.find: element not found')
    return ans
  },

  // ('a -> bool) -> 'a array -> 'a
  try_find: f => xs => xs.find (x => f (x)),

  // ('a -> bool) -> 'a array -> int
  find_index: f => xs => {
    const ans = xs.findIndex (x => f (x))
    if (ans === undefined)
      throw new Error ('A.find: element not found')
    return ans
  },

  // ('a -> bool) -> 'a array -> int
  try_find_index: f => xs => xs.findIndex (x => f (x)),

  // ('a -> unit/'b) -> 'a array -> unit/'b
  pick: f => xs => {
    let ans = undefined
    xs.some (x => (ans = f (x)) !== undefined)
    if (ans === undefined)
      throw new Error ('A.find: element not found')
    return ans
  },

  // ('a -> unit/'b) -> 'a array -> unit/'b
  try_pick: f => xs => {
    let ans = undefined
    xs.some (x => (ans = f (x)) !== undefined)
    return ans
  },

  // ('a -> bool) -> 'a array -> 'a array
  filter: f => xs => xs.filter (x => f (x)),

  // ('a -> bool) -> 'a array -> bool
  for_all: f => xs => xs.every (x => f (x)),

  // ('a -> bool) -> 'a array -> bool
  exists: f => xs => xs.some (x => f (x)),

  // 'a -> 'a array -> bool
  contains: x => xs => xs.some (F['='] (x)),

  // ('a -> 'a -> int) -> 'a array -> 'a array
  sort: f => xs => [...xs].sort ((x, y) => f (x) (y)),

  // ('a -> bool) -> 'a array -> ('a array * 'a array)
  partition: f => xs => [xs.filter (x => f (x)), xs.filter (x => ! f (x))],

  // 'a array -> 'a array
  uniq: xs => {
    const ans = []
    xs.forEach (x => ans.some (F['='] (x)) || ans.push (x))
    return ans
  },

  // ('a -> string) -> 'a array -> 'a array
  hash_uniq: f => xs => {
    const memo = {}
    xs.forEach(x => memo [f (x)] = true)
  },

  // ('a * 'b) array -> 'a array * 'b array
  unzip: xs => {
    var ans = [[], []]
    xs.forEach ((x, i) => {
      ans [0] [i] = x [0]
      ans [1] [i] = x [1]
    })
    return ans
  },

  ////////////////
  //            //
  //  2 Arrays  //
  //            //
  ////////////////

  // 'a array -> 'a array -> 'a array
  append: xs1 => xs2 => [...xs1, ...xs2],

  // 'a array -> 'b array -> bool
  eq_length: xs1 => xs2 => xs1.length === xs2.length,

  // 'a array -> 'b array -> bool
  uneq_length: xs1 => xs2 => xs1.length !== xs2.length,

  // (int -> 'a -> 'b -> unit) -> 'a array -> 'b array -> unit
  iteri2: f => xs1 => xs2 => A.zip (xs1) (xs2).forEach ((x, i) => f (i) (x[0]) (x[1])),

  // ('a -> 'b -> unit) -> 'a array -> 'b array -> unit
  iter2: f => A.iteri2 (F.const (f)),

  // ('a -> 'b -> 'c -> 'a) -> 'a -> 'b array -> 'c array -> 'a
  fold2: f => a => xs1 => xs2 => A.fold (a => ([h1, h2]) => f (a) (h1) (h2)) (a) (A.zip (xs1) (xs2)),

  // (int -> 'a -> 'b -> 'c) -> 'a array -> 'b array -> 'c array
  mapi2: f => xs1 => xs2 => A.mapi (i => ([h1, h2]) => f (i) (h1) (h2)) (A.zip (xs1) (xs2)),

  // ('a -> 'b -> 'c) -> 'a array -> 'b array -> 'c array
  map2: f => A.mapi2 (F.const (f)),

  // ('a -> 'b -> bool) -> 'a array -> 'b array -> bool
  for_alxs2: f => xs1 => xs2 => A.for_all (([h1, h2]) => f (h1) (h2)) (A.zip (xs1) (xs2)),

  // ('a -> 'b -> bool) -> 'a array -> 'b array -> bool
  exists2: f => xs1 => xs2 => A.exists (([h1, h2]) => f (h1) (h2)) (A.zip (xs1) (xs2)),

  // 'a array -> 'b array -> ('a * 'b) array
  zip: xs1 => xs2 => {
    F.ex_if (A.uneq_length (xs1) (xs2))
    var ans = []
    for (var i = 0; i < xs1.length; i++)
      ans.push ([xs1[i], xs2[i]])
    return ans
  },

  // 'a array -> 'a array -> bool
  equals: xs1 => xs2 => ! A.uneq_length (xs1) (xs2) && A.for_alxs2 (F['=']) (xs1) (xs2),
}
