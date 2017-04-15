# green_curry: Curried functional programming library
## Colorful and healthy!
(ES6 required)

This library is to provide support for functional programming. Though some other libraries exist that expose functional programming in JavaScript, they take a partially object-oriented approach that dilutes a lot of the value of a functional style. Though this mixture can be useful, those libraries have not closed the gap caused by some of JavaScript's idiosyncracies.

I believe that what's held JavaScript back from being adopted as a functional programming language is its lack of a purely functional library. Functional programming's rewards are reaped best when currying is available, enabling point-free form to increase the abstractness and modularity of the code. One of the strengths of functional programming is that a vast majority of boilerplate is already replaced by higher-order library functions.

Here is an example:

    var fs = require ('fs')
    var green_curry = require ('green_curry')
    green_curry.globalize ()
    
    // string -> 'a
    // given a path, concatenates all of the files and evals the result
    var eval_dir = h => F.p (h) (
        // get the list of file names in the directory
        fs.readdirSync
        // append the path before each file name
        >> L.map (F['+'] (h))
        // transform each file path to its file contents
        >> L.map (h => fs.readFileSync (h, 'utf8'))
        // concatenate all of the files, delimited by ';'
        >> L.fold (a => h => `${a};${h}`) ('')
        // evaluate the concatenated files
        >> F.eval
    )

An understanding of the typed lambda calculus is required for effective use of this library

(Almost) all functions provided by this library are curried

An understanding of the JavaScript type system is recommended for greater use of this library

(my type signatures are not strict)

All functions are pure, except F.c and F.p.


The contents of this package are organized into submodules.

F: general functions and constants

L: lists (arrays)
note: lists are assumed to be dense, meaning all data is contiguous.

M: maps (objects)

S: strings

## globalize
This method can be called to pull the included submodules into the top-level to obviate the need for fully-qualifying the asset
All examples on this page will assume this has already been called

    var green_curry = require ('green_curry')
    green_curry.F.log ('Hint: 3?') // prints 'Hint: 3?'
    green_curry.globalize () // raises green_curry library to global scope
    F.log ('Hint: 3?') // prints 'Hint: 3?'

## F (general functions and constants)
### F.e
##### obj
Constant exception object thrown by this library

### F.id
##### 'a -> 'a
The identity function

    F.id ('Hint: 3?') // 'Hint: 3?'

### F.const
##### 'a -> unit -> 'a
Generates a constant function

    var f = F.const ('Hint: 3?')
    f () // 'Hint: 3?'
    var f = F.const ('9')
    f () // '9'

### F.ignore
##### 'a -> unit
Does nothing

    F.ignore ('Hint: 3?') // does nothing

### F.exec
##### (unit -> 'a) -> 'a
Executes the given function

    F.exec (() => 'Hint: 3?') // 'Hint: 3?'

### F.ex_if
##### bool -> unit
If passed true

Then throws the exception F.e

    F.ex_if (true) // throws exception
    F.ex_if (false) // does nothing

### F.log
##### 'a -> unit
An alias for console.log.bind (console)

Aliasing and calling console.log by itself without binding will throw an exception

    var f = console.log
    f ('Hint: 3?') // throws null pointer exception
    var f = F.log
    f ('Hint: 3?') // prints 'Hint: 3?'

### F.eval
##### string -> 'a
A wrapper for eval that will always operate within calling scope

An unaliased call to eval will operate within the calling scope

An aliased call to eval will operate at the global scope

    var a = 'Hint: 3?'
    eval ('a') // 'Hint: 3?'
    var f = eval
    f ('a') // undefined
    var f = F.eval
    f ('a') // 'Hint: 3?'

### F.=
### F.==
##### 'a -> 'a -> bool
Compares the arguments with soft equality

    F['=='] ('Hint: 3?') ('Hint: 3?') // true
    F['=='] ('Hint: 3?') ('9') // false

### F.===
##### 'a -> 'a -> bool
Compares the arguments with hard equality

    F['==='] ('Hint: 3?') ('Hint: 3?') // true
    F['==='] ('Hint: 3?') ('9') // false

### F.!=
### F.<>
##### 'a -> 'a -> bool
Compares the arguments with soft inequality

    F['!='] ('Hint: 3?') ('Hint: 3?') // false
    F['!='] ('Hint: 3?') ('9') // true

