const S = module.exports = {
  // string -> int
  length: s => s.length,

  // int -> string -> string
  get: n => s => s[n],

  // int -> int -> string -> string
  substr: x => y => s => s.slice (x, y),

  // string -> string -> int
  index: s1 => s2 => s2.indexOf (s1),

  // string -> string -> bool
  contains: s1 => s2 => s2.includes (s1),

  // string -> string -> int
  compare: s1 => s2 => s1.localeCompare (s2),

  // string -> regex -> string array
  match: r => s => s.match (r),

  // regex -> string -> string -> string
  replace: r => s1 => s2 => s2.replace (r, s1),

  // string -> string -> int
  rindex: s1 => s2 => s2.lastIndexOf (s1),

  // regex -> string -> int
  search: r => s => s.search (r),

  // regex -> string -> string array
  split: r => s => s.split (r),

  // string -> string
  lower: s => s.toLocaleLowerCase (),

  // string -> string
  upper: s => s.toLocaleUpperCase (),

  // string -> string
  trim: s => s.trim (),

  // string -> string -> bool
  equals: s1 => s2 => s1 === s2,

  // string -> string array -> string
  join: s => ss => ss.join (s),
}
