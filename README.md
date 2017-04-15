# green_curry: Curried functional programming library
## Colorful and healthy!
(ES6 required)

(please disregard the culture references in the examples)

This library is to provide support for functional programming. Though some other libraries exist that expose functional programming in JavaScript, they take a partially object-oriented approach that dilutes a lot of the value of a functional style. Though this mixture can be useful, those libraries have not closed the gap caused by some of JavaScript's idiosyncracies.

I believe that what's held JavaScript back from being adopted as a functional programming language is its lack of a purely functional library. Functional programming's rewards are reaped best when currying is available, enabling point-free form to increase the abstractness and modularity of the code. One of the strengths of functional programming is that a vast majority of boilerplate is already replaced by higher-order library functions. As these functions are all very general, abstract ideas fueled by inversion of control, these could possibly never be outdated.

Here is an example:

    var fs = require ('fs')
    var green_curry = require ('green_curry')
    green_curry.globalize ()

    // string -> 'a
    // given a path, concatenates all of the files and evals the result
    var eval_dir = h => F.p (h) (
        fs.readdirSync // get the list of file names in the directory
        >> L.map (F['+'] (h)) // append the path before each file name
        >> L.map (h => fs.readFileSync (h, 'utf8')) // transform each file path to its file contents
        >> L.fold (a => h => `${a};${h}`) ('') // concatenate all of the files, delimited by ';'
        >> F.eval // evaluate the concatenated files
    )

Here is another example that may well change the way you think:

    var green_curry = require ('green_curry')
    green_curry.globalize ()

    var arr = L.range (1) (50)
    // inefficient, I know
    var is_prime = x => x > 2 && L.for_all (h => x % h != 0) (L.range (2) (x - 1))
    // functions are data too! these all have the type (int -> bool)
    var pred = L.reduce (F.inter) ([
        F['>'] (35), // is less 35
        F['!='] (23), // is not 23
        F['<'] (2), // is greater than 2
        is_prime, // is prime
        x => x % 7 != 1, // is not 1 more than a multiple of 7
        x => `${x}`[0] != '1', // does not have a 1 in the first digit
        x => 1085 % x != 0, // is not a clean divisor of 1085
    ])
    L.filter (pred) (arr) // [3]

An understanding of the typed lambda calculus is required for effective use of this library as all functions provided by this library are curried (all functions are free of self-references, allowing their safe use as first-class functions).

An understanding of the JavaScript type system is recommended for greater use of this library (my type signatures are not strict; following/enforcing a type system by using the appropriate functions keeps code clear, but careful use of type coercion has its rewards)

An understanding of closures and mutability is recommended for greater use of this library (all functions are pure, except F.c and F.p)

The contents of this package are organized into submodules.

F: general functions and constants

L: lists (arrays)
note: lists are assumed to be dense, meaning all data is contiguous.

D: dictionaries (objects)

S: strings

## globalize
Pulls the included submodules into global scope to obviate the need for fully-qualifying each resource

All examples on this page will assume this has already been called

note: works both in-server and in-browser

    var green_curry = require ('green_curry')
    green_curry.F.log ('Hint: 3?') // prints 'Hint: 3?'
    green_curry.globalize () // raises green_curry library to global scope
    F.log ('Hint: 3?') // prints 'Hint: 3?'

## F (general functions and constants)
#### F.e : obj
Constant exception object thrown by this library

#### F.id : 'a -> 'a
The identity function

    F.id ('Hint: 3?') // 'Hint: 3?'

#### F.const : 'a -> unit -> 'a
Generates a constant function

    var f = F.const ('Hint: 3?')
    f () // 'Hint: 3?'
    var f = F.const ('9')
    f () // '9'

#### F.ignore : 'a -> unit
Does nothing

    F.ignore ('Hint: 3?') // does nothing

#### F.exec : (unit -> 'a) -> 'a
Executes the given function

    F.exec (() => 'Hint: 3?') // 'Hint: 3?'

#### F.ex_if : bool -> unit
If passed true

