const assert = require ('assert')
require ('../green_curry') (['globalize'])

describe ('D', () => {
  describe ('is_empty', () => {
    it ('works', () => {
      assert.deepEqual (D.is_empty ({}), true)
      assert.deepEqual (D.is_empty ({a: 1}), false)
    })
  })

  describe ('get', () => {
    it ('works', () => {
      assert.deepEqual (D.get ('a') ({a: 1}), 1)
    })
  })

  describe ('create', () => {
    it ('works', () => {
      assert.deepEqual (D.create ([['a', 1], ['b', 2]]), {a: 1, b: 2})
    })
  })

  describe ('keys', () => {
    it ('works', () => {
      assert.deepEqual (D.keys ({a: 1, b: 2}), ['a', 'b'])
    })
  })

  describe ('vals', () => {
    it ('works', () => {
      assert.deepEqual (D.vals ({a: 1, b: 2}), [1, 2])
    })
  })

  describe ('pairs', () => {
    it ('works', () => {
      assert.deepEqual (D.pairs ({a: 1, b: 2}), [['a', 1], ['b', 2]])
    })
  })

  describe ('bind', () => {
    it ('works', () => {
      const f = D.bind ({a: 1, f: function () {return this.a}}).f
      assert.deepEqual (f (), 1)
    })
  })

  describe ('freeze', () => {
    it ('works', () => {
      const o = D.freeze ({a: 1})
      o.a = 2
      assert.deepEqual (o.a, 1)
    })
  })

  describe ('iter', () => {
    it ('works', () => {
      const arr = []
      D.iter (x => arr.push (x)) ({a: 1, b: 2})
      assert.deepEqual (arr, [1, 2])
    })
  })

  describe ('iterk', () => {
    it ('works', () => {
      const arr = []
      D.iterk (k => x => arr.push (k + x)) ({a: 1, b: 2})
      assert.deepEqual (arr, ['a1', 'b2'])
    })
  })

  describe ('fold', () => {
    it ('works', () => {
      assert.deepEqual (D.fold (a => x => a + x) (0) ({a: 1, b: 2}), 3)
    })
  })

  describe ('foldk', () => {
    it ('works', () => {
      assert.deepEqual (D.foldk (a => k => x => a + k + x) ('0') ({a: 1, b: 2}), '0a1b2')
    })
  })

  describe ('map', () => {
    it ('works', () => {
      assert.deepEqual (D.map (x => x + 1) ({a: 1, b: 2}), {a: 2, b: 3})
    })
  })

  describe ('mapk', () => {
    it ('works', () => {
      assert.deepEqual (D.mapk (k => x => k + x + 1) ({a: 1, b: 2}), {a: 'a11', b: 'b21'})
    })
  })

  describe ('find', () => {
    it ('works', () => {
      assert.deepEqual (D.find (x => x > 1) ({a: 1, b: 2}), 2)
    })
  })

  describe ('findk', () => {
    it ('works', () => {
      assert.deepEqual (D.findk (k => x => x > 1) ({a: 1, b: 2}), 2)
    })
  })

  describe ('filter', () => {
    it ('works', () => {
      assert.deepEqual (D.filter (x => x > 1) ({a: 1, b: 2}), {b: 2})
    })
  })

  describe ('filterk', () => {
    it ('works', () => {
      assert.deepEqual (D.filterk (k => x => x > 1) ({a: 1, b: 2}), {b: 2})
    })
  })

  describe ('for_all', () => {
    it ('works', () => {
      assert.deepEqual (D.for_all (x => x > 1) ({a: 1, b: 2}), false)
      assert.deepEqual (D.for_all (x => x > 1) ({a: 2, b: 2}), true)
    })
  })

  describe ('exists', () => {
    it ('works', () => {
      assert.deepEqual (D.exists (x => x > 1) ({a: 1, b: 2}), true)
      assert.deepEqual (D.exists (x => x > 1) ({a: 1, b: 1}), false)
    })
  })

  describe ('contains', () => {
    it ('works', () => {
      assert.deepEqual (D.contains (1) ({a: 1, b: 2}), true)
      assert.deepEqual (D.contains (3) ({a: 1, b: 2}), false)
    })
  })

  describe ('containsk', () => {
    it ('works', () => {
      assert.deepEqual (D.containsk ('a') ({a: 1, b: 2}), true)
      assert.deepEqual (D.containsk ('c') ({a: 1, b: 2}), false)
    })
  })

  describe ('length', () => {
    it ('works', () => {
      assert.deepEqual (D.length ({a: 1, b: 2}), 2)
    })
  })

  describe ('partition', () => {
    it ('works', () => {
      assert.deepEqual (D.partition (x => x > 1) ({a: 1, b: 2}), [{b: 2}, {a: 1}])
    })
  })

  describe ('extend', () => {
    it ('works', () => {
      assert.deepEqual (D.extend ({a: 1, b: 2}) ({b: 3, c: 4}), {a: 1, b: 3, c: 4})
    })
  })

  describe ('copy', () => {
    it ('works', () => {
      assert.deepEqual (D.copy (['a']) ({a: 1, b: 2}), {a: 1})
    })
  })

  describe ('delete', () => {
    it ('works', () => {
      assert.deepEqual (D.delete (['a']) ({a: 1, b: 2}), {b: 2})
    })
  })

  describe ('equals', () => {
    it ('works', () => {
      assert.deepEqual (D.equals ({a: {a: 1}, b: 2}) ({a: {a: 1}, b: 2}), true)
      assert.deepEqual (D.equals ({a: {a: 1}, b: 2}) ({a: {a: 2}, b: 2}), false)
    })
  })
})
