describe ('initializer', () => {
  it ('globalize', () => {
    require ('../green_curry') (['globalize'])
    expect (F).not.toBe (undefined)
    expect (A).not.toBe (undefined)
    expect (D).not.toBe (undefined)
    expect (S).not.toBe (undefined)
  })

  it ('short_composition', () => {
    var green_curry = require ('../green_curry') (['short F.c'])
    expect (green_curry.F.c () (1)).toEqual (1)
    expect (green_curry.F.c (x => x + 3) (1)).toEqual (4)
    expect (green_curry.F.c ((x => x + 3) >> (x => x * 3)) (1)).toEqual (12)
    expect (green_curry.F.c (
      green_curry.F.c ((x => x + 3) >> (x => x * 3))
      >> green_curry.F.c ((x => x + 3) >> (x => x * 3))
    ) (1)).toEqual (45)
  })
})
