module.exports = {
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
    (await Promise.all (xs.map (x => [f (x), x])))
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
}
