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

## globalize
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

#### F.ignore : 'a -> unit
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
Compares the arguments with soft equality

#### F.=== : (x: 'a) -> (y: 'a) -> bool
Compares the arguments with hard equality

#### F.!= : (x: 'a) -> (y: 'a) -> bool
#### F.<> : (x: 'a) -> (y: 'a) -> bool
Compares the arguments with soft inequality

#### F.!== : (x: 'a) -> (y: 'a) -> bool
Compares the arguments with hard inequality

#### F.> : (x: num) -> (y: num) -> bool
Returns if (arg1) is greater than (arg2)

#### F.>= : (x: num) -> (y: num) -> bool
Returns if (arg1) is greater than or equal to (arg2)

#### F.< : (x: num) -> (y: num) -> bool
Returns if (arg1) is lesser than (arg2)

#### F.<= : (x: num) -> (y: num) -> bool
Returns if (arg1) is lesser than or equal to (arg2)

#### F.! : (x: bool) -> bool
Negates the argument

#### F.~ : (x: num) -> num
2's complements the argument

#### F.+ : (x: num) -> num
Adds the arguments

#### F.- : (x: num) -> num
Subtracts the arguments

#### F.* : (x: num) -> num
Multiplies the arguments

#### F./ : (x: num) -> num
Divides the arguments

#### F.% : (x: num) -> num
Modulo divides the arguments

#### F.| : (x: num) -> num
Bitwise Or the arguments

#### F.|| : (x: bool) -> bool
Logical Or the arguments

(note: the arguments are evaluated eagerly so this does not short-circuit)

#### F.& : (x: num) -> num
Bitwise And the arguments

#### F.&& : (x: bool) -> bool
Logical And the arguments

(note: the arguments are evaluated eagerly so this does not short-circuit)

#### F.^ : (x: num) -> num
Bitwise Xor the arguments

#### F.>>> : (x: num) -> num
Sign-propagating right shifts the arguments

#### F.>>>> : (x: num) -> num
Zero-fill right shifts the arguments

#### F.<<< : (x: num) -> num
Left shifts the arguments

#### F.?? : (x: 'a) -> (y: 'a) -> 'a
If (arg1) is not null

Then return (arg1)

Else return (arg2)

(note: the arguments are evaluated eagerly so this does not short-circuit)

#### F.?: : (x: bool) -> (y: 'a) -> (z: 'a) -> 'a
If (arg1) is defined

Then return (arg1)

Else return (arg2)

(note: the arguments are evaluated eagerly so this does not short-circuit)

#### F.|> : (x: 'a) -> (f: 'a -> 'b) -> 'b
#### F.@@ : (x: 'a) -> (f: 'a -> 'b) -> 'b
Passes (arg1) into (arg2)

#### F.<| : (f: 'a -> 'b) -> (x: 'a) -> 'b
Passes (arg2) into (arg1)

#### F.<< : (f: 'a -> 'b) -> (g: 'c -> 'a) -> ('c -> 'a)
Function composes the arguments

#### F.>> : (f: 'a -> 'b) -> (g: 'c -> 'a) -> ('a -> 'c)
Reverse function composes the arguments

#### F.neg : (f: 'a -> bool) -> ('a -> bool)
Negates the predicate

#### F.union : (f: 'a -> bool) -> (g: 'a -> bool) -> ('a -> bool)
Returns a predicate that is a union of the predicates

#### F.inter : (f: 'a -> bool) -> (g: 'a -> bool) -> ('a -> bool)
Returns a predicate that is an intersection of the predicates

#### F.try : (b: bool) -> (fs: (unit -> 'a) list) -> 'a
Invokes the first function in (arg2)

If the function throws an exception

Then

&nbsp;&nbsp;&nbsp;&nbsp;If (arg1) is true

&nbsp;&nbsp;&nbsp;&nbsp;Then the exception is printed to console

&nbsp;&nbsp;&nbsp;&nbsp;Recurse this function with (arg1) and the remainder of (arg2)

Else the result is returned

