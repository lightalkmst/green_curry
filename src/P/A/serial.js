module.exports = {
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
}
