# green_curry: Curried functional programming library
## Colorful and delicious!
(ES6 required)

(please disregard the culture references in the examples)

The contents of this package are organized into submodules:

[F: general functions and constants](https://github.com/lightalkmst/green_curry#f-general-functions-and-constants)

[A: arrays](https://github.com/lightalkmst/green_curry#l-1-array-and-2-arrays-functions)

[D: dictionaries](https://github.com/lightalkmst/green_curry#d-dictionary-functions)

[S: strings](https://github.com/lightalkmst/green_curry#s-string-functions)

This library is to provide support for pure functional programming by providing convenience functions in curried form.

Here is an example:
```javascript
// summing up a array
function sum_array(array) {
  var ans = 0;
  for (var i = 0; i < array.length; i++) {
    ans += array[i];
  }
  return ans;
}

// summing up a array of arrays
function sum_arrays(array) {
  var ans = 0;
  for (var i = 0; i < array.length; i++) {
    ans += sum_array(array[i]);
  }
  return ans;
}

// summing up a array of arrays of arrays
function sum_arrays2(array) {
  var ans = 0;
  for (var i = 0; i < array.length; i++) {
    ans += sum_arrays(array[i]);
  }
  return ans;
}
```
The above code, functionally:
```javascript
const green_curry = require ('green_curry') (['globalize', 'short F.c']})

// summing up a array
const sum_array = A.fold (F ['+']) (0)

// summing up a array of arrays
const sum_arrays = F.c (A.map (sum_array) >> sum_array)

// summing up a array of arrays of arrays
const sum_arrays2 = F.c (A.map (sum_arrays) >> sum_array)
```
An understanding of the typed lambda calculus, currying, JavaScript type system, closures, and mutability are recommended for effective use of this library. All functions are free of self-references, allowing their safe use as first-class functions. All functions are pure, except globalize, F.c, and F.p.

## Initializer options
Initializer options are compatible with each other

### globalize
Pulls the included submodules into global scope to obviate the need for fully-qualifying each resource

All examples on this page will assume this has already been called

(note: works both in-server and in-browser)
```javascript
var green_curry = require ('green_curry') (['globalize'])
F.log ('Hint: 3?') // prints 'Hint: 3?'
```

### short F.c
Removes the need for the first call to F.c

(note: this will break compatibility of nested F.c and F.p, and as such it is recommended to avoid this for any non-trivial project)
```javascript
var green_curry = require ('green_curry') (['short F.c'])
var f = green_curry.F.c ((x => `Hint: ${x}?`) >> green_curry.F.log)
f ('3') // prints 'Hint: 3?'
```

## F (general functions and constants)
(note: regard the operators as prefix notation)

#### F.id : (x: 'a) -> 'a
The identity function

#### F.const : (x: 'a) -> unit -> 'a
Generates a constant function

#### F.ignore : (x: 'a) -> unit
Does nothing

#### F.exec : (f: unit -> 'a) -> 'a
Executes the given function

#### F.throw : (x: 'a) -> unit
Throw x

#### F.log : (x: 'a) -> unit
An alias for console.log.bind (console)

Aliasing and calling console.log by itself without binding will throw an exception

#### F.log_json : (x: 'a) -> (r: string array) -> (s: int) -> unit
Same as curried JSON.stringify and then console.log

#### F.= : (x: 'a) -> (y: 'a) -> bool
Deep comparison of x and y

#### F.== : (x: 'a) -> (y: 'a) -> bool
Compares the equality of x and y coerced to x's type

#### F.=== : (x: 'a) -> (y: 'a) -> bool
Compares the equality of x and y

#### F.!= : (x: 'a) -> (y: 'a) -> bool
#### F.<> : (x: 'a) -> (y: 'a) -> bool
Compares the inequality of x and y coerced to x's type

#### F.!== : (x: 'a) -> (y: 'a) -> bool
Compares the inequality of x and y

#### F.> : (x: num) -> (y: num) -> bool
Returns if x is greater than y

#### F.>= : (x: num) -> (y: num) -> bool
Returns if x is greater than or equal to y

#### F.< : (x: num) -> (y: num) -> bool
Returns if x is lesser than y

#### F.<= : (x: num) -> (y: num) -> bool
Returns if x is lesser than or equal to y

#### F.! : (x: bool) -> bool
Negates x

#### F.~ : (x: num) -> num
2's complements x

#### F.+ : (x: num) -> (y: num) -> num
Adds x by y

#### F.- : (x: num) -> (y: num) -> num
Subtracts x by y

#### F.* : (x: num) -> (y: num) -> num
Multiplies x by y

#### F./ : (x: num) -> (y: num) -> num
Divides x by y

#### F.% : (x: num) -> (y: num) -> num
Modulo divides x by y

#### F.| : (x: num) -> (y: num) -> num
Bitwise ors x by y

#### F.|| : (x: bool) -> (y: bool) -> bool
Logical ors x by y

(note: the arguments are evaluated eagerly so this does not short-circuit)

#### F.& : (x: num) -> (y: num) -> num
Bitwise ands x by y

#### F.&& : (x: bool) -> (y: bool) -> bool
Logical ands x by y

(note: the arguments are evaluated eagerly so this does not short-circuit)

#### F.^ : (x: num) -> (y: num) -> num
Bitwise xors x by y

#### F.>>> : (x: num) -> (y: num) -> num
Sign-propagating right shifts x by y

#### F.>>>> : (x: num) -> (y: num) -> num
Zero-fill right shifts x by y

#### F.<<< : (x: num) -> (y: num) -> num
Left shifts x by y

#### F.?? : (x: 'a) -> (y: 'a) -> 'a
Returns x if it is not null and y otherwise

(note: the arguments are evaluated eagerly so this does not short-circuit)

#### F.?: : (x: bool) -> (y: 'a) -> (z: 'a) -> 'a
Returns y if x and z otherwise

(note: the arguments are evaluated eagerly so this does not short-circuit)

#### F.|> : (x: 'a) -> (f: 'a -> 'b) -> 'b
#### F.@@ : (x: 'a) -> (f: 'a -> 'b) -> 'b
Calls f with x and returns the result

#### F.<| : (f: 'a -> 'b) -> (x: 'a) -> 'b
Calls f with x and returns the result

#### F.<< : (f: 'a -> 'b) -> (g: 'c -> 'a) -> ('c -> 'a)
Function composes f and g

#### F.>> : (f: 'a -> 'b) -> (g: 'c -> 'a) -> ('a -> 'c)
Reverse function composes f and g

#### F.neg : (f: 'a -> bool) -> ('a -> bool)
Returns a predicate that is the negation of f

#### F.union : (f: 'a -> bool) -> (g: 'a -> bool) -> ('a -> bool)
Returns a predicate that is a union of f and g

#### F.inter : (f: 'a -> bool) -> (g: 'a -> bool) -> ('a -> bool)
Returns a predicate that is an intersection of f and g

#### F.try
Calls the first function and returns the result

If an exception is thrown, passes it to the second function and returns the result

Essentially try/catch as an expression

```javascript
F.try (() => {
  F.log ('Hint: 3?')
  throw new Error ()
})
.catch (err => {
  F.log (true)
}) // prints 'Hint: 3?' then true
```

#### F.swap : (f: 'a -> 'b -> 'c) -> ('b -> 'a -> 'c)
Swaps the order of the next two arguments of f

#### F.delay : (x: num) -> (f: unit -> unit) -> unit
Calls f after waiting x millisecons

#### F.tap : (f: 'a -> 'b) -> (x: 'a) -> 'a
Calls f with x and returns x

(note: for side-effecting when you want to retain the reference)

#### F.rcomp : (fs: (? -> ?) array) -> (? -> ?)
Reverse function composes the functions in fs

#### F.c : unit -> (fs: (? -> ?) array) -> (? -> ?)
Reverse function composes fs with a temporary DSL

(note: this is safe for nested usage in other instances of F.c and F.p)

(note: works by overriding Function.valueOf)
```javascript
var f = F.c () (
    F.tap (F.log)
    >> F['='] ('Hint: 3?')
    >> F.tap (F.log)
)
f ('Hint: 3?') // true // prints 'Hint: 3?' then 'true'
```
#### F.p : (x: ?) -> (fs: (? -> ?) array) -> ?
Reverse function composes fs with a temporary DSL and calls that with x and returns the result

(note: this is safe for nested usage in other instances of F.c and F.p)

(note: works by overriding Function.valueOf)
```javascript
F.p ('Hint: 3?') (
    F.tap (F.log)
    >> F['='] ('Hint: 3?')
    >> F.tap (F.log)
) == true // prints 'Hint: 3?' then 'true'
```
#### F.memoize : (f: 'a -> 'b) -> ('a -> 'b)
Returns a memoized version f

(note: the memoization has O(n) lookup)

#### F.times : (x: num) -> (f: unit -> unit) -> unit
Invokes f x times

#### F.after : (x: num) -> (f: 'a -> 'b') -> ('a -> unit/'b)
Returns a version of f that does nothing and returns undefined until the xth time when it reverts to normal

#### F.before : (x: num) -> (f: 'a -> 'b') -> ('a -> unit/'b)
Returns a version of f that operates normally until the xth time when it starts doing nothing and returns undefined

#### F.match
Returns the value of the first matching case

If no cases are matched and it is terminated with default, then the default case is executed

If no cases are matched and it is terminated with end, then an exception is thrown

```javascript
F.match (3)
.case (1) (x => x + 5)
.case (2) (x => x + 4)
.case (3) (x => x)
.default (x => x + 3) == 3
```

#### F.match_f
Same as F.match, but takes predicate functions as cases

### F.P (promise-based utility functions)
Promise-based utility functions are contained in the F.P submodule

#### F.P.try
Same as F.try, but supports promised functions

Only the expression as a whole returns a promise

```javascript
await F.P.try (async () => {
  F.log ('Hint: 3?')
  throw new Error ()
})
.catch (async err => {
  F.log (true)
}) // prints 'Hint: 3?' then true
```

## A (1 array and 2 arrays functions)
(note: arrays are assumed to be dense, meaning all data is contiguous)

(note: all respective orders are preserved, except in obvious cases)

### 1 array functions

#### A.clone : (xs: 'a array) -> 'a array
Returns a shallow copy of xs

#### A.cons : (x: 'a) -> (xs: 'a array) -> 'a array
Prepends x to l

#### A.head : (xs: 'a array) -> 'a
Throws an exception if xs is empty and returns the first element of xs otherwise

#### A.tail : (xs: 'a array) -> 'a array
Throws an exception if xs is empty and returns all elements of xs except the first otherwise

#### A.length : (xs: 'a array) -> num
Returns the length of l

#### A.is_empty : (xs: 'a array) -> bool
Returns whether the length of xs is 0

#### A.get : (x: num) -> (xs: 'a array) -> 'a
Returns the xth element in xs if it exists and returns undefined otherwise

#### A.range : (x: num) -> (y: num) -> num array
Returns the numbers between x and y, double inclusive, if x is less than or equal to y and an empty array otherwise

#### A.create : (x: num) -> (y: 'a) -> 'a array
Returns y repeated x times

#### A.init : (x: num) -> (f: int -> 'a) -> 'a array
Returns an array of x elements generated by f passed each index

#### A.rev : (xs: 'a array) -> 'a array
Returns xs with the elements in reverse order

#### A.iter : (f: 'a -> unit) -> (xs: 'a array) -> unit
Calls f on each element in l

#### A.iteri : (f: int -> 'a -> unit) -> (xs: 'a array) -> unit
Same as A.iter, except additionally passes the index as well

#### A.fold : (f: 'a -> 'b -> 'a) -> (a: 'a) -> (xs: 'b array) -> 'a
Calls f on the accumulator, initialized at a, and each element of xs and returns the result

#### A.reduce : (f: 'a -> 'a -> 'a) -> (xs: 'a array) -> 'a
Throws an exception is xs is empty and is the same as A.fold with the accumulator initialized to the first element in xs otherwise

#### A.scan : (f: 'a -> 'b -> 'a) -> (a: 'a) -> (xs: 'b array) -> 'a array
Same as A.fold, but additionally returns all of the partial sums

#### A.map : (f: 'a -> 'b) -> (xs: 'a array) -> 'b array
Returns xs with each element transformed by f

#### A.mapi : (f: int -> 'a -> 'b) -> (xs: 'a array) -> 'b array
Same as A.map, but additionally passes the index as well

#### A.find : (f: 'a -> bool) -> (xs: 'a array) -> 'a
Returns the first element in xs for which f returns true and throws an error if one does not exist

#### A.try_find : (f: 'a -> bool) -> (xs: 'a array) -> 'a
Returns the first element in xs for which f returns true and returns undefined if one does not exist

#### A.find_index : (f: 'a -> bool) -> (xs: 'a array) -> 'a
Returns the index of the first element in xs for which f returns true and throws an error if one does not exist

#### A.try_find_index : (f: 'a -> bool) -> (xs: 'a array) -> 'a
Returns the index of the first element in xs for which f returns true and returns undefined if one does not exist

#### A.pick : (f: 'a -> unit/'b) -> (xs: 'a array) -> unit/'b
Returns the result of f for the first element in xs for which f does not return undefined and throws an error if one does not exist

#### A.try_pick : (f: 'a -> unit/'b) -> (xs: 'a array) -> unit/'b
Returns the result of f for the first element in xs for which f does not return undefined and throws an error if one does not exist

#### A.filter : (f: 'a -> bool) -> (xs: 'a array) -> 'a array
Returns xs without the elements for which f returns false

#### A.for_all : (f: 'a -> bool) -> (xs: 'a array) -> bool
Returns if f is true for all elements in l, vacuously true

#### A.exists : (f: 'a -> bool) -> (xs: 'a array) -> bool
Returns if f is true for any element in l, vacuously false

#### A.contains : (x: 'a) -> (xs: 'a array) -> bool
Returns if any element in xs is equal to x

#### A.sort : (f: 'a -> 'a -> int) -> (xs: 'a array) -> 'a array
Returns xs sorted by f determined by normal comparator standards

#### A.partition : (f: 'a -> bool) -> (xs: 'a array) -> ('a array * 'a array)
Returns xs into two arrays, the first containing all elements for which f is true and the second containing everything else

#### A.uniq : (xs: 'a array) -> 'a array
Returns xs with duplicates removed

#### A.hash_uniq : (f: 'a -> string) -> (xs: 'a array) -> 'a array
Returns xs with duplicates removed according to the mapping through f

(note: this is substantially faster than A.uniq)

#### A.unzip : (xs: ('a * 'b) array) -> 'a array * 'b array
Returns the arrays of the first element of each element of xs and the second element of each element of l

(note: this function does not enforce density)

#### A.flatten: (xss: 'a array array) -> 'a array
Returns an array of xss flattened by one level

### 2 array functions
#### A.append : (l1: 'a array) -> (l2: 'a array) -> 'a array
Returns l1 prepended to l2

#### A.eq_length : (l1: 'a array) -> (l2: 'b array) -> bool
Returns if l1 and l2 have equal lengths

#### A.uneq_length : (l1: 'a array) -> (l2: 'b array) -> bool
Returns if l1 and l2 have unequal lengths

#### A.iter2 : (f: 'a -> 'b -> unit) -> (l1: 'a array) -> (l2: 'b array) -> unit
Throws exception F.e if l1 and l2 have unequal lengths and is the same as A.iter, but with corresponding elements of each array passed in otherwise

#### A.iteri2 : (f: int -> 'a -> 'b -> unit) -> (l1: 'a array) -> (l2: 'b array) -> unit
Same as A.iter2, except additionally passing the index

#### A.fold2 : (f: 'a -> 'b -> 'c -> 'a) -> (a: 'a) -> (l1: 'b array) -> (l2: 'c array) -> 'a
Throws exception F.e if l1 and l2 have unequal lengths and is the same as A.fold, but with corresponding elements of each array passed in otherwise

#### A.map2 : (f: 'a -> 'b -> 'c) -> (l1: 'a array) -> (l2: 'b array) -> 'c array
Throws exception F.e if l1 and l2 have unequal lengths and is the same as A.map, but with corresponding elements of each array passed in otherwise

#### A.mapi2 : (f: int -> 'a -> 'b -> 'c) -> (l1: 'a array) -> (l2: 'b array) -> 'c array
Throws exception F.e if l1 and l2 have unequal lengths and is the same as A.mapi, but with corresponding elements of each array passed in otherwise

#### A.for_all2 : (f: 'a -> 'b -> bool) -> (l1: 'a array) -> (l2: 'b array) -> bool
Throws exception F.e if l1 and l2 have unequal lengths and is the same as A.for_all, but with corresponding elements of each array passed in otherwise

#### A.exists2 : (f: 'a -> 'b -> bool) -> (l1: 'a array) -> (l2: 'b array) -> bool
Throws exception F.e if l1 and l2 have unequal lengths and is the same as A.exists, but with corresponding elements of each array passed in otherwise

#### A.zip : 'a array -> 'b array -> ('a * 'b) array
Throws exception F.e if l1 and l2 have unequal lengths and returns the corresponding elements of l1 and l2 combined

#### A.equals : (x: 'a array) -> (y: 'a array) -> bool
Deep comparison of x and y

### A.P (promise-based array functions)
Promise-based array functions are contained in the A.P submodule, with A.P.s serial and A.P.p parallel submodules

Serial functions will operate in order and will reject on the first error or resolve on success

Parallel functions will initiate all operations at the same time and will resolve when all operations complete or reject on the first error before that

Not all functions are available in both modes

#### A.P.\*.init : (x: num) -> (f: int -> 'a promise) -> 'a array promise
Returns an array of x elements generated by f passed each index

#### A.P.\*.iter : (f: 'a -> unit promise) -> (xs: 'a array) -> unit promise
Calls f on each element in l

#### A.P.\*.iteri : (f: int -> 'a -> unit promise) -> (xs: 'a array) -> unit promise
Same as A.iter, except additionally passes the index as well

#### A.P.s.fold : (f: 'a -> 'b -> 'a promise) -> (a: 'a) -> (xs: 'b array) -> 'a promise
Calls f on the accumulator, initialized at a, and each element of xs and returns the result

#### A.P.s.reduce : (f: 'a -> 'a -> 'a promise) -> (xs: 'a array) -> 'a promise
Throws an exception is xs is empty and is the same as A.fold with the accumulator initialized to the first element in xs otherwise

#### A.P.s.scan : (f: 'a -> 'b -> 'a promise) -> (a: 'a) -> (xs: 'b array) -> 'a array promise
Same as A.fold, but additionally returns all of the partial sums

#### A.P.\*.map : (f: 'a -> 'b promise) -> (xs: 'a array) -> 'b array promise
Returns xs with each element transformed by f

#### A.P.\*.mapi : (f: int -> 'a -> 'b promise) -> (xs: 'a array) -> 'b array promise
Same as A.map, but additionally passes the index as well

#### A.P.\*.find : (f: 'a -> bool promise) -> (xs: 'a array) -> 'a promise
Returns the first element in xs for which f returns true and throws an error if one does not exist

#### A.P.\*.try_find : (f: 'a -> bool promise) -> (xs: 'a array) -> 'a promise
Returns the first element in xs for which f returns true and returns undefined if one does not exist

#### A.P.\*.pick : (f: 'a -> unit/'b promise) -> (xs: 'a array) -> unit/'b promise
Returns the result of f for the first element in xs for which f does not return undefined and throws an error if one does not exist

#### A.P.\*.try_pick : (f: 'a -> unit/'b promise) -> (xs: 'a array) -> unit/'b promise
Returns the result of f for the first element in xs for which f does not return undefined and throws an error if one does not exist

#### A.P.\*.filter : (f: 'a -> bool promise) -> (xs: 'a array) -> 'a array promise
Returns xs without the elements for which f returns false

#### A.P.\*.for_all : (f: 'a -> bool promise) -> (xs: 'a array) -> bool promise
Returns if f is true for all elements in l, vacuously true

#### A.P.\*.exists : (f: 'a -> bool promise) -> (xs: 'a array) -> bool promise
Returns if f is true for any element in l, vacuously false

## D (dictionary functions)
#### D.is_empty : (d: 'a, 'b dictionary) -> bool
Returns if d is empty

#### D.get : (k: 'a) -> (d: 'a, 'b dictionary) -> 'b
Returns the element in d with key k

#### D.set : (k: 'a) -> (v: 'b) -> (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Returns d with key k set to value v

#### D.create : (xs: ('a * 'b) array) -> 'a, 'b dictionary
Returns the dictionary with pairs of each element with the first element as the key and the second element as the value

#### D.keys : (d: 'a, 'b dictionary) -> 'a array
Returns the keys of d

#### D.vals : (d: 'a, 'b dictionary) -> 'b array
Returns the values of d

#### D.pairs : (d: 'a, 'b dictionary) -> ('a * 'b) array
Returns the key, value pairs of d

#### D.bind : (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Binds the self-references for functions inside d to d and returns d

(note: this one of the gaps I mentioned in the opening; in languages that automatically resolve this problem, it's not an issue)

#### D.freeze : (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Freezes d and returns d

#### D.freeze_bind : (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Same as D.bind then D.freeze

#### D.iter : (f: 'a -> unit) -> (d: 'b, 'a dictionary) -> unit
Same as A.iter on the values of d, except with keys instead of indices

#### D.iterk : (f: 'a -> 'b -> 'c -> unit) -> (d: 'a, 'b dictionary) -> unit
Same as D.iter, except additionally passing the key

#### D.fold : (f: 'a -> 'b -> 'a) -> (a: 'a) -> (d: 'c, 'b dictionary) -> 'a
Same as A.fold on the values of d

#### D.foldk : (f: 'a -> 'b -> 'c -> 'a) -> (a: 'a) -> (d: 'b, 'c dictionary) -> 'a
Same as D.fold, except additionally passing the key

#### D.map : (f: 'a -> 'b) -> (d: 'c, 'a dictionary) -> 'c, 'b dictionary
Same as A.map on the values of d

#### D.mapk : (f: 'a -> 'b -> 'c) -> (d: 'a, 'b dictionary) -> 'a, 'c dictionary
Same as D.map, except additionally passing the key

#### D.find : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> 'a
Same as A.find on the values of d

#### D.findk : (f: 'a -> 'b -> bool) -> (d: 'a, 'b dictionary) -> 'b
Same as D.find, except additionally passing the key

#### D.filter : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> 'a array
Same as A.filter on the values of d

#### D.filterk : (f: 'a -> 'b -> bool) -> (d: 'a, 'b dictionary) -> 'a array
Same as D.filter, except additionally passed the key

#### D.for_all : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> bool
Same as A.for_all on the values of d

#### D.exists : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> bool
Same as A.exists on the values of d

#### D.contains : (x: 'a) -> (d: 'b, 'a dictionary) -> bool
Same as A.contains on the values of d

#### D.containsk : (x: 'a) -> (d: 'a, 'b dictionary) -> bool
Same as A.contains on the keys of d

#### D.length : (d: 'a, 'b dictionary) -> num
Returns the number of key, value pairs in d

#### D.partition : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> (('b, 'a) dictionary * ('b, 'a) dictionary)
Same as A.partition on the values of d

#### D.extend : (d1: 'a, 'b dictionary) -> (d2: 'a, 'b dictionary) -> 'a, 'b dictionary
Returns d1 overlaid by d2

#### D.copy : (xs: 'a array) -> (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Returns d with only the pairs with keys in xs

#### D.delete : (xs: 'a array) -> (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Returns d without the pairs with keys in xs

#### D.equals : (d1: ('a, 'b) dictionary) -> (d2: ('a, 'b) dictionary) -> bool
Deep comparison of d1 and d2

## S (string functions)
#### S.length : (x: string) -> num
Returns the length of x

#### S.get : (x: num) -> (y: string) -> string
Returns the xth character in y

#### S.substr : (x: num) -> (y: num) -> (z: string) -> string
Returns the substring from x to y in z with some slice logic

#### S.index : (x: string) -> (y: string) -> num
Returns the first index at which x appears in y

#### S.contains : (x: string) -> (y: string) -> bool
Returns if x appears at least once in y

#### S.compare : (x: string) -> (y: string) -> num
Follows normal comparator rules for strings for comparing x to y

#### S.match : (r: regex) -> (x: string) -> string array
Returns the match and capture groups of r in x if x matches r and null otherwise

#### S.replace : (r: regex) -> (x: string) -> (y: string) -> string
Returns y with matches of r replaced by x

#### S.rindex : (x: string) -> (y: string) -> num
Same as S.index, except with the last occurence

#### S.search : (r: regex) -> (x: string) -> num
Returns the first index that x matches r

#### S.split : (r: regex) -> (x: string) -> string array
Returns a array of the substrings of x split by r

#### S.lower : (x: string) -> string
Returns x with all characters lowercase

#### S.upper : (x: string) -> string
Returns x with all characters uppercase

#### S.trim : (x: string) -> string
Returns x without surrounding whitespace

#### S.equals : (x: string) -> (y: string) -> bool
Returns if x and y are equal

#### S.join : (x: string) -> (xs: string array) -> string
Returns the string of all strings in xs with x in between each element