#### F.swap : ('a -> 'b -> 'c) -> ('b -> 'a -> 'c)
Swaps the order of the next two arguments of the given function

#### F.delay : num -> (unit -> unit) -> unit
Calls the given function after waiting the given time in ms

#### F.tap : ('a -> 'b) -> 'a -> 'a
Passes argument 2 to argument 1 and then returns argument 2
(note: for side-effecting when you want to retain the reference)

#### F.rcomp : (? -> ?) list -> (? -> ?)
Reverse function composes the argument

#### F.c : unit -> (? -> ?) list -> (? -> ?)
Reverse function composes the argument, but with a temporary DSL that is applied only one level deep

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
#### F.p : ? -> (? -> ?) list -> ?
Passes (arg1) to the reverse function composed (arg2), but with a temporary DSL that is applied only one level deep

(note: requires at least two functions to be composed to work properly)

(note: this is safe for nested usage in other instances of F.c and F.p)
```javascript
F.p ('Hint: 3?') (
    F.tap (F.log)
    >> F['='] ('Hint: 3?')
    >> F.tap (F.log)
) == true // prints 'Hint: 3?' then 'true'
```
#### F.memoize : ('a -> 'b) -> ('a -> 'b)
Returns a memoized version of the function

The memoization has O(n) lookup

#### F.times : num -> (unit -> unit) -> unit
Invokes (arg2) (arg1) times

#### F.after : num -> ('a -> 'b') -> ('a -> unit/'b)
Returns a version of (arg2) that does nothing and returns undefined until the (arg1)th time when it reverts to normal

#### F.before : num -> ('a -> 'b') -> ('a -> unit/'b)
Returns a version of (arg2) that operates normally until the (arg1)th time when it starts doing nothing and returns undefined

## L (1 list and 2 lists functions)
(note: lists are assumed to be dense, meaning all data is contiguous)

(note: all respective orders are preserved, except in obvious cases)

### 1 list functions

#### L.cons : 'a -> 'a list -> 'a list
Appends (arg1) to the front of (arg2)

#### L.head : 'a list -> 'a
Returns the first element of the list

#### L.tail : 'a list -> 'a list
Returns all elements of the list except the first

#### L.length : 'a list -> num
Returns the length of the list

#### L.is_empty : 'a list -> bool
Returns true if the list is empty, false otherwise

#### L.get : num -> 'a list -> 'a
If (arg1) is greater than (arg2)'s length

Then returns undefined

Else returns the element at index (arg1) in (arg2) otherwise

#### L.range : (x: num) -> (y: num) -> num list
If (arg1) is less than or equal to (arg2)

Then returns a list of increasing consecutive elements ranging from (arg1) to (arg2), both inclusive

Else returns an empty list

#### L.create : num -> 'a -> 'a list
Returns a list of (arg1) (arg2) elements

#### L.init : num -> (int -> 'a) -> 'a list
Returns a list of (arg1) elements generated by (arg2) passed the index of its element

#### L.rev : 'a list -> 'a list
Returns a reverse of the list

#### L.iter : ('a -> unit) -> 'a list -> unit
For each element in (arg2)

&nbsp;&nbsp;&nbsp;&nbsp;Passes the element to (arg1)

#### L.iteri : (int -> 'a -> unit) -> 'a list -> unit
Same as L.iter, except additionally passes the index as well

#### L.fold : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a
(arg2) is the initial state of the accumulator

(arg1) is iteratively passed the previous accumulator and the next element in (arg2)

Returns the final accumulator

#### L.reduce : ('a -> 'a -> 'a) -> 'a list -> 'a
If (arg2) is empty

Then throws the exception F.e

Else same as L.fold, except the first element in (arg1) is taken as the initial accumulator

#### L.scan : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a list
The first element in (arg2) is the initial state of the accumulator

(arg1) is iteratively passed the previous accumulator and the next element in (arg2)

Returns the list of all accumulators

#### L.map : ('a -> 'b) -> 'a list -> 'b list
Returns (arg2) with each element transformed by passing that element to (arg1)

