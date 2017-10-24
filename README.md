# green_curry: Curried functional programming library
## Colorful and delicious!
(ES6 required)

(please disregard the culture references in the examples)

The contents of this package are organized into submodules:

[F: general functions and constants](https://github.com/lightalkmst/green_curry#f-general-functions-and-constants)

[L: lists (arrays)](https://github.com/lightalkmst/green_curry#l-1-list-and-2-lists-functions)

[D: dictionaries (objects)](https://github.com/lightalkmst/green_curry#d-dictionary-functions)

[S: strings](https://github.com/lightalkmst/green_curry#s-string-functions)

This library is to provide support for functional programming. Though some other libraries exist that expose functional programming in JavaScript, they take a partially object-oriented approach that dilutes a lot of the value of a functional style. Though this mixture can be useful, those libraries have not closed the gap caused by some of JavaScript's idiosyncracies.

I believe that what's held JavaScript back from being adopted as a functional programming language is its lack of a purely functional library. Functional programming's rewards are reaped best when currying is available, enabling point-free form to increase the abstractness and modularity of the code. One of the strengths of functional programming is that a vast majority of boilerplate is already replaced by higher-order library functions. As these functions are all very general, common boilerplate is replaced with simple functions that leave just your desired logic in place. Additionally, since higher-order functions are fueled by inversion of control, the same functions are used and recycled; they may never become outdated.

Here is an example:
```javascript
// summing up a list
function sum_list(list) {
  var ans = 0;
  for (var i = 0; i < list.length; i++) {
    ans += list[i];
  }
  return ans;
}

// summing up a list of lists
function sum_lists(list) {
  var ans = 0;
  for (var i = 0; i < list.length; i++) {
    ans += sum_list(list[i]);
  }
  return ans;
}

// summing up a list of lists of lists
function sum_lists2(list) {
  var ans = 0;
  for (var i = 0; i < list.length; i++) {
    ans += sum_lists(list[i]);
  }
  return ans;
}
```
The above code, functionally:
```javascript
const green_curry = require ('green_curry')
green_curry.globalize ()

// summing up a list
const sum_list = L.fold (F['+']) (0)

// summing up a list of lists
const sum_lists = F.c () (L.map (sum_list) >> sum_list)

// summing up a list of lists of lists
const sum_lists2 = F.c () (L.map (sum_lists) >> sum_list)
```
An understanding of the typed lambda calculus, currying, JavaScript type system, closures, and mutability are recommended for effective use of this library. All functions are free of self-references, allowing their safe use as first-class functions. All functions are pure, except globalize, F.c, and F.p.

## globalize : unit -> unit
Pulls the included submodules into global scope to obviate the need for fully-qualifying each resource

All examples on this page will assume this has already been called

(note: works both in-server and in-browser)
```javascript
var green_curry = require ('green_curry')
green_curry.F.log ('Hint: 3?') // prints 'Hint: 3?'
green_curry.globalize () // raises green_curry library to global scope
F.log ('Hint: 3?') // prints 'Hint: 3?'
```
## F (general functions and constants)
(note: regard the operators as prefix notation)

#### F.e : obj
Constant exception object thrown by this library

#### F.id : (x: 'a) -> 'a
The identity function

#### F.const : (x: 'a) -> unit -> 'a
Generates a constant function

#### F.ignore : (x: 'a) -> unit
Does nothing

#### F.exec : (f: unit -> 'a) -> 'a
Executes the given function

#### F.ex_if : (x: bool) -> unit
If x is true

Then throw the exception F.e

#### F.log : (x: 'a) -> unit
An alias for console.log.bind (console)

Aliasing and calling console.log by itself without binding will throw an exception

#### F.eval : (s: string) -> 'a
A wrapper for eval that will always operate within calling scope

An unaliased call to eval will operate within the calling scope

An aliased call to eval will operate at the global scope
```javascript
var a = 'Hint: 3?'
eval ('a') // 'Hint: 3?'
var f = eval
f ('a') // undefined
var f = F.eval
f ('a') // 'Hint: 3?'
```
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

#### F.try : (b: bool) -> (fs: (unit -> 'a) list) -> 'a
Iteratively calls each function in fs until one returns without an exception and returns the result

If b, then prints each exception to console

#### F.swap : (f: 'a -> 'b -> 'c) -> ('b -> 'a -> 'c)
Swaps the order of the next two arguments of f

#### F.delay : (x: num) -> (f: unit -> unit) -> unit
Calls f after waiting x millisecons

#### F.tap : (f: 'a -> 'b) -> (x: 'a) -> 'a
Calls f with x and returns x

(note: for side-effecting when you want to retain the reference)

#### F.rcomp : (fs: (? -> ?) list) -> (? -> ?)
Reverse function composes the functions in fs

#### F.c : unit -> (fs: (? -> ?) list) -> (? -> ?)
Reverse function composes fs with a temporary DSL

(note: requires at least two functions to be composed to work properly)

(note: this is safe for nested usage in other instances of F.c and F.p)
```javascript
var f = F.c () (
    F.tap (F.log)
    >> F['='] ('Hint: 3?')
    >> F.tap (F.log)
)
f ('Hint: 3?') // true // prints 'Hint: 3?' then 'true'
```
#### F.p : (x: ?) -> (fs: (? -> ?) list) -> ?
Reverse function composes fs with a temporary DSL and calls that with x and returns the result

(note: requires at least two functions to be composed to work properly)

(note: this is safe for nested usage in other instances of F.c and F.p)
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

## L (1 list and 2 lists functions)
(note: lists are assumed to be dense, meaning all data is contiguous)

(note: all respective orders are preserved, except in obvious cases)

### 1 list functions

#### L.cons : (x: 'a) -> (l: 'a list) -> 'a list
Prepends x to l

#### L.head : (l: 'a list) -> 'a
Throws an exception if l is empty and returns the first element of l otherwise

#### L.tail : (l: 'a list) -> 'a list
Throws an exception if l is empty and returns all elements of l except the first otherwise

#### L.length : (l: 'a list) -> num
Returns the length of l

#### L.is_empty : (l: 'a list) -> bool
Returns true if l is empty and false otherwise

#### L.get : (x: num) -> (l: 'a list) -> 'a
Returns the xth element in l if it exists and returns undefined otherwise

#### L.range : (x: num) -> (y: num) -> num list
Returns the numbers between x and y, double inclusive, if x is less than or equal to y and an empty list otherwise

#### L.create : (x: num) -> (y: 'a) -> 'a list
Returns y repeated x times

#### L.init : (x: num) -> (f: int -> 'a) -> 'a list
Returns a list of x elements generated by f passed each index

#### L.rev : (l: 'a list) -> 'a list
Returns l with the elements in reverse order

#### L.iter : (f: 'a -> unit) -> (l: 'a list) -> unit
Calls f on each element in l

#### L.iteri : (f: int -> 'a -> unit) -> (l: 'a list) -> unit
Same as L.iter, except additionally passes the index as well

#### L.fold : (f: 'a -> 'b -> 'a) -> (a: 'a) -> (l: 'b list) -> 'a
Calls f on the accumulator, initialized at a, and each element of l and returns the result

#### L.reduce : (f: 'a -> 'a -> 'a) -> (l: 'a list) -> 'a
Throws an exception is l is empty and is the same as L.fold with the accumulator initialized to the first element in l otherwise

#### L.scan : (f: 'a -> 'b -> 'a) -> (a: 'a) -> (l: 'b list) -> 'a list
Same as L.fold, but additionally returns all of the partial sums

#### L.map : (f: 'a -> 'b) -> (l: 'a list) -> 'b list
Returns l with each element transformed by f

#### L.mapi : (f: int -> 'a -> 'b) -> (l: 'a list) -> 'b list
Same as L.map, but additionally passes the index as well

#### L.find : (f: 'a -> bool) -> (l: 'a list) -> 'a
Returns the first element in l for which f returns true and throws F.e if one does not exist

#### L.pick : (f: 'a -> unit/'b) -> (l: 'a list) -> unit/'b
Returns the result of f for the first element in l for which f does not return undefined and throws F.e if one does not exist

#### L.filter : (f: 'a -> bool) -> (l: 'a list) -> 'a list
Returns l without the elements for which f returns false

#### L.for_all : (f: 'a -> bool) -> (l: 'a list) -> bool
Returns if f is true for all elements in l, vacuously true

#### L.exists : (f: 'a -> bool) -> (l: 'a list) -> bool
Returns if f is true for any element in l, vacuously false

#### L.contains : (x: 'a) -> (l: 'a list) -> bool
Returns if any element in l is equal to x

#### L.sort : (f: 'a -> 'a -> int) -> (l: 'a list) -> 'a list
Returns l sorted by f determined by normal comparator standards

#### L.partition : (f: 'a -> bool) -> (l: 'a list) -> ('a list * 'a list)
Returns l into two lists, the first containing all elements for which f is true and the second containing everything else

#### L.clone: (l: 'a list) -> 'a list
Returns a shallow copy of l

#### L.uniq : (l: 'a list) -> 'a list
Returns l with duplicates removed

#### L.unzip : (l: ('a * 'b) list) -> 'a list * 'b list
Returns the lists of the first element of each element of l and the second element of each element of l

(note: this function does not enforce density)

### 2 list functions
#### L.append : (l1: 'a list) -> (l2: 'a list) -> 'a list
Returns l1 prepended to l2

#### L.eq_length : (l1: 'a list) -> (l2: 'b list) -> bool
Returns if l1 and l2 have equal lengths

#### L.uneq_length : (l1: 'a list) -> (l2: 'b list) -> bool
Returns if l1 and l2 have unequal lengths

#### L.iter2 : (f: 'a -> 'b -> unit) -> (l1: 'a list) -> (l2: 'b list) -> unit
Throws exception F.e if l1 and l2 have unequal lengths and is the same as L.iter, but with corresponding elements of each list passed in otherwise

#### L.iteri2 : (f: int -> 'a -> 'b -> unit) -> (l1: 'a list) -> (l2: 'b list) -> unit
Same as L.iter2, except additionally passing the index

#### L.fold2 : (f: 'a -> 'b -> 'c -> 'a) -> (a: 'a) -> (l1: 'b list) -> (l2: 'c list) -> 'a
Throws exception F.e if l1 and l2 have unequal lengths and is the same as L.fold, but with corresponding elements of each list passed in otherwise

#### L.map2 : (f: 'a -> 'b -> 'c) -> (l1: 'a list) -> (l2: 'b list) -> 'c list
Throws exception F.e if l1 and l2 have unequal lengths and is the same as L.map, but with corresponding elements of each list passed in otherwise

#### L.mapi2 : (f: int -> 'a -> 'b -> 'c) -> (l1: 'a list) -> (l2: 'b list) -> 'c list
Throws exception F.e if l1 and l2 have unequal lengths and is the same as L.mapi, but with corresponding elements of each list passed in otherwise

#### L.for_all2 : (f: 'a -> 'b -> bool) -> (l1: 'a list) -> (l2: 'b list) -> bool
Throws exception F.e if l1 and l2 have unequal lengths and is the same as L.for_all, but with corresponding elements of each list passed in otherwise

#### L.exists2 : (f: 'a -> 'b -> bool) -> (l1: 'a list) -> (l2: 'b list) -> bool
Throws exception F.e if l1 and l2 have unequal lengths and is the same as L.exists, but with corresponding elements of each list passed in otherwise

#### L.zip : 'a list -> 'b list -> ('a * 'b) list
Throws exception F.e if l1 and l2 have unequal lengths and returns the corresponding elements of l1 and l2 combined

#### L.equals : (x: 'a list) -> (y: 'a list) -> bool
Deep comparison of x and y

## D (dictionary functions)
#### D.is_empty : (d: 'a, 'b dictionary) -> bool
Returns if d is empty

#### D.get : (k: 'a) -> (d: 'a, 'b dictionary) -> 'b
Returns the element in d with key k

#### D.create : (l: ('a * 'b) list) -> 'a, 'b dictionary
Returns the dictionary with pairs of each element with the first element as the key and the second element as the value

#### D.keys : (d: 'a, 'b dictionary) -> 'a list
Returns the keys of d

#### D.vals : (d: 'a, 'b dictionary) -> 'b list
Returns the values of d

#### D.pairs : (d: 'a, 'b dictionary) -> ('a * 'b) list
Returns the key, value pairs of d

#### D.bind : (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Binds the self-references for functions inside d to d and returns d

(note: this one of the gaps I mentioned in the opening; in languages that automatically resolve this problem, it's not an issue)

#### D.freeze : (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Freezes d and returns d

#### D.freeze_bind : (d: 'a, 'b dictionary) -> 'a, 'b dictionary
Same as D.bind then D.freeze

#### D.iter : (f: 'a -> unit) -> (d: 'b, 'a dictionary) -> unit
Same as L.iter on the values of d, except with keys instead of indices

#### D.iterk : (f: 'a -> 'b -> unit) -> (d: 'a, 'b dictionary) -> unit
Same as D.iter, except additionally passing the key

#### D.fold : (f: 'a -> 'b -> 'a) -> (a: 'a) -> (d: 'c, 'b dictionary) -> 'a
Same as L.fold on the values of d

#### D.map : (f: 'a -> 'b) -> (d: 'c, 'a dictionary) -> 'c, 'b dictionary
Same as L.map on the values of d

#### D.mapk : (f: 'a -> 'b -> 'c) -> (d: 'a, 'b dictionary) -> 'a, 'c dictionary
Same as D.map, except additionally passing the key

#### D.find : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> 'a
Same as L.find on the values of d

#### D.filter : (f: 'a -> bool) -> (d: 'a list) -> 'a list
Same as L.filter on the values of d

#### D.filterk : (f: 'a -> 'b -> bool) -> (d: 'a list) -> 'a list
Same as D.filter, except additionally passed the key

#### D.for_all : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> bool
Same as L.for_all on the values of d

#### D.exists : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> bool
Same as L.exists on the values of d

#### D.contains : (x: 'a) -> (d: 'b, 'a dictionary) -> bool
Same as L.contains on the values of d

#### D.length : (d: 'a, 'b dictionary) -> num
Returns the number of key, value pairs in d

#### D.partition : (f: 'a -> bool) -> (d: 'b, 'a dictionary) -> (('b, 'a) dictionary * ('b, 'a) dictionary)
Same as L.partition on the values of d

#### D.extend : (d1: 'a, 'b dictionary) -> (d2: 'a, 'b dictionary) -> 'a, 'b dictionary
Returns d1 overlaid by d2

#### D.delete : (d: 'a, 'b dictionary) -> (l: 'a list) -> 'a, 'b dictionary
Returns d without the pairs with keys in l

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

#### S.match : (r: regex) -> (x: string) -> string list
Returns the match and capture groups of r in x if x matches r and null otherwise

#### S.replace : (r: regex) -> (x: string) -> (y: string) -> string
Returns y with matches of r replaced by x

#### S.rindex : (x: string) -> (y: string) -> num
Same as S.index, except with the last occurence

#### S.search : (r: regex) -> (x: string) -> num
Returns the first index that x matches r

#### S.split : (r: regex) -> (x: string) -> string list
Returns a list of the substrings of x split by r

#### S.lower : (x: string) -> string
Returns x with all characters lowercase

#### S.upper : (x: string) -> string
Returns x with all characters uppercase

#### S.trim : (x: string) -> string
Returns x without surrounding whitespace

#### S.equals : (x: string) -> (y: string) -> bool
Returns if x and y are equal
