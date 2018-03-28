require ('../green_curry') (['globalize'])

describe ('A', () => {
  it ('.range', () => {
    expect (A.range (0) (10)).toEqual ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it ('.iteri', () => {
    var ans = []
    A.iteri (i => x => ans.push ([i, x])) ([4, 5, 6])
    expect (ans).toEqual ([[0, 4], [1, 5], [2, 6]])
  })

  it ('.iter', () => {
    var ans = []
    A.iter (x => ans.push (x)) ([4, 5, 6])
    expect (ans).toEqual ([4, 5, 6])
  })

  it ('.find', () => {
    var a = {a: 1}
    A.find (x => x.a == 1) ([1, 2, a, {a: 1}, 3, 4]).a = 2
    expect (a.a).toEqual (2)
  })

  it ('.sort', () => {
    
  })
})