#### L.mapi : (int -> 'a -> 'b) -> 'a list -> 'b list
Same as L.map, except additionally passes the index as well

#### L.find : ('a -> bool) -> 'a list -> 'a
If an element exists in (arg2) for which (arg1) returns true

Then return that element

Else return undefined

#### L.pick : ('a -> unit/'b) -> 'a list -> unit/'b
If an element exists in (arg2) for which (arg1) does not return undefined

Then return that element passed to (arg1)

Else return undefined

#### L.filter : ('a -> bool) -> 'a list -> 'a list
Returns (arg2) without the elements for which (arg1) returns false

#### L.for_all : ('a -> bool) -> 'a list -> bool
Returns if (arg1) returns true for all elements (arg2), vacuously true

#### L.exists : ('a -> bool) -> 'a list -> bool
Returns if (arg1) returns true for at least one element in (arg2), vacuously false

#### L.contains : 'a -> 'a list -> bool
Returns if (arg1) exists in (arg2)

#### L.sort : ('a -> 'a -> int) -> 'a list -> 'a list
Returns (arg2) sorted by (arg1) determined by normal comparator standards

#### L.partition : ('a -> bool) -> 'a list -> ('a list * 'a list)
Returns the list containing the elements of (arg2) for which (arg1) returned true and the list containing all other elements

#### L.clone: 'a list -> 'a list
Returns a shallow copy of the list

#### L.uniq : 'a list -> 'a list
Returns the list with duplicates removed

#### L.unzip : ('a * 'b) list -> 'a list * 'b list
Returns the list of the first element of each element of the list and the list of the second element of each element of the list

(note: this function does not enforce density)

### 2 list functions
#### L.append : 'a list -> 'a list -> 'a list
Returns (arg1) pre-pended to (arg2)

#### L.uneq_length : 'a list -> 'b list -> bool
Returns if (arg1) and (arg2) have unequal length

#### L.iter2 : ('a -> 'b -> unit) -> 'a list -> 'b list -> unit
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.iter, except additionally passing the element of (arg3)

#### L.iteri2 : (int -> 'a -> 'b -> unit) -> 'a list -> 'b list -> unit
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.iter2, except additionally passing the index

#### L.fold2 : ('a -> 'b -> 'c -> 'a) -> 'a -> 'b list -> 'c list -> 'a
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.fold, except additionally passing the element of (arg3)

#### L.mapi2 : (int -> 'a -> 'b -> 'c) -> 'a list -> 'b list -> 'c list
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.mapi, except additionally passing the element of (arg3)

#### L.map2 : ('a -> 'b -> 'c) -> 'a list -> 'b list -> 'c list
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.map, except additionally passing the element of (arg3)

#### L.for_all2 : ('a -> 'b -> bool) -> 'a list -> 'b list -> bool
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.for_all, except additionally passing the element of (arg3)

#### L.exists2 : ('a -> 'b -> bool) -> 'a list -> 'b list -> bool
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.exists, except additionally passing the element of (arg3)

#### L.zip : 'a list -> 'b list -> ('a * 'b) list
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else returns the list with each element the list with the element of (arg1) first and the element of (arg2) second

#### L.equals : (x: 'a list) -> (y: 'a list) -> bool
Deep comparison

## D (dictionary functions)
#### D.is_empty : 'a, 'b dictionary -> bool
Returns if (arg1) is empty

#### D.get : 'a -> 'a, 'b dictionary -> 'b
Returns the value in (arg2) with key (arg1)

#### D.create : ('a * 'b) list -> 'a, 'b dictionary
Returns the dictionary with pairs of each element with the first element as the key and the second element as the value

#### D.keys : 'a, 'b dictionary -> 'a list
Returns a list of the keys of (arg1)

#### D.vals : 'a, 'b dictionary -> 'b list
Returns a list of the values of (arg1)

#### D.pairs : 'a, 'b dictionary -> ('a * 'b) list
Returns a list of the key, value pairs of (arg1)

#### D.bind : 'a, 'b dictionary -> 'a, 'b dictionary
Binds the self-references for functions in the map to the dictionary and returns the dictionary

