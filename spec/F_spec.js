const assert = require ('assert')
require ('../green_curry') (['globalize'])

describe ('F', () => {
  describe ('id', () => {
    it ('works', () => {
      assert.deepEqual (F.id ({}), {})
    })
  })

  describe ('const', () => {
    it ('works', () => {
      assert.deepEqual (F.const ({}) (), {})
    })
  })

  describe ('ignore', () => {
    it ('works', () => {
      assert.deepEqual (F.ignore (), undefined)
    })
  })

  describe ('exec', () => {
    it ('works', () => {
      assert.deepEqual (F.exec (() => 3), 3)
    })
  })

  describe ('throw', () => {
    it ('works', () => {
      try {
        F.throw ('asdf')
        assert.fail ()
      }
      catch (err) {
        assert.deepEqual (err, 'asdf')
      }
    })
  })

  describe ('=', () => {
    it ('works', () => {
      expect (F['='] (1) (1)).toBeTruthy ()
      expect (F['='] ({}) ({})).toBeTruthy ()
      expect (F['='] ([]) ([])).toBeTruthy ()
      expect (F['='] ({a: {b: [[{c: 3}], 2]}}) ({a: {b: [[{c: 3}], 2]}})).toBeTruthy ()
      expect (F['='] ({a: {b: [[{c: 3}], 2]}}) ({a: {b: [[{c: 2}], 2]}})).toBeFalsy ()
      expect (F['='] (null) (undefined)).toBeFalsy ()
    })
  })

  describe ('==', () => {
    it ('works', () => {
      assert.deepEqual (F ['=='] ({}) ({}), false)
      assert.deepEqual (F ['=='] (1) (1), true)
      assert.deepEqual (F ['=='] (1) ('1'), true)
    })
  })

  describe ('===', () => {
    it ('works', () => {
      assert.deepEqual (F ['==='] ({}) ({}), false)
      assert.deepEqual (F ['==='] (1) (1), true)
      assert.deepEqual (F ['==='] (1) ('1'), false)
    })
  })

  describe ('!= and <>', () => {
    it ('works', () => {
      assert.deepEqual (F ['!='] ({}) ({}), true)
      assert.deepEqual (F ['!='] (1) (1), false)
      assert.deepEqual (F ['!='] (1) ('1'), false)
    })
  })

  describe ('!==', () => {
    it ('works', () => {
      assert.deepEqual (F ['!=='] ({}) ({}), true)
      assert.deepEqual (F ['!=='] (1) (1), false)
      assert.deepEqual (F ['!=='] (1) ('1'), true)
    })
  })

  describe ('>', () => {
    it ('works', () => {
      assert.deepEqual (F ['>'] (1) (1), false)
      assert.deepEqual (F ['>'] (1) (0), true)
    })
  })

  describe ('>=', () => {
    it ('works', () => {
      assert.deepEqual (F ['>='] (1) (1), true)
      assert.deepEqual (F ['>='] (1) (0), true)
    })
  })

  describe ('<', () => {
    it ('works', () => {
      assert.deepEqual (F ['<'] (1) (1), false)
      assert.deepEqual (F ['<'] (0) (1), true)
    })
  })

  describe ('<=', () => {
    it ('works', () => {
      assert.deepEqual (F ['<='] (1) (1), true)
      assert.deepEqual (F ['<='] (0) (1), true)
    })
  })

  describe ('!', () => {
    it ('works', () => {
      assert.deepEqual (F ['!'] (true), false)
      assert.deepEqual (F ['!'] (false), true)
    })
  })

  describe ('!', () => {
    it ('works', () => {
      assert.deepEqual (F ['~'] (1), -2)
      assert.deepEqual (F ['~'] (-2), 1)
    })
  })

  describe ('+', () => {
    it ('works', () => {
      assert.deepEqual (F ['+'] (2) (3), 5)
    })
  })

  describe ('-', () => {
    it ('works', () => {
      assert.deepEqual (F ['-'] (2) (3), -1)
    })
  })

  describe ('*', () => {
    it ('works', () => {
      assert.deepEqual (F ['*'] (2) (3), 6)
    })
  })

  describe ('/', () => {
    it ('works', () => {
      assert.deepEqual (F ['/'] (6) (3), 2)
    })
  })

  describe ('%', () => {
    it ('works', () => {
      assert.deepEqual (F ['%'] (6) (4), 2)
    })
  })

  describe ('|', () => {
    it ('works', () => {
      assert.deepEqual (F ['|'] (5) (3), 7)
    })
  })

  describe ('||', () => {
    it ('works', () => {
      assert.deepEqual (F ['||'] (true) (true), true)
      assert.deepEqual (F ['||'] (true) (false), true)
      assert.deepEqual (F ['||'] (false) (false), false)
    })
  })

  describe ('&', () => {
    it ('works', () => {
      assert.deepEqual (F ['&'] (5) (3), 1)
    })
  })

  describe ('&&', () => {
    it ('works', () => {
      assert.deepEqual (F ['&&'] (true) (true), true)
      assert.deepEqual (F ['&&'] (true) (false), false)
      assert.deepEqual (F ['&&'] (false) (false), false)
    })
  })

  describe ('^', () => {
    it ('works', () => {
      assert.deepEqual (F ['^'] (5) (3), 6)
    })
  })

  describe ('>>>', () => {
    it ('works', () => {
      assert.deepEqual (F ['>>>'] (5) (2), 1)
    })
  })

  describe ('>>>>', () => {
    it ('works', () => {
      assert.deepEqual (F ['>>>>'] (5) (2), 1)
    })
  })

  describe ('<<<', () => {
    it ('works', () => {
      assert.deepEqual (F ['<<<'] (5) (2), 20)
    })
  })

  describe ('??', () => {
    it ('works', () => {
      assert.deepEqual (F ['??'] (5) (2), 5)
      assert.deepEqual (F ['??'] (null) (2), 2)
    })
  })

  describe ('?:', () => {
    it ('works', () => {
      assert.deepEqual (F ['?:'] (true) (2) (3), 2)
      assert.deepEqual (F ['?:'] (false) (2) (3), 3)
    })
  })

  describe ('|> and @@', () => {
    it ('works', () => {
      assert.deepEqual (F ['|>'] (1) (x => x + 1), 2)
    })
  })

  describe ('<|', () => {
    it ('works', () => {
      assert.deepEqual (F ['<|'] (x => x + 1) (1), 2)
    })
  })

  describe ('<<', () => {
    it ('works', () => {
      assert.deepEqual (F ['<<'] (x => x + 3) (x => x * 3) (3), 12)
    })
  })

  describe ('>>', () => {
    it ('works', () => {
      assert.deepEqual (F ['>>'] (x => x + 3) (x => x * 3) (3), 18)
    })
  })

  describe ('neg', () => {
    it ('works', () => {
      assert.deepEqual (F.neg (x => x) (false), true)
      assert.deepEqual (F.neg (x => x) (true), false)
    })
  })

  describe ('union', () => {
    it ('works', () => {
      assert.deepEqual (F.union (x => x) (x => ! x) (false), true)
      assert.deepEqual (F.union (x => x) (x => ! x) (true), true)
    })
  })

  describe ('inter', () => {
    it ('works', () => {
      assert.deepEqual (F.inter (x => x) (x => ! x) (false), false)
      assert.deepEqual (F.inter (x => x) (x => ! x) (true), false)
    })
  })

  describe ('try', () => {
    it ('works', () => {
      assert.deepEqual (
        F.try (() => 1)
        .catch (err => {}),
        1
      )
      assert.deepEqual (
        F.try (() => {
          throw 1
        })
        .catch (err => {
          return err
        }),
        1
      )
    })
  })

  describe ('swap', () => {
    it ('works', () => {
      assert.deepEqual (F.swap (x => y => x - y) (1) (2), 1)
    })
  })

  describe ('tap', () => {
    it ('works', () => {
      assert.deepEqual (F.tap (x => x + 1) (1), 1)
    })
  })

  describe ('rcomp', () => {
    it ('works', () => {
      expect (F.rcomp ([]) (1)).toEqual (1)
      expect (F.rcomp ([x => x + 3, x => x * 3]) (1)).toEqual (12)
    })
  })

  describe ('c', () => {
    it ('works', () => {
      expect (F.c () () (1)).toEqual (1)
      expect (F.c () (x => x + 3) (1)).toEqual (4)
      expect (F.c () ((x => x + 3) >> (x => x * 3)) (1)).toEqual (12)
      expect (F.c () (
        F.c () ((x => x + 3) >> (x => x * 3))
        >> F.c () ((x => x + 3) >> (x => x * 3))
      ) (1)).toEqual (45)
    })
  })

  describe ('p', () => {
    it ('works', () => {
      expect (F.p (1) ()).toEqual (1)
      expect (F.p (1) (x => x + 3)).toEqual (4)
      expect (F.p (1) ((x => x + 3) >> (x => x * 3))).toEqual (12)
      expect (F.p (1) (
        F.c () ((x => x + 3) >> (x => x * 3))
        >> F.c () ((x => x + 3) >> (x => x * 3))
      )).toEqual (45)
    })
  })

  describe ('memoize', () => {
    it ('works', () => {
      var cnt = 0
      var f = F.memoize (() => cnt++)
      expect (f ()).toEqual (0)
      expect (f ()).toEqual (0)
      f ()
      expect (f ()).toEqual (0)
    })
  })

  describe ('times', () => {
    it ('works', () => {
      var cnt = 0
      var f = () => cnt++
      F.times (3) (f)
      expect (cnt).toEqual (3)
    })
  })

  describe ('after', () => {
    it ('works', () => {
      var cnt = 0
      var f = F.after (3) (() => cnt++)
      f ()
      f ()
      f ()
      f ()
      f ()
      expect (cnt).toEqual (2)
    })
  })

  describe ('before', () => {
    it ('works', () => {
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

  describe ('match', () => {
    it ('works', () => {
      expect (
        F.match (1)
        .case (0) (x => 0)
        .case (2) (x => 2)
        .default (x => 1)
      )
      .toEqual (1)
    })
  })

  describe ('match_f', () => {
    it ('works', () => {
      expect (
        F.match_f (1)
        .case (F['='] (0)) (x => 0)
        .case (F['='] (2)) (x => 2)
        .default (x => 1)
      )
      .toEqual (1)
    })
  })
})
