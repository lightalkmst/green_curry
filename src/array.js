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
  rev: xs => {
    const ans = []
    for (var i = 0, len = ans.length = xs.length; i < len; i++) {
      ans [i] = xs [len - i - 1]
    }
    return ans
  },

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
  scan: f => a => xs =>
    xs.reduce ((a, h) => {
      const a2 = f (a [1]) (h)
      return [[...a [0], a2], a2]
    }, [[a], a]) [0],

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
    if (ans === -1)
      throw new Error ('A.find: element not found')
    return ans
  },

  // ('a -> bool) -> 'a array -> int
  try_find_index: f => xs => {
    const ans = xs.findIndex (x => f (x))
    return ans !== -1 ? ans : undefined
  },

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
    xs.forEach (x => {
      const k = f (x)
      if (memo [k] === undefined)
        memo [k] = x
    })
    return Object.values (memo)
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

  // 'a array array -> 'a array
  flatten: xs => xs.flat (),

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
  iteri2: f => xs1 => xs2 => {
    if (xs1.length !== xs2.length)
      throw new Error ('A.iteri2: arrays do not have equal length')
    for (var i = 0, len = xs1.length; i < len; i++) {
      f (i) (xs1 [i]) (xs2 [i])
    }
  },

  // ('a -> 'b -> unit) -> 'a array -> 'b array -> unit
  iter2: f => xs1 => xs2 => {
    if (xs1.length !== xs2.length)
      throw new Error ('A.iter2: arrays do not have equal length')
    for (var i = 0, len = xs1.length; i < len; i++) {
      f (xs1 [i]) (xs2 [i])
    }
  },

  // ('a -> 'b -> 'c -> 'a) -> 'a -> 'b array -> 'c array -> 'a
  fold2: f => a => xs1 => xs2 => {
    if (xs1.length !== xs2.length)
      throw new Error ('A.fold2: arrays do not have equal length')
    for (var i = 0, len = xs1.length; i < len; i++) {
      a = f (a) (xs1 [i]) (xs2 [i])
    }
    return a
  },

  // (int -> 'a -> 'b -> 'c) -> 'a array -> 'b array -> 'c array
  mapi2: f => xs1 => xs2 => {
    if (xs1.length !== xs2.length)
      throw new Error ('A.mapi2: arrays do not have equal length')
    const ans = []
    for (var i = 0, len = xs1.length; i < len; i++) {
      ans.push (f (i) (xs1 [i]) (xs2 [i]))
    }
    return ans
  },

  // ('a -> 'b -> 'c) -> 'a array -> 'b array -> 'c array
  map2: f => xs1 => xs2 => {
    if (xs1.length !== xs2.length)
      throw new Error ('A.map2: arrays do not have equal length')
    const ans = []
    for (var i = 0, len = xs1.length; i < len; i++) {
      ans.push (f (xs1 [i]) (xs2 [i]))
    }
    return ans
  },

  // ('a -> 'b -> bool) -> 'a array -> 'b array -> bool
  for_all2: f => xs1 => xs2 => {
    if (xs1.length !== xs2.length)
      throw new Error ('A.for_all2: arrays do not have equal length')
    for (var i = 0, len = xs1.length; i < len; i++) {
      if (! f (xs1 [i]) (xs2 [i]))
        return false
    }
    return true
  },

  // ('a -> 'b -> bool) -> 'a array -> 'b array -> bool
  exists2: f => xs1 => xs2 => {
    if (xs1.length !== xs2.length)
      throw new Error ('A.exists2: arrays do not have equal length')
    for (var i = 0, len = xs1.length; i < len; i++) {
      if (f (xs1 [i]) (xs2 [i]))
        return true
    }
    return false
  },

  // 'a array -> 'b array -> ('a * 'b) array
  zip: xs1 => xs2 => {
    if (xs1.length !== xs2.length)
      throw new Error ('A.zip: arrays do not have equal length')
    var ans = []
    for (var i = 0; i < xs1.length; i++)
      ans.push ([xs1[i], xs2[i]])
    return ans
  },

  // 'a array -> 'a array -> bool
  equals: xs1 => xs2 => ! A.uneq_length (xs1) (xs2) && A.for_all2 (F['=']) (xs1) (xs2),

  ////////////////
  //            //
  //  Promised  //
  //            //
  ////////////////

  P: {
    //////////////
    //          //
    //  Serial  //
    //          //
    //////////////

    s: {
      // int -> (int -> 'a promise) -> 'a array promise
      init: n => async f => {
        const ans = []
        for (var i = 0; i < n; i++) {
          ans.push (await f (i))
        }
        return ans
      },

      // (int -> 'a -> unit promise) -> 'a array -> unit promise
      iteri: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          await f (i) (xs [i])
        }
      },

      // ('a -> unit promise) -> 'a array -> unit promise
      iter: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          await f (xs [i])
        }
      },

      // ('a -> 'b -> 'a promise) -> 'a -> 'b array -> 'a promise
      fold: f => a => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          a = await f (a) (xs [i])
        }
        return a
      },

      // ('a -> 'a -> 'a promise) -> 'a array -> 'a promise
      reduce: f => async xs => {
        for (var i = 1, len = xs.length, a = xs [0]; i < len; i++) {
          a = await f (a) (xs [i])
        }
        return a
      },

      // ('a -> 'b -> 'a promise) -> 'a -> 'b array -> 'a array promise
      scan: f => a => async xs => {
        const ans = [a]
        for (var i = 0, len = xs.length; i < len; i++) {
          ans.push (a = await f (a) (xs [i]))
        }
        return ans
      },

      // (int -> 'a -> 'b promise) -> 'a array -> 'b array promise
      mapi: f => async xs => {
        const ans = []
        for (var i = 0, len = xs.length; i < len; i++) {
          ans.push (await f (i) (xs [i]))
        }
        return ans
      },

      // ('a -> 'b promise) -> 'a array -> 'b array promise
      map: f => async xs => {
        const ans = []
        for (var i = 0, len = xs.length; i < len; i++) {
          ans.push (await f (xs [i]))
        }
        return ans
      },

      // ('a -> bool promise) -> 'a array -> 'a promise
      find: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          if (await f (xs [i]))
            return xs [i]
        }
        throw new Error ('P.A.s.find: element not found')
      },

      // ('a -> bool promise) -> 'a array -> 'a promise
      try_find: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          if (await f (xs [i]))
            return xs [i]
        }
      },

      // ('a -> bool promise) -> 'a array -> int promise
      find_index: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          if (await f (xs [i]))
            return i
        }
        throw new Error ('P.A.s.find_index: element not found')
      },

      // ('a -> bool promise) -> 'a array -> int promise
      try_find_index: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          if (await f (xs [i]))
            return i
        }
      },

      // ('a -> unit/'b promise) -> 'a array -> unit/'b promise
      pick: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          const ans = await f (xs [i])
          if (ans !== undefined)
            return ans
        }
        throw new Error ('P.A.s.pick: element not found')
      },

      // ('a -> unit/'b promise) -> 'a array -> unit/'b promise
      try_pick: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          const ans = await f (xs [i])
          if (ans !== undefined)
            return ans
        }
        throw new Error ('P.A.s.pick: element not found')
      },

      // ('a -> bool promise) -> 'a array -> 'a array promise
      filter: f => async xs => {
        const ans = []
        for (var i = 0, len = xs.length; i < len; i++) {
          if (await f (xs [i]))
            ans.push (xs [i])
        }
        return ans
      },

      // ('a -> bool promise) -> 'a array -> bool promise
      for_all: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          if (! (await f (xs [i])))
            return false
        }
        return true
      },

      // ('a -> bool promise) -> 'a array -> bool promise
      exists: f => async xs => {
        for (var i = 0, len = xs.length; i < len; i++) {
          if (await f (xs [i]))
            return true
        }
        return false
      },
    },

    ////////////////
    //            //
    //  Parallel  //
    //            //
    ////////////////

    p: {
      // int -> (int -> 'a promise) -> 'a array promise
      init: n => async f => {
        const ans = []
        ans.length = n
        return Promise.all (ans.map ((x, i) => f (i)))
      },

      // (int -> 'a -> unit promise) -> 'a array -> unit promise
      iteri: f => async xs => {await Promise.all (xs.map ((x, i) => f (i) (x)))},

      // ('a -> unit promise) -> 'a array -> unit promise
      iter: f => async xs => {await Promise.all (xs.map (x => f (x)))},

      // (int -> 'a -> 'b promise) -> 'a array -> 'b array promise
      mapi: f => xs => Promise.all (xs.map ((x, i) => f (i) (x))),

      // ('a -> 'b promise) -> 'a array -> 'b array promise
      map: f => xs => Promise.all (xs.map (x => f (x))),

      // ('a -> bool promise) -> 'a array -> 'a promise
      find: f => xs =>
        new Promise (async (resolve, reject) => {
          try {
            await Promise.all (xs.map (async x => await f (x) && resolve (x)))
            reject (new Error (`P.A.p.find: element not found`))
          }
          catch (err) {
            reject (err)
          }
        }),

      // ('a -> bool promise) -> 'a array -> 'a promise
      try_find: f => xs =>
        new Promise (async (resolve, reject) => {
          try {
            await Promise.all (xs.map (async x => await f (x) && resolve (x)))
            resolve ()
          }
          catch (err) {
            reject (err)
          }
        }),

      // ('a -> bool promise) -> 'a array -> int promise
      find_index: f => xs =>
        new Promise (async (resolve, reject) => {
          try {
            await Promise.all (xs.map (async x => await f (x) && resolve (i)))
            reject (new Error (`P.A.p.find_index: element not found`))
          }
          catch (err) {
            reject (err)
          }
        }),

      // ('a -> bool promise) -> 'a array -> int promise
      try_find_index: f => xs =>
        new Promise (async (resolve, reject) => {
          try {
            await Promise.all (xs.map (async x => await f (x) && resolve (i)))
            resolve ()
          }
          catch (err) {
            reject (err)
          }
        }),

      // ('a -> unit/'b promise) -> 'a array -> unit/'b promise
      pick: f => xs =>
        new Promise (async (resolve, reject) => {
          try {
            await Promise.all (xs.map (async x => {
              const ans = await f (x)
              if (ans !== undefined)
                resolve (ans)
            }))
            reject (new Error (`P.A.p.pick: element not found`))
          }
          catch (err) {
            reject (err)
          }
        }),

      // ('a -> unit/'b promise) -> 'a array -> unit/'b promise
      try_pick: f => xs =>
        new Promise (async (resolve, reject) => {
          try {
            await Promise.all (xs.map (async x => {
              const ans = await f (x)
              if (ans !== undefined)
                resolve (ans)
            }))
            resolve ()
          }
          catch (err) {
            reject (err)
          }
        }),

      // ('a -> bool promise) -> 'a array -> 'a array promise
      filter: f => async xs =>
        (await Promise.all (xs.map (async x => [await f (x), x])))
        .filter (x => x [0])
        .map (x => x [1]),

      // ('a -> bool promise) -> 'a array -> bool promise
      for_all: f => xs =>
        new Promise (async (resolve, reject) => {
          try {
            await Promise.all (xs.map (async x => await f (x) || resolve (false)))
            resolve (true)
          }
          catch (err) {
            reject (err)
          }
        }),

      // ('a -> bool promise) -> 'a array -> bool promise
      exists: f => xs =>
        new Promise (async (resolve, reject) => {
          try {
            await Promise.all (xs.map (async x => await f (x) && resolve (true)))
            resolve (false)
          }
          catch (err) {
            reject (err)
          }
        }),
    },
  },
}