### F.!==
##### 'a -> 'a -> bool
Compares the arguments with hard inequality

    F['!=='] ('Hint: 3?') ('Hint: 3?') // false
    F['!=='] ('Hint: 3?') ('9') // true

### F.>
##### int -> int -> bool
Returns if (arg1) is greater than (arg2)

    F['>'] (3) (3) // false
    F['>'] (3) (9) // false
    F['>'] (9) (3) // true

### F.>=
##### int -> int -> bool
Returns if (arg1) is greater than or equal to (arg2)

    F['>='] (3) (3) // true
    F['>='] (3) (9) // false
    F['>='] (9) (3) // true

### F.<
##### int -> int -> bool
Returns if (arg1) is lesser than (arg2)

    F['<'] (3) (3) // false
    F['<'] (3) (9) // true
    F['<'] (9) (3) // false

### F.<=
##### int -> int -> bool
Returns if (arg1) is lesser than or equal to (arg2)

    F['<='] (3) (3) // true
    F['<='] (3) (9) // true
    F['<='] (9) (3) // false

### F.!
##### bool -> bool
Negates the argument

    F['!'] (true) // false

### F.~
##### int -> int
2's complements the argument

    F['~'] (3) // -4

### F.+
##### int -> int
Adds the arguments

    F['+'] (3) (3) // 6

### F.-
##### int -> int
Subtracts the arguments

    F['-'] (3) (3) // 0
    F['-'] (3) (0) // 3

### F.*
##### int -> int
Multiplies the arguments

    F['*'] (3) (3) // 9

### F./
##### int -> int
Divides the arguments

    F['/'] (3) (3) // 1
    F['/'] (3) (1) // 3

### F.%
##### int -> int
Modulo divides the arguments

    F['%'] (3) (3) // 0
    F['%'] (3) (1) // 0

### F.|
##### int -> int
Bitwise Or the arguments

    F['|'] (3) (3) // 3

### F.||
##### bool -> bool
Logical Or the arguments

