const F = require ('./src/function')
const A = require ('./src/array')
const D = require ('./src/dictionary')
const S = require ('./src/string')

var hack = arr => function () {
  arr.push (this)
  return 0
}

const library = {
  F,
  A,
  D,
  S,
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
  const fs = []
  const valueOf = Function.prototype.valueOf
  Function.prototype.valueOf = hack (fs)
  F.c = f => {
    const fs2 = A.clone (fs)
    fs.length = 0
    return F.rcomp (fs2.length ? fs2 : [f || F.id])
  }
}

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
