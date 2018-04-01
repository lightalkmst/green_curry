require ('../green_curry') (['globalize'])

describe ('S', () => {
  it ('.substr', () => {
    expect (S.substr (0) (10) ('0123456789')).toEqual ('0123456789')
    expect (S.substr (0) (-1) ('0123456789')).toEqual ('0123456789')
    expect (S.substr (0) (-3) ('0123456789')).toEqual ('01234567')
    expect (S.substr (3) (-1) ('0123456789')).toEqual ('3456789')
  })
})