(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['||'] (true) (true) // true

### F.&
##### int -> int
Bitwise And the arguments

    F['&'] (3) (3) // 3

### F.&&
##### bool -> bool
Logical And the arguments

(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['&&'] (true) (true) // true

### F.^
##### int -> int
Bitwise Xor the arguments

    F['^'] (3) (3) // 0

### F.>>>
##### int -> int
Sign-propagating right shifts the arguments

    F['>>>'] (9) (2) // 2
    F['>>>'] (-9) (2) // -3

### F.>>>>
##### int -> int
Zero-fill right shifts the arguments

    F['>>>>'] (9) (2) // 2
    F['>>>>'] (-9) (2) // -1073741821

### F.<<<
##### int -> int
Left shifts the arguments

    F['<<<'] (9) (2) // 36

### F.??
##### 'a -> 'a -> 'a
If (arg1) is defined

Then return (arg1)

Else return (arg2)

note: the arguments are evaluated eagerly so this does not short-circuit

    F['??'] (9) (3) // 9
    F['??'] (undefined) (3) // 3

### F.~??
##### 'a -> 'a -> 'a
If (arg2) is defined

Then return (arg2)

Else return (arg1)

Note: the arguments are evaluated eagerly so this does not short-circuit

    F['~??'] (3) (9) // 9
    F['~??'] (3) (undefined) // 3

### F.?:
##### bool -> 'a -> 'a -> 'a
(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['?:'] (true) (3) (9) // 3
    F['?:'] (false) (3) (9) // 9

### F.~?:
##### 'a -> 'a -> bool -> 'a
(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['~?:'] (3) (9) (true) // 3
    F['~?:'] (3) (9) (false) // 9

### F.|>
### @@
##### 'a -> ('a -> 'b) -> 'b
passes (arg1) into (arg2)

    F['|>'] (3) (F['+'] (3)) // 6

### F.<|
##### ('a -> 'b) -> 'a -> 'b
passes (arg2) into (arg1)

    F['<|'] (F['+'] (3)) (3) // 6

### F.<<
##### ('a -> 'b) -> ('c -> 'a) -> ('c -> 'a)
Function composes the arguments

    var f = F['>>'] (F['+'] (3)) (F['*'] (3))
    f (3) // 12

### F.>>
##### ('a -> 'b) -> ('c -> 'a) -> ('c -> 'a)
Reverse function composes the arguments

    var f = F['>>'] (F['+'] (3)) (F['*'] (3))
    f (3) // 18

### F.neg
##### ('a -> bool) -> ('a -> bool)
Negates the predicate

    var f = F.neg (F['='] ('Hint: 3?'))
    f ('Hint: 3?') // false

### F.try
##### bool -> (unit -> 'a) list -> 'a
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

### F.swap
##### ('a -> 'b -> 'c) -> ('b -> 'a -> 'c)
Swaps the order of the next two arguments of the given function

    var f = F.swap (F['-'])
    f (3) (0) // -3

### F.delay
##### int -> (unit -> unit) -> unit
Calls the given function after waiting the given time in ms

    F.delay (3) (() => F.log ('Hint: 3?')) // waits 3ms and then prints 'Hint: 3?'

### F.tap
##### ('a -> 'b) -> 'a -> 'a
passes argument 2 to argument 1 and then returns argument 2
Note: for side-effecting when you want to retain the reference

    F.tap (F.log) ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'

### F.rcomp
##### (? -> ?) list -> (? -> ?)
Reverse function composes the argument

    var f = F.rcomp ([
        F.tap (F.log),
        F['='] ('Hint: 3?'),
        F.tap (F.log),
    ])
    f ('Hint: 3?') // true // prints 'Hint: 3?' then 'true'

### F.c
##### unit -> (? -> ?) list -> (? -> ?)
Reverse function composes the argument, but with a temporary DSL

note: F.ignore will be returned if there is only one function supplied

    var f = F.c () (
        F.tap (F.log)
        >> F['='] ('Hint: 3?')
        >> F.tap (F.log)
    )
    f ('Hint: 3?') // true // prints 'Hint: 3?' then 'true'

### F.p
##### ? -> (? -> ?) list -> ?
passes (arg1) to the reverse function composed (arg2), but with a temporary DSL

note: F.ignore will be returned if there is only one function supplied

    F.p ('Hint: 3?') (
        F.tap (F.log)
        >> F['='] ('Hint: 3?')
        >> F.tap (F.log)
    ) == true // prints 'Hint: 3?' then 'true'

### F.memoize
##### ('a -> 'b) -> ('a -> 'b)
Returns a memoized version of the function

The memoization has O(n) lookup

    var f = F.memoize (F.log)
    f ('Hint: 3?') // prints 'Hint: 3?'
    f ('Hint: 3?') // does nothing

### F.times
##### int -> (unit -> unit) -> unit
Invokes (arg2) (arg1) times

    F.times (3) (() => F.log ('Hint: 3?')) // prints 'Hint: 3?' 3 times

### F.after
##### int -> ('a -> 'b') -> ('a -> unit/'b)
Returns a version of (arg2) that does nothing and returns undefined until the (arg1)th time when it reverts to normal

    var f = F.after (3) (F.tap (F.log))
    f ('Hint: 3?') // undefined // does nothing
    f ('Hint: 3?') // undefined // does nothing
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'

### F.before
##### int -> ('a -> 'b') -> ('a -> unit/'b)
Returns a version of (arg2) that operates normally until the (arg1)th time when it starts doing nothing and returns undefined

    var f = F.before (3) (F.tap (F.log))
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'
    f ('Hint: 3?') // undefined // does nothing

### F.bind
##### 'a, 'b map -> 'a, 'b map
Binds the self-references for functions in the map to the map and returns the map

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
### L.cons
##### 'a -> 'a list -> 'a list
Appends (arg1) to the front of (arg2)

    L.cons (1) ([2, 3, 4]) // [1, 2, 3, 4]

### L.head
##### 'a list -> 'a
Returns the first element of the list

    L.head ([1, 2, 3]) // 1

### L.tail
##### 'a list -> 'a list
Returns all elements of the list except the first

    L.tail ([1, 2, 3]) // [2, 3]

### L.length
##### 'a list -> int
Returns the length of the list

    L.length ([1, 2, 3]) // 3

### L.is_empty
##### 'a list -> bool
Returns true if the list is empty, false otherwise

    L.is_empty ([]) // true
    L.is_empty ([1, 2, 3]) // false

### L.get
##### int -> 'a list -> 'a
If (arg1) is greater than (arg2)'s length

Then throws the exception F.e

Else returns the element at index (arg1) in (arg2) otherwise

    L.get (3) ([1, 2, 3]) // throws F.e
    L.get (3) ([1, 2, 3, 4]) // 4

### L.range
##### int -> int -> int list
If (arg1) is less than or equal to (arg2)

Then returns a list of increasing consecutive elements ranging from (arg1) to (arg2), both inclusive

Else returns an empty list

    L.range (3) (9) // [3, 4, 5, 6, 7, 8, 9]
    L.range (3) (3) // [3]
    L.range (9) (3) // []

### L.create
##### int -> 'a -> 'a list
Returns a list of (arg1) (arg2) elements

    L.create (9) (3) // [3, 3, 3, 3, 3, 3, 3, 3, 3]

### L.init
##### int -> (int -> 'a) -> 'a list
Returns a list of (arg1) elements generated by (arg2) passed the index of its respective element

    L.init (3) (i => i + 3) // [3, 4, 5]

### L.rev
##### 'a list -> 'a list
Returns a reverse of the list

    L.rev ([1, 2, 3]) // [3, 2, 1]

### L.iteri
##### (int -> 'a -> unit) -> 'a list -> unit
For each element in (arg2)

&nbsp;&nbsp;&nbsp;&nbsp;passe the respective index and element to (arg1)

    L.iteri (i => h => F.log (`${i}: ${h}`)) ([1, 2, 3]) // prints '0: 1' then '1: 2' then '2: 3'

### L.iter
##### ('a -> unit) -> 'a list -> unit
For each element in (arg2)

&nbsp;&nbsp;&nbsp;&nbsp;passe the element to (arg1)

    L.iter (F.log) ([1, 2, 3]) // prints '1' then '2' then '3'

### L.fold
##### ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a
(arg2) is the initial state of the accumulator

(arg1) is iteratively passed the previous accumulator and the next element in (arg2)

Returns the final accumulator

    F.fold (F['+']) (9) ([1, 2, 3]) // 15
    F.fold (F['-']) (9) ([1, 2, 3]) // 3

### L.reduce
##### ('a -> 'a -> 'a) -> 'a list -> 'a
If (arg2) is empty

Then throws the exception F.e

Else

&nbsp;&nbsp;&nbsp;&nbsp;The first element in (arg2) is the initial state of the accumulator

&nbsp;&nbsp;&nbsp;&nbsp;(arg1) is iteratively passed the previous accumulator and the next element in (arg2)

&nbsp;&nbsp;&nbsp;&nbsp;Returns the final accumulator

    F.reduce (F['+']) ([1, 2, 3]) // 6
    F.reduce (F['-']) ([1, 2, 3]) // -4

### L.scan
##### ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a list
The first element in (arg2) is the initial state of the accumulator

(arg1) is iteratively passed the previous accumulator and the next element in (arg2)

Returns the list of all accumulators

    F.scan (F['+']) (9) ([1, 2, 3]) // [9, 10, 12, 15]
    F.scan (F['-']) (9) ([1, 2, 3]) // [9, 8, 6, 3]

### L.mapi
##### (int -> 'a -> 'b) -> 'a list -> 'b list
Returns a list that is (arg2) with each element transformed by passing the respective index and that element to (arg1)

    F.mapi (F['+']) ([1, 2, 3]) // [1, 3, 5]

### L.map
##### ('a -> 'b) -> 'a list -> 'b list
Returns a list that is (arg2) with each element transformed by passing that element to (arg1)

    F.map (F['+'] (3)) ([1, 2, 3]) // [4, 5, 6]

### L.find
##### ('a -> bool) -> 'a list -> 'a
If an element exists in (arg2) for which (arg1) returns true

Then return the first element in (arg2) for which (arg1) returns true

Else throws the exception F.e

    L.find (F['='] (3)) ([1, 2, 3]) // 3
    L.find (F['='] (9)) ([1, 2, 3]) // throws F.e exception
