require ('../green_curry') (['globalize'])

describe ('S', () => {
  it ('.substr', () => {
    const str = '0123456789'
    expect (S.substr (0) (10) (str)).toEqual (str)
    expect (S.substr (0) (-1) (str)).toEqual ('012345678')
    expect (S.substr (0) (-3) (str)).toEqual ('0123456')
    expect (S.substr (3) (-1) (str)).toEqual ('345678')
  })
})