Then throws the exception F.e

    F.ex_if (true) // throws exception
    F.ex_if (false) // does nothing

#### F.log : 'a -> unit
An alias for console.log.bind (console)

Aliasing and calling console.log by itself without binding will throw an exception

    var f = console.log
    f ('Hint: 3?') // throws null pointer exception
    var f = F.log
    f ('Hint: 3?') // prints 'Hint: 3?'

#### F.eval : string -> 'a
A wrapper for eval that will always operate within calling scope

An unaliased call to eval will operate within the calling scope

An aliased call to eval will operate at the global scope

    var a = 'Hint: 3?'
    eval ('a') // 'Hint: 3?'
    var f = eval
    f ('a') // undefined
    var f = F.eval
    f ('a') // 'Hint: 3?'

#### F.= : 'a -> 'a -> bool
#### F.== : 'a -> 'a -> bool
Compares the arguments with soft equality

    F['=='] ('Hint: 3?') ('Hint: 3?') // true
    F['=='] ('Hint: 3?') ('9') // false

#### F.=== : 'a -> 'a -> bool
Compares the arguments with hard equality

    F['==='] ('Hint: 3?') ('Hint: 3?') // true
    F['==='] ('Hint: 3?') ('9') // false

#### F.!= : 'a -> 'a -> bool
#### F.<> : 'a -> 'a -> bool
Compares the arguments with soft inequality

    F['!='] ('Hint: 3?') ('Hint: 3?') // false
    F['!='] ('Hint: 3?') ('9') // true

#### F.!== : 'a -> 'a -> bool
Compares the arguments with hard inequality

    F['!=='] ('Hint: 3?') ('Hint: 3?') // false
    F['!=='] ('Hint: 3?') ('9') // true

#### F.> : int -> int -> bool
Returns if (arg1) is greater than (arg2)

    F['>'] (3) (3) // false
    F['>'] (3) (9) // false
    F['>'] (9) (3) // true

#### F.>= : int -> int -> bool
Returns if (arg1) is greater than or equal to (arg2)

    F['>='] (3) (3) // true
    F['>='] (3) (9) // false
    F['>='] (9) (3) // true

#### F.< : int -> int -> bool
Returns if (arg1) is lesser than (arg2)

    F['<'] (3) (3) // false
    F['<'] (3) (9) // true
    F['<'] (9) (3) // false

#### F.<= : int -> int -> bool
Returns if (arg1) is lesser than or equal to (arg2)

    F['<='] (3) (3) // true
    F['<='] (3) (9) // true
    F['<='] (9) (3) // false

#### F.! : bool -> bool
Negates the argument

    F['!'] (true) // false

#### F.~ : int -> int
2's complements the argument

    F['~'] (3) // -4

#### F.+ : int -> int
Adds the arguments

    F['+'] (3) (3) // 6

#### F.- : int -> int
Subtracts the arguments

    F['-'] (3) (3) // 0
    F['-'] (3) (0) // 3

#### F.* : int -> int
Multiplies the arguments

    F['*'] (3) (3) // 9

#### F./ : int -> int
Divides the arguments

    F['/'] (3) (3) // 1
    F['/'] (3) (1) // 3

#### F.% : int -> int
Modulo divides the arguments

    F['%'] (3) (3) // 0
    F['%'] (3) (1) // 0

#### F.| : int -> int
Bitwise Or the arguments

    F['|'] (3) (3) // 3

#### F.|| : bool -> bool
Logical Or the arguments

