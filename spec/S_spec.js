const assert = require ('assert')
require ('../green_curry') (['globalize'])

describe ('S', () => {
  describe ('length', () => {
    it ('works', () => {
      assert.deepEqual (S.length (''), 0)
      assert.deepEqual (S.length ('123'), 3)
    })
  })

  describe ('get', () => {
    it ('works', () => {
      assert.deepEqual (S.get (1) ('123'), '2')
    })
  })

  describe ('substr', () => {
    it ('works', () => {
      const str = '0123456789'
      expect (S.substr (0) (10) (str)).toEqual (str)
      expect (S.substr (0) (-1) (str)).toEqual ('012345678')
      expect (S.substr (0) (-3) (str)).toEqual ('0123456')
      expect (S.substr (3) (-1) (str)).toEqual ('345678')
    })
  })

  describe ('index', () => {
    it ('works', () => {
      assert.deepEqual (S.index ('a') ('baad'), 1)
    })
  })

  describe ('contains', () => {
    it ('works', () => {
      assert.deepEqual (S.contains ('a') ('baad'), 1)
    })
  })

  describe ('compare', () => {
    it ('works', () => {
      assert.deepEqual (S.compare ('a') ('b'), -1)
      assert.deepEqual (S.compare ('aa') ('ab'), -1)
    })
  })

  describe ('match', () => {
    it ('works', () => {
      assert.deepEqual (S.match (/(a)/) ('a'), {...['a', 'a'], index: 0, input: 'a'})
    })
  })

  describe ('replace', () => {
    it ('works', () => {
      assert.deepEqual (S.replace (/a/) ('b') ('bad'), 'bbd')
    })
  })

  describe ('rindex', () => {
    it ('works', () => {
      assert.deepEqual (S.rindex ('a') ('baad'), 2)
    })
  })

  describe ('search', () => {
    it ('works', () => {
      assert.deepEqual (S.search (/a/) ('baad'), 1)
    })
  })

  describe ('split', () => {
    it ('works', () => {
      assert.deepEqual (S.split (/a/) ('baad'), ['b', '', 'd'])
    })
  })

  describe ('lower', () => {
    it ('works', () => {
      assert.deepEqual (S.lower ('Aa'), 'aa')
    })
  })

  describe ('upper', () => {
    it ('works', () => {
      assert.deepEqual (S.upper ('Aa'), 'AA')
    })
  })

  describe ('trim', () => {
    it ('works', () => {
      assert.deepEqual (S.trim (' a '), 'a')
    })
  })

  describe ('equals', () => {
    it ('works', () => {
      assert.deepEqual (S.equals ('a') ('aa'), false)
      assert.deepEqual (S.equals ('a') ('a'), true)
    })
  })
})
