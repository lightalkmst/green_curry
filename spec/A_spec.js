require ('../green_curry') (['globalize'])

describe ('A', () => {
  it ('.range', () => {
    expect (A.range (0) (10)).toEqual ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})