(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['||'] (true) (true) // true

#### F.& : int -> int
Bitwise And the arguments

    F['&'] (3) (3) // 3

#### F.&& : bool -> bool
Logical And the arguments

(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['&&'] (true) (true) // true

#### F.^ : int -> int
Bitwise Xor the arguments

    F['^'] (3) (3) // 0

#### F.>>> : int -> int
Sign-propagating right shifts the arguments

    F['>>>'] (9) (2) // 2
    F['>>>'] (-9) (2) // -3

#### F.>>>> : int -> int
Zero-fill right shifts the arguments

    F['>>>>'] (9) (2) // 2
    F['>>>>'] (-9) (2) // -1073741821

#### F.<<< : int -> int
Left shifts the arguments

    F['<<<'] (9) (2) // 36

#### F.?? : 'a -> 'a -> 'a
If (arg1) is defined

Then return (arg1)

Else return (arg2)

note: the arguments are evaluated eagerly so this does not short-circuit

    F['??'] (9) (3) // 9
    F['??'] (undefined) (3) // 3

#### F.~?? : 'a -> 'a -> 'a
If (arg2) is defined

Then return (arg2)

Else return (arg1)

Note: the arguments are evaluated eagerly so this does not short-circuit

    F['~??'] (3) (9) // 9
    F['~??'] (3) (undefined) // 3

#### F.?: : bool -> 'a -> 'a -> 'a
(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['?:'] (true) (3) (9) // 3
    F['?:'] (false) (3) (9) // 9

#### F.~?: : 'a -> 'a -> bool -> 'a
(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['~?:'] (3) (9) (true) // 3
    F['~?:'] (3) (9) (false) // 9

#### F.|> : 'a -> ('a -> 'b) -> 'b
#### F.@@ : 'a -> ('a -> 'b) -> 'b
passes (arg1) into (arg2)

    F['|>'] (3) (F['+'] (3)) // 6

#### F.<| : ('a -> 'b) -> 'a -> 'b
passes (arg2) into (arg1)

    F['<|'] (F['+'] (3)) (3) // 6

#### F.<< : ('a -> 'b) -> ('c -> 'a) -> ('c -> 'a)
Function composes the arguments

    var f = F['>>'] (F['+'] (3)) (F['*'] (3))
    f (3) // 12

#### F.>> : ('a -> 'b) -> ('c -> 'a) -> ('c -> 'a)
Reverse function composes the arguments

    var f = F['>>'] (F['+'] (3)) (F['*'] (3))
    f (3) // 18

#### F.neg : ('a -> bool) -> ('a -> bool)
Negates the predicate

    var f = F.neg (F['='] ('Hint: 3?'))
    f ('Hint: 3?') // false

#### F.union : ('a -> bool) -> ('a -> bool) -> ('a -> bool)
Returns a predicate that is a union of the predicates

    var f = F.union (x => x % 2 == 0) (x => x % 5 == 0)
    f (3) // false
    f (4) // true
    f (5) // true
    f (10) // true

#### F.inter : ('a -> bool) -> ('a -> bool) -> ('a -> bool)
Returns a predicate that is an intersection of the predicates

    var f = F.inter (x => x % 2 == 0) (x => x % 5 == 0)
    f (3) // false
    f (4) // false
    f (5) // false
    f (10) // true

#### F.try : bool -> (unit -> 'a) list -> 'a
Invokes the first function in (arg2)

If the function throws an exception
Then
&nbsp;&nbsp;&nbsp;&nbsp;If (arg1) is true

&nbsp;&nbsp;&nbsp;&nbsp;Then the exception is printed to console

&nbsp;&nbsp;&nbsp;&nbsp;Recurse this function with (arg1) and the remainder of (arg2)

Else the result is returned


    F.try (true) ([
        () => throw F.e,
        () => throw F.e,
        () => throw F.e,
        () => 'Hint: 3?',
    ]) // 'Hint: 3?' // each exception is printed

#### F.swap : ('a -> 'b -> 'c) -> ('b -> 'a -> 'c)
Swaps the order of the next two arguments of the given function

    var f = F.swap (F['-'])
    f (3) (0) // -3

#### F.delay : int -> (unit -> unit) -> unit
Calls the given function after waiting the given time in ms

    F.delay (3) (() => F.log ('Hint: 3?')) // waits 3ms and then prints 'Hint: 3?'

#### F.tap : ('a -> 'b) -> 'a -> 'a
passes argument 2 to argument 1 and then returns argument 2
Note: for side-effecting when you want to retain the reference

    F.tap (F.log) ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'

#### F.rcomp : (? -> ?) list -> (? -> ?)
Reverse function composes the argument

    var f = F.rcomp ([
        F.tap (F.log),
        F['='] ('Hint: 3?'),
        F.tap (F.log),
    ])
    f ('Hint: 3?') // true // prints 'Hint: 3?' then 'true'

#### F.c : unit -> (? -> ?) list -> (? -> ?)
Reverse function composes the argument, but with a temporary DSL that is applied only one level deep

note: F.ignore will be returned if there is only one function supplied

note: this is safe for nested usage in other instances of F.c and F.p

    var f = F.c () (
        F.tap (F.log)
        >> F['='] ('Hint: 3?')
        >> F.tap (F.log)
    )
    f ('Hint: 3?') // true // prints 'Hint: 3?' then 'true'

#### F.p : ? -> (? -> ?) list -> ?
Passes (arg1) to the reverse function composed (arg2), but with a temporary DSL that is applied only one level deep

note: F.ignore will be returned if there is only one function supplied

note: this is safe for nested usage in other instances of F.c and F.p

    F.p ('Hint: 3?') (
        F.tap (F.log)
        >> F['='] ('Hint: 3?')
        >> F.tap (F.log)
    ) == true // prints 'Hint: 3?' then 'true'

#### F.memoize : ('a -> 'b) -> ('a -> 'b)
Returns a memoized version of the function

The memoization has O(n) lookup

    var f = F.memoize (F.log)
    f ('Hint: 3?') // prints 'Hint: 3?'
    f ('Hint: 3?') // does nothing

#### F.times : int -> (unit -> unit) -> unit
Invokes (arg2) (arg1) times

    F.times (3) (() => F.log ('Hint: 3?')) // prints 'Hint: 3?' 3 times

#### F.after : int -> ('a -> 'b') -> ('a -> unit/'b)
Returns a version of (arg2) that does nothing and returns undefined until the (arg1)th time when it reverts to normal

    var f = F.after (3) (F.tap (F.log))
    f ('Hint: 3?') // undefined // does nothing
    f ('Hint: 3?') // undefined // does nothing
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'

#### F.before : int -> ('a -> 'b') -> ('a -> unit/'b)
Returns a version of (arg2) that operates normally until the (arg1)th time when it starts doing nothing and returns undefined

    var f = F.before (3) (F.tap (F.log))
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'
    f ('Hint: 3?') // undefined // does nothing

#### F.bind : 'a, 'b map -> 'a, 'b map
Binds the self-references for functions in the map to the map and returns the map

note: this one of the gaps I mentioned in the opening; in languages that automatically resolve this problem, it's not an issue

    var m = {
        f: function () {return this.a},
        a: 3,
    }
    m.f () // 3
    var f = m.f
    f () // undefined
    m = F.bind (m)
    var f = m.f
    f () // 3
    var n = {
        f: m.f,
        a: 9,
    }
    n.f () // 3

## L (1 list and 2 lists functions)
note: all respective orders are preserved, except in obvious cases
### 1 list functions
#### L.cons : 'a -> 'a list -> 'a list
Appends (arg1) to the front of (arg2)

    L.cons (1) ([2, 3, 4]) // [1, 2, 3, 4]

#### L.head : 'a list -> 'a
Returns the first element of the list

    L.head ([1, 2, 3]) // 1

#### L.tail : 'a list -> 'a list
Returns all elements of the list except the first

    L.tail ([1, 2, 3]) // [2, 3]

#### L.length : 'a list -> int
Returns the length of the list

    L.length ([1, 2, 3]) // 3

#### L.is_empty : 'a list -> bool
Returns true if the list is empty, false otherwise

    L.is_empty ([]) // true
    L.is_empty ([1, 2, 3]) // false

#### L.get : int -> 'a list -> 'a
If (arg1) is greater than (arg2)'s length

Then throws the exception F.e

Else returns the element at index (arg1) in (arg2) otherwise

    L.get (3) ([1, 2, 3]) // throws F.e
    L.get (3) ([1, 2, 3, 4]) // 4

#### L.range : int -> int -> int list
If (arg1) is less than or equal to (arg2)

Then returns a list of increasing consecutive elements ranging from (arg1) to (arg2), both inclusive

Else returns an empty list

    L.range (3) (9) // [3, 4, 5, 6, 7, 8, 9]
    L.range (3) (3) // [3]
    L.range (9) (3) // []

#### L.create : int -> 'a -> 'a list
Returns a list of (arg1) (arg2) elements

    L.create (9) (3) // [3, 3, 3, 3, 3, 3, 3, 3, 3]

#### L.init : int -> (int -> 'a) -> 'a list
Returns a list of (arg1) elements generated by (arg2) passed the index of its element

    L.init (3) (i => i + 3) // [3, 4, 5]

#### L.rev : 'a list -> 'a list
Returns a reverse of the list

    L.rev ([1, 2, 3]) // [3, 2, 1]

#### L.iter : ('a -> unit) -> 'a list -> unit
For each element in (arg2)

&nbsp;&nbsp;&nbsp;&nbsp;Passes the element to (arg1)

    L.iter (F.log) ([1, 2, 3]) // prints '1' then '2' then '3'

#### L.iteri : (int -> 'a -> unit) -> 'a list -> unit
Same as L.iter, except additionally passes the index as well

    L.iteri (i => h => F.log (`${i}: ${h}`)) ([1, 2, 3]) // prints '0: 1' then '1: 2' then '2: 3'

#### L.fold : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a
(arg2) is the initial state of the accumulator

(arg1) is iteratively passed the previous accumulator and the next element in (arg2)

Returns the final accumulator

    F.fold (F['+']) (9) ([1, 2, 3]) // 15
    F.fold (F['-']) (9) ([1, 2, 3]) // 3

#### L.reduce : ('a -> 'a -> 'a) -> 'a list -> 'a
If (arg2) is empty

Then throws the exception F.e

Else same as L.fold, except the first element in (arg1) is taken as the initial accumulator

    F.reduce (F['+']) ([1, 2, 3]) // 6
    F.reduce (F['-']) ([1, 2, 3]) // -4

#### L.scan : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a list
The first element in (arg2) is the initial state of the accumulator

(arg1) is iteratively passed the previous accumulator and the next element in (arg2)

Returns the list of all accumulators

    F.scan (F['+']) (9) ([1, 2, 3]) // [9, 10, 12, 15]
    F.scan (F['-']) (9) ([1, 2, 3]) // [9, 8, 6, 3]

#### L.map : ('a -> 'b) -> 'a list -> 'b list
Returns (arg2) with each element transformed by passing that element to (arg1)

    F.map (F['+'] (3)) ([1, 2, 3]) // [4, 5, 6]

#### L.mapi : (int -> 'a -> 'b) -> 'a list -> 'b list
Same as L.map, except additionally passes the index as well

    F.mapi (F['+']) ([1, 2, 3]) // [1, 3, 5]
    
#### L.find : ('a -> bool) -> 'a list -> 'a
If an element exists in (arg2) for which (arg1) returns true

Then return that element

Else throws the exception F.e

    L.find (F['='] (3)) ([1, 2, 3]) // 3
    L.find (F['='] (9)) ([1, 2, 3]) // throws F.e exception

#### L.filter : ('a -> bool) -> 'a list -> 'a list
Returns (arg2) without the elements for which (arg1) returns false

    L.filter (F['='] (3)) ([1, 2, 3]) // [3]

#### L.for_all : ('a -> bool) -> 'a list -> bool
Returns if (arg1) returns true for all elements (arg2), vacuously true

    L.for_all (F['='] (3)) ([3, 3, 3]) // true
    L.for_all (F['='] (3)) ([1, 2, 3]) // false
    L.for_all (F['='] (3)) ([]) // true

#### L.exists : ('a -> bool) -> 'a list -> bool
Returns if (arg1) returns true for at least one element in (arg2), vacuously false

    L.exists (F['='] (3)) ([3, 3, 3]) // true
    L.exists (F['='] (3)) ([1, 2, 9]) // false
    L.exists (F['='] (3)) ([]) // false

#### L.contains : 'a -> 'a list -> bool
Returns if (arg1) exists in (arg2)

    L.contains (3) ([3, 3, 3]) // true
    L.contains (3) ([]) // false

#### L.sort : ('a -> 'a -> int) -> 'a list -> 'a list
Returns (arg2) sorted by (arg1) determined by normal comparator standards

    L.sort (F['-']) ([1, 6, 2, 7, 3, 8, 4, 9, 5, 0]) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

#### L.partition : ('a -> bool) -> 'a list -> ('a list * 'a list)
Returns the list containing the elements of (arg2) for which (arg1) returned true and the list containing all other elements

    L.partition (F['='] (3)) ([1, 2, 3, 4, 5]) // [[3], [1, 2, 4, 5]]

#### L.uniq : 'a list -> 'a list
Returns the list with duplicates removed

    L.uniq ([1, 2, 3, 3, 3, 4, 5]) // [1, 2, 3, 4, 5]

#### L.unzip : ('a * 'b) list -> 'a list * 'b list
Returns the list of the first element of each element of the list and the list of the second element of each element of the list

note: this function does not enforce density

    L.unzip ([[1, 2], [3, 4], [5, 6]]) // [[1, 3, 5], [2, 4, 6]]

### 2 list functions
#### L.append : 'a list -> 'a list -> 'a list
Returns (arg1) pre-pended to (arg2)

    L.append ([1, 2, 3]) ([4, 5, 6])

#### L.uneq_length : 'a list -> 'b list -> bool
Returns if (arg1) and (arg2) have unequal length

    L.uneq_length ([1, 2, 3]) ([4, 5, 6]) // false
    L.uneq_length ([1, 2, 3]) ([4, 5, 6, 7]) // true

#### L.iter2 : ('a -> 'b -> unit) -> 'a list -> 'b list -> unit
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.iter, except additionally passing the element of (arg3)

    L.iter2 (h1 => h2 => F.log (`${h1}, ${h2}`)) ([1, 2]) ([3, 4]) // prints '1, 3' then '2, 4'

#### L.iteri2 : (int -> 'a -> 'b -> unit) -> 'a list -> 'b list -> unit
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.iter2, except additionally passing the index

    L.iteri2 (i => h1 => h2 => F.log (`${i}: ${h1}, ${h2}`)) ([1, 2]) ([3, 4]) // prints '0: 1, 3' then '1: 2, 4'

#### L.fold2 : ('a -> 'b -> 'c -> 'a) -> 'a -> 'b list -> 'c list -> 'a
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.fold, except additionally passing the element of (arg3)

    L.fold (a => h1 => h2 => a + h1 + h2) (1) ([1, 2]) ([3, 4]) // 11

#### L.mapi2 : (int -> 'a -> 'b -> 'c) -> 'a list -> 'b list -> 'c list
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.mapi, except additionally passing the element of (arg3)

    L.mapi2 (i => h1 => h2 => i + h1 + h2) ([1, 2]) ([3, 4]) // [4, 7]

#### L.map2 : ('a -> 'b -> 'c) -> 'a list -> 'b list -> 'c list
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.map, except additionally passing the element of (arg3)

    L.map2 (F['+']) ([1, 2]) ([3, 4]) // [4, 6]

#### L.for_all2 : ('a -> 'b -> bool) -> 'a list -> 'b list -> bool
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.for_all, except additionally passing the element of (arg3)

    L.for_all2 (F['=']) ([3, 3]) ([3, 3]) // true
    L.for_all2 (F['=']) ([1, 3]) ([3, 3]) // false
    L.for_all2 (F['=']) ([]) ([]) // true

#### L.exists2 : ('a -> 'b -> bool) -> 'a list -> 'b list -> bool
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else same as L.exists, except additionally passing the element of (arg3)

    L.exists2 (F['=']) ([3, 3]) ([3, 3]) // true
    L.exists2 (F['=']) ([1, 3]) ([3, 3]) // true
    L.exists2 (F['=']) ([]) ([]) // false

#### L.zip : 'a list -> 'b list -> ('a * 'b) list
If (arg2) and (arg3) have unequal lengths

Then throws exception F.e

Else returns the list with each element the list with the element of (arg1) first and the element of (arg2) second

    L.zip ([1, 2]) ([3, 4]) // [[1, 3], [2, 4]]

## D (dictionary functions)
#### D.is_empty : 'a, 'b dictionary -> bool
Returns if (arg1) is empty

    D.is_empty ({}) // true
    D.is_empty ({c: 'Hint: 3?'}) // false

#### D.get : 'a -> 'a, 'b dictionary -> 'b
Returns the value in (arg2) with key (arg1)

    D.get ('c') ({c: 'Hint: 3?'}) // 'Hint: 3?'

#### D.create : ('a * 'b) list -> 'a, 'b dictionary
Returns the dictionary with pairs of each element with the first element as the key and the second element as the value

    D.create ([['Hint', '3?'], ['Not_a_Hint', 'You're already dead']]) // {Hint: '3?', Not_a_Hint: 'You're already dead'}

#### D.keys : 'a, 'b dictionary -> 'a list
Returns a list of the keys of (arg1)

    D.keys ({
        Hint: '3?', 
        Not_a_Hint: 'You're already dead',
    }) // ['Hint', 'Not_a_Hint']

#### D.vals : 'a, 'b dictionary -> 'b list
Returns a list of the values of (arg1)

    D.keys ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // ['3?', 'You're already dead']

#### D.pairs : 'a, 'b dictionary -> ('a * 'b) list
Returns a list of the key, value pairs of (arg1)

    D.keys ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // [['Hint', '3?'], ['Not_a_Hint', 'You're already dead']]

#### D.iter : ('a -> unit) -> 'b, 'a dictionary -> unit
Same as L.iteri on the values of (arg2), except with keys instead of indices

    D.iter (F.log) ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // prints '3' then 'You're already dead'

#### D.iterk : ('a -> 'b -> unit) -> 'a, 'b dictionary -> unit
Same as D.iter, except additionally passing the key

    D.iterk (k => v => F.log (`${k}: ${v}') ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // prints 'Hint: 3?' then 'Not_a_Hint: You're already dead'

#### D.fold : ('a -> 'b -> 'a) -> 'a -> ('c, 'b) list -> 'a
Same as L.fold on the values of (arg2)

    D.fold (F['+']) (1) ({
        a: 1,
        b: 2,
        c: 3,
    }) // 7

#### D.map : ('a -> 'b) -> 'c, 'a dictionary -> 'c, 'b dictionary
Same as L.map on the values of (arg2)

    D.map (F['+'] (3)) ({
        a: 1,
        b: 2,
        c: 3,
    }) // {a: 4, b: 5, c: 6}

#### D.mapk : ('a -> 'b -> 'c) -> 'a, 'b dictionary -> 'a, 'c dictionary
Same as D.map, except additionally passing the key

    D.map (k => v => `${k}: ${v}') ({
        a: 1,
        b: 2,
        c: 3,
    }) // {a: 'a: 1', b: 'b: 2', c: 'c: 3'}

#### D.find : ('a -> bool) -> 'b, 'a dictionary -> 'a
Same as L.find on the values of (arg2)

    D.find (F['='] ('3?')) ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // '3?'

#### D.filter : ('a -> bool) -> 'a list -> 'a list
Same as L.filter on the values of (arg2)

    D.filter (F['='] ('3?')) ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // {Hint: '3?'}

#### D.filterk : ('a -> 'b -> bool) -> 'a list -> 'a list
Same as D.filter, except additionally passed the key

    D.filterk (k => v => `${k}: ${v}` == 'Hint: 3?') ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // {Hint: '3?'}

#### D.for_all : ('a -> bool) -> 'b, 'a dictionary -> bool
Same as L.for_all on the values of (arg2)

    D.for_all (F['='] ('3?')) ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // false

#### D.exists : ('a -> bool) -> 'b, 'a dictionary -> bool
Same as L.exists on the values of (arg2)

    D.exists (F['='] ('3?')) ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // true

#### D.contains : 'a -> 'b, 'a dictionary -> bool
Same as L.contains on the values of (arg2)

    D.exists ('3?') ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // true

#### D.length : 'a, 'b dictionary -> int
Returns the number of pairs in (arg1)

    D.length ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // 2

#### D.partition : ('a -> bool) -> 'b, 'a dictionary -> (('b, 'a) dictionary * ('b, 'a) dictionary)
Same as L.partition on the values of (arg2)

    D.partition (F['='] ('3?')) ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) // [{Hint: '3?'}, {Not_a_Hint: 'You're already dead'}]

#### D.extend : 'a, 'b dictionary -> 'a, 'b dictionary -> 'a, 'b dictionary
Returns (arg1) overlaid by (arg2)

    D.extend ({
        Hint: '3?',
        a: '3',
    }) ({
        Not_a_Hint: 'You're already dead',
        a: '4',
    }) // {Hint: '3?', Not_a_Hint: 'You're already dead', a: '4'}

#### D.delete : 'a, 'b dictionary -> 'a list -> 'a, 'b dictionary
Returns (arg1) without the pairs without the keys in (arg2)

    D.delete ({
        Hint: '3?',
        Not_a_Hint: 'You're already dead',
    }) (['Not_a_Hint']) // {Hint: '3?'}

## S (string functions)
#### S.length : string -> int
Returns the length of (arg1)

    S.length ('Hint: 3?') // 8

#### S.get : int -> string -> string
Returns the character at (arg1) in (arg2)

    S.get (6) ('Hint: 3?') // 3

#### S.substr : int -> int -> string -> string
Returns the substring from (arg1) to (arg2) of (arg3) with some slice logic

    S.substr (6) (7) ('Hint: 3?') // 3

#### S.index : string -> string -> int
Returns the first index at which (arg2) appears in (arg1)

    S.index ('Not_a_Hint: You're already dead') ('a') // 4

#### S.contains : string -> string -> bool
Returns if (arg2) appears in (arg1)

    S.contains ('Hint: 3?') ('3') // true

#### S.compare : string -> string -> int
Follows normal comparator rules for strings

    S.compare ('Hint: 3?') ('Not_a_Hint: You're already dead') // -1

#### S.match : string -> regex -> string list
If (arg1) is matched by (arg2)

Then return a list of the match followed by captured groups

Else return null

    S.match ('Hint: 3?') (/(.)?$/) // ['3?', '3']

#### S.replace : string -> regex -> string -> string
Returns (arg1) with matches of (arg2) replaced by (arg3)

    S.replace ('Hint: 3?') (/$/) ('

#### S.rindex : string -> string -> int
Same as S.index, except with the last occurance

    S.rindex ('Not_a_Hint: You're already dead') ('3') // 29

#### S.search : string -> regex -> int
Returns the first index that (arg2) matches in (arg1)

    S.search ('Not_a_Hint: You're already dead') (/^/) // 0

#### S.split : string -> regex -> string list
Returns a list of the substrings of (arg1) split by (arg2)

    S.split ('Hint: 3?') (/:/) // ['Hint', ' 3?']

#### S.lower : string -> string
Returns (arg1) with all characters lowercase

    S.lower ('Hint: 3?') // 'hint: 3?'

#### S.upper : string -> string
Returns (arg1) with all characters uppercase

    S.upper ('Hint: 3?') // 'HINT: 3?'

#### S.trim : string -> string
Returns (arg1) without surrounding whitespace

    S.trim (' Hint: 3? ') // 'Hint: 3?'
