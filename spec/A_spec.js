const assert = require ('assert')
require ('../green_curry') (['globalize'])

describe ('A', () => {
  describe ('clone', () => {
    it ('creates a shallow copy', () => {
      const arr = [0, '', {}, []]
      assert.deepEqual (A.clone (arr), arr)
      arr [2].a = 1
      assert.equal (A.clone (arr) [2].a, 1)
    })
  })

  describe ('cons', () => {
    it ('works', () => {
      assert.deepEqual (A.cons (0) ([1, 2, 3]), [0, 1, 2, 3])
    })
  })

  describe ('head', () => {
    it ('works', () => {
      assert.deepEqual (A.head ([1]), 1)
    })
  })

  describe ('tail', () => {
    it ('works', () => {
      assert.deepEqual (A.tail ([1, 2]), [2])
    })
  })

  describe ('length', () => {
    it ('works', () => {
      assert.deepEqual (A.length ([1, 2, 3]), 3)
    })
  })

  describe ('is_empty', () => {
    it ('works', () => {
      assert.deepEqual (A.is_empty ([]), true)
      assert.deepEqual (A.is_empty ([1]), false)
    })
  })

  describe ('get', () => {
    it ('works', () => {
      assert.deepEqual (A.get (1) ([1, 2, 3]), 2)
    })
  })

  describe ('range', () => {
    it ('works', () => {
      assert.deepEqual (A.range (0) (10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
  })

  describe ('create', () => {
    it ('works', () => {
      assert.deepEqual (A.create (3) (2), [2, 2, 2])
    })
  })

  describe ('init', () => {
    it ('works', () => {
      assert.deepEqual (A.init (3) (x => x + 1), [1, 2, 3])
    })
  })

  describe ('rev', () => {
    it ('works', () => {
      assert.deepEqual (A.rev ([1, 2, 3]), [3, 2, 1])
    })
  })

  describe ('iter', () => {
    it ('works', () => {
      const arr = []
      A.iter (x => arr.push (x)) ([1, 2, 3])
      assert.deepEqual (arr, [1, 2, 3])
    })
  })

  describe ('iteri', () => {
    it ('works', () => {
      const arr = []
      A.iteri (i => x => arr.push ([i, x])) ([1, 2, 3])
      assert.deepEqual (arr, [[0, 1], [1, 2], [2, 3]])
    })
  })

  describe ('fold', () => {
    it ('works', () => {
      assert.deepEqual (A.fold (a => h => a + h) ('0') (['1', '2', '3']), '0123')
    })
  })

  describe ('reduce', () => {
    it ('works', () => {
      assert.deepEqual (A.reduce (a => h => a + h) (['1', '2', '3']), '123')
    })
  })

  describe ('scan', () => {
    it ('works', () => {
      assert.deepEqual (A.scan (a => h => a + h) ('0') (['1', '2', '3']), ['0', '01', '012', '0123'])
    })
  })

  describe ('map', () => {
    it ('works', () => {
      assert.deepEqual (A.map (x => x + 1) ([1, 2, 3]), [2, 3, 4])
    })
  })

  describe ('mapi', () => {
    it ('works', () => {
      assert.deepEqual (A.mapi (i => x => i + x + 1) ([1, 2, 3]), [2, 4, 6])
    })
  })

  describe ('find', () => {
    it ('works', () => {
      assert.deepEqual (A.find (x => x === 3) ([1, 2, 3]), 3)
    })
  })

  describe ('try_find', () => {
    it ('works', () => {
      assert.deepEqual (A.try_find (x => x === 3) ([1, 2, 3]), 3)
    })
  })

  describe ('pick', () => {
    it ('works', () => {
      assert.deepEqual (A.pick (x => x === 3 ? x + 2 : undefined) ([1, 2, 3]), 5)
    })
  })

  describe ('try_pick', () => {
    it ('works', () => {
      assert.deepEqual (A.try_pick (x => x === 3 ? x + 2 : undefined) ([1, 2, 3]), 5)
    })
  })

  describe ('filter', () => {
    it ('works', () => {
      assert.deepEqual (A.filter (x => x === 3) ([1, 2, 3]), [3])
    })
  })

  describe ('for_all', () => {
    it ('works', () => {
      assert.deepEqual (A.for_all (x => x === 3) ([1, 2, 3]), false)
      assert.deepEqual (A.for_all (x => x === 3) ([3, 3, 3]), true)
    })
  })

  describe ('exists', () => {
    it ('works', () => {
      assert.deepEqual (A.exists (x => x === 3) ([1, 2, 3]), true)
      assert.deepEqual (A.exists (x => x === 3) ([1, 2, 1]), false)
    })
  })

  describe ('contains', () => {
    it ('works', () => {
      assert.deepEqual (A.contains (3) ([1, 2, 3]), true)
      assert.deepEqual (A.contains (3) ([1, 2, 1]), false)
    })
  })

  describe ('sort', () => {
    it ('works', () => {
      assert.deepEqual (A.sort (x => y => x - y) ([5, 1, 4, 6, 8, 2, 3]), [1, 2, 3, 4, 5, 6, 8])
    })
  })

  describe ('partition', () => {
    it ('works', () => {
      assert.deepEqual (A.partition (x => x === 3) ([1, 2, 3]), [[3], [1, 2]])
    })
  })

  describe ('uniq', () => {
    it ('works', () => {
      assert.deepEqual (A.uniq ([1, 2, 3, 3, 2, 1]), [1, 2, 3])
    })
  })

  describe ('hash_uniq', () => {
    it ('works', () => {
      assert.deepEqual (A.hash_uniq (x => `${x}`) ([1, 2, 3, 3, 2, 1]), [1, 2, 3])
    })
  })

  describe ('unzip', () => {
    it ('works', () => {
      assert.deepEqual (A.unzip ([[1, 2], [3, 4], [5, 6]]), [[1, 3, 5], [2, 4, 6]])
    })
  })

  describe ('append', () => {
    it ('works', () => {
      assert.deepEqual (A.append ([1, 2]) ([3, 4]), [1, 2, 3, 4])
    })
  })

  describe ('eq_length', () => {
    it ('works', () => {
      assert.deepEqual (A.eq_length ([1, 2]) ([3, 4]), true)
      assert.deepEqual (A.eq_length ([1, 2]) ([3]), false)
    })
  })

  describe ('uneq_length', () => {
    it ('works', () => {
      assert.deepEqual (A.uneq_length ([1, 2]) ([3, 4]), false)
      assert.deepEqual (A.uneq_length ([1, 2]) ([3]), true)
    })
  })

  describe ('iter2', () => {
    it ('works', () => {
      const arr = []
      A.iter2 (x => y => arr.push ([x, y])) ([1, 2, 3]) ([4, 5, 6])
      assert.deepEqual (arr, [[1, 4], [2, 5], [3, 6]])
    })
  })

  describe ('iteri2', () => {
    it ('works', () => {
      const arr = []
      A.iteri2 (i => x => y => arr.push ([i, x, y])) ([1, 2, 3]) ([4, 5, 6])
      assert.deepEqual (arr, [[0, 1, 4], [1, 2, 5], [2, 3, 6]])
    })
  })

  describe ('fold2', () => {
    it ('works', () => {
      assert.deepEqual (A.fold2 (a => h1 => h2 => a + h1 + h2) ('0') (['1', '2', '3']) (['4', '5', '6']), '0142536')
    })
  })

  describe ('map2', () => {
    it ('works', () => {
      assert.deepEqual (A.map2 (x1 => x2 => x1 + x2 + 1) ([1, 2, 3]) ([4, 5, 6]), [6, 8, 10])
    })
  })

  describe ('mapi2', () => {
    it ('works', () => {
      assert.deepEqual (A.mapi2 (i => x1 => x2 => i + x1 + x2) ([1, 2, 3]) ([4, 5, 6]), [5, 8, 11])
    })
  })

  describe ('for_all2', () => {
    it ('works', () => {
      assert.deepEqual (A.for_all2 (x1 => x2 => x1 < x2) ([1, 2, 3]) ([4, 5, 6]), true)
    })
  })

  describe ('exists2', () => {
    it ('works', () => {
      assert.deepEqual (A.exists2 (x1 => x2 => x1 + x2 < 7) ([1, 2, 3]) ([4, 5, 6]), true)
    })
  })

  describe ('zip', () => {
    it ('works', () => {
      assert.deepEqual (A.zip ([1, 2, 3]) ([4, 5, 6]), [[1, 4], [2, 5], [3, 6]])
    })
  })

  describe ('equals', () => {
    it ('works', () => {
      assert.deepEqual (A.equals ([1, 2, {a: 1}]) ([1, 2, {a: 1}]), true)
    })
  })

  describe ('P', () => {
    describe ('s', () => {
      describe ('init', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.init (3) (async x => x + 1), [1, 2, 3])
        })
      })

      describe ('iter', () => {
        it ('works', async () => {
          const arr = []
          await A.P.s.iter (async x => arr.push (x)) ([1, 2, 3])
          assert.deepEqual (arr, [1, 2, 3])
        })
      })

      describe ('iteri', () => {
        it ('works', async () => {
          const arr = []
          await A.P.s.iteri (i => async x => arr.push ([i, x])) ([1, 2, 3])
          assert.deepEqual (arr, [[0, 1], [1, 2], [2, 3]])
        })
      })

      describe ('fold', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.fold (a => async h => a + h) ('0') (['1', '2', '3']), '0123')
        })
      })

      describe ('reduce', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.reduce (a => async h => a + h) (['1', '2', '3']), '123')
        })
      })

      describe ('scan', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.scan (a => async h => a + h) ('0') (['1', '2', '3']), ['0', '01', '012', '0123'])
        })
      })

      describe ('map', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.map (async x => x + 1) ([1, 2, 3]), [2, 3, 4])
        })
      })

      describe ('mapi', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.mapi (i => async x => i + x + 1) ([1, 2, 3]), [2, 4, 6])
        })
      })

      describe ('find', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.find (async x => x === 3) ([1, 2, 3]), 3)
        })
      })

      describe ('try_find', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.try_find (async x => x === 3) ([1, 2, 3]), 3)
        })
      })

      describe ('pick', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.pick (async x => x === 3 ? x + 2 : undefined) ([1, 2, 3]), 5)
        })
      })

      describe ('try_pick', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.try_pick (async x => x === 3 ? x + 2 : undefined) ([1, 2, 3]), 5)
        })
      })

      describe ('filter', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.filter (async x => x === 3) ([1, 2, 3]), [3])
        })
      })

      describe ('for_all', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.for_all (async x => x === 3) ([1, 2, 3]), false)
          assert.deepEqual (await A.P.s.for_all (async x => x === 3) ([3, 3, 3]), true)
        })
      })

      describe ('exists', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.s.exists (async x => x === 3) ([1, 2, 3]), true)
          assert.deepEqual (await A.P.s.exists (async x => x === 3) ([1, 2, 1]), false)
        })
      })
    })

    describe ('p', () => {
      describe ('iter', () => {
        it ('works', async () => {
          const arr = []
          await A.P.p.iter (async x => arr.push (x)) ([1, 2, 3])
          assert.deepEqual (arr, [1, 2, 3])
        })
      })

      describe ('iteri', () => {
        it ('works', async () => {
          const arr = []
          await A.P.p.iteri (i => async x => arr.push ([i, x])) ([1, 2, 3])
          assert.deepEqual (arr, [[0, 1], [1, 2], [2, 3]])
        })
      })

      describe ('map', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.map (async x => x + 1) ([1, 2, 3]), [2, 3, 4])
        })
      })

      describe ('mapi', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.mapi (i => async x => i + x + 1) ([1, 2, 3]), [2, 4, 6])
        })
      })

      describe ('find', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.find (async x => x === 3) ([1, 2, 3]), 3)
        })
      })

      describe ('try_find', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.try_find (async x => x === 3) ([1, 2, 3]), 3)
        })
      })

      describe ('pick', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.pick (async x => x === 3 ? x + 2 : undefined) ([1, 2, 3]), 5)
        })
      })

      describe ('try_pick', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.try_pick (async x => x === 3 ? x + 2 : undefined) ([1, 2, 3]), 5)
        })
      })

      describe ('filter', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.filter (async x => x === 3) ([1, 2, 3]), [3])
        })
      })

      describe ('for_all', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.for_all (async x => x === 3) ([1, 2, 3]), false)
          assert.deepEqual (await A.P.p.for_all (async x => x === 3) ([3, 3, 3]), true)
        })
      })

      describe ('exists', () => {
        it ('works', async () => {
          assert.deepEqual (await A.P.p.exists (async x => x === 3) ([1, 2, 3]), true)
          assert.deepEqual (await A.P.p.exists (async x => x === 3) ([1, 2, 1]), false)
        })
      })
    })
  })
})
