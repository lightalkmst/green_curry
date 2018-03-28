require ('../green_curry') (['globalize'])

describe ('F', () => {
  it ('.[\'=\']', () => {
    expect (F['='] (1) (1)).toBeTruthy ()
    expect (F['='] ({}) ({})).toBeTruthy ()
    expect (F['='] ([]) ([])).toBeTruthy ()
    expect (F['='] ({a: {b: [[{c: 3}], 2]}}) ({a: {b: [[{c: 3}], 2]}})).toBeTruthy ()
    expect (F['='] ({a: {b: [[{c: 3}], 2]}}) ({a: {b: [[{c: 2}], 2]}})).toBeFalsy ()
  })

  it ('.try', () => {
    expect (F.try (false) ([
      () => {throw {}},
      () => 1,
    ])).toEqual (1)
    expect (F.try (false) ([])).toEqual (undefined)
  })

  it ('.rcomp', () => {
    expect (F.rcomp ([]) (1)).toEqual (1)
    expect (F.rcomp ([x => x + 3, x => x * 3]) (1)).toEqual (12)
  })

  it ('.c', () => {
    expect (F.c () () (1)).toEqual (1)
    expect (F.c () (x => x + 3) (1)).toEqual (4)
    expect (F.c () ((x => x + 3) >> (x => x * 3)) (1)).toEqual (12)
    expect (F.c () (
      F.c () ((x => x + 3) >> (x => x * 3))
      >> F.c () ((x => x + 3) >> (x => x * 3))
    ) (1)).toEqual (45)
  })

  it ('.p', () => {
    expect (F.p (1) ()).toEqual (1)
    expect (F.p (1) (x => x + 3)).toEqual (4)
    expect (F.p (1) ((x => x + 3) >> (x => x * 3))).toEqual (12)
    expect (F.p (1) (
      F.c () ((x => x + 3) >> (x => x * 3))
      >> F.c () ((x => x + 3) >> (x => x * 3))
    )).toEqual (45)
  })

  it ('.memoize', () => {
    var cnt = 0
    var f = F.memoize (() => cnt++)
    expect (f ()).toEqual (0)
    expect (f ()).toEqual (0)
    f ()
    expect (f ()).toEqual (0)
  })

  it ('.times', () => {
    var cnt = 0
    var f = () => cnt++
    F.times (3) (f)
    expect (cnt).toEqual (3)
  })

  it ('.after', () => {
    var cnt = 0
    var f = F.after (3) (() => cnt++)
    f ()
    f ()
    f ()
    f ()
    f ()
    expect (cnt).toEqual (2)
  })

  it ('.before', () => {
    var cnt = 0
    var f = F.before (3) (() => cnt++)
    f ()
    f ()
    f ()
    f ()
    f ()
    expect (cnt).toEqual (3)
  })
})
