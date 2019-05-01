const F = require ('./function')
const A = require ('./array')

const D = module.exports = {
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