(note: this one of the gaps I mentioned in the opening; in languages that automatically resolve this problem, it's not an issue)

#### D.freeze : 'a, 'b dictionary -> 'a, 'b dictionary
Freezes the dictionary and returns the dictionary

#### D.freeze_bind : 'a, 'b dictionary -> 'a, 'b dictionary
Same as calling D.bind and then D.freeze on the dictionary

#### D.iter : ('a -> unit) -> 'b, 'a dictionary -> unit
Same as L.iteri on the values of (arg2), except with keys instead of indices

#### D.iterk : ('a -> 'b -> unit) -> 'a, 'b dictionary -> unit
Same as D.iter, except additionally passing the key

#### D.fold : ('a -> 'b -> 'a) -> 'a -> ('c, 'b) list -> 'a
Same as L.fold on the values of (arg2)

#### D.map : ('a -> 'b) -> 'c, 'a dictionary -> 'c, 'b dictionary
Same as L.map on the values of (arg2)

#### D.mapk : ('a -> 'b -> 'c) -> 'a, 'b dictionary -> 'a, 'c dictionary
Same as D.map, except additionally passing the key

#### D.find : ('a -> bool) -> 'b, 'a dictionary -> 'a
Same as L.find on the values of (arg2)

#### D.filter : ('a -> bool) -> 'a list -> 'a list
Same as L.filter on the values of (arg2)

#### D.filterk : ('a -> 'b -> bool) -> 'a list -> 'a list
Same as D.filter, except additionally passed the key

#### D.for_all : ('a -> bool) -> 'b, 'a dictionary -> bool
Same as L.for_all on the values of (arg2)

#### D.exists : ('a -> bool) -> 'b, 'a dictionary -> bool
Same as L.exists on the values of (arg2)

#### D.contains : 'a -> 'b, 'a dictionary -> bool
Same as L.contains on the values of (arg2)

#### D.length : 'a, 'b dictionary -> num
Returns the number of pairs in (arg1)

#### D.partition : ('a -> bool) -> 'b, 'a dictionary -> (('b, 'a) dictionary * ('b, 'a) dictionary)
Same as L.partition on the values of (arg2)

#### D.extend : 'a, 'b dictionary -> 'a, 'b dictionary -> 'a, 'b dictionary
Returns (arg1) overlaid by (arg2)

#### D.delete : 'a, 'b dictionary -> 'a list -> 'a, 'b dictionary
Returns (arg1) without the pairs without the keys in (arg2)

#### D.equals : (x: ('a, 'b) dictionary) -> (y: ('a, 'b) dictionary) -> bool
Deep comparison

## S (string functions)
#### S.length : string -> num
Returns the length of (arg1)

#### S.get : num -> string -> string
Returns the character at (arg1) in (arg2)

#### S.substr : (x: num) -> (y: num) -> string -> string
Returns the substring from (arg1) to (arg2) of (arg3) with some slice logic

#### S.index : string -> string -> num
Returns the first index at which (arg1) appears in (arg2)

#### S.contains : string -> string -> bool
Returns if (arg1) appears in (arg2)

#### S.compare : string -> string -> num
Follows normal comparator rules for strings for comparing (arg1) to (arg2)

#### S.match : regex -> string -> string list
If (arg2) is matched by (arg1)

Then return a list of the match followed by captured groups

Else return null

#### S.replace : regex -> string -> string -> string
Returns (arg3) with matches of (arg1) replaced by (arg2)

#### S.rindex : string -> string -> num
Same as S.index, except with the last occurance

#### S.search : regex -> string -> num
Returns the first index that (arg1) matches in (arg2)

#### S.split : regex -> string -> string list
Returns a list of the substrings of (arg2) split by (arg1)

#### S.lower : string -> string
Returns (arg1) with all characters lowercase

#### S.upper : string -> string
Returns (arg1) with all characters uppercase

#### S.trim : string -> string
Returns (arg1) without surrounding whitespace

#### S.equals : string -> string -> bool
