# green_curry: Curried functional programming library

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
### e
##### obj
Constant exception object thrown by this library

### id
##### 'a -> 'a
The identity function

    F.id ('Hint: 3?') // 'Hint: 3?'

### const
##### 'a -> unit -> 'a
Generates a constant function

    var f = F.const ('Hint: 3?')
    f () // 'Hint: 3?'
    var f = F.const ('9')
    f () // '9'

### ignore
##### 'a -> unit
Does nothing

    F.ignore ('Hint: 3?') // does nothing

### exec
##### (unit -> 'a) -> 'a
Executes the given function

    F.exec (() => 'Hint: 3?') // 'Hint: 3?'

### ex_if
##### bool -> unit
Throws the exception F.e if passed true, does nothing otherwise

    F.ex_if (true) // throws exception
    F.ex_if (false) // does nothing

### log
##### 'a -> unit
An alias for console.log.bind (console)

Aliasing and calling console.log by itself without binding will throw an exception

    var f = console.log
    f ('Hint: 3?') // throws null pointer exception
    var f = F.log
    f ('Hint: 3?') // prints 'Hint: 3?'

### eval
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

### =
### ==
##### 'a -> 'a -> bool
Compares the arguments with soft equality

    F['=='] ('Hint: 3?') ('Hint: 3?') // true
    F['=='] ('Hint: 3?') ('9') // false

### ===
##### 'a -> 'a -> bool
Compares the arguments with hard equality

    F['==='] ('Hint: 3?') ('Hint: 3?') // true
    F['==='] ('Hint: 3?') ('9') // false

### !=
### <>
##### 'a -> 'a -> bool
Compares the arguments with soft inequality

    F['!='] ('Hint: 3?') ('Hint: 3?') // false
    F['!='] ('Hint: 3?') ('9') // true

### !==
##### 'a -> 'a -> bool
Compares the arguments with hard inequality

    F['!=='] ('Hint: 3?') ('Hint: 3?') // false
    F['!=='] ('Hint: 3?') ('9') // true

### !
##### bool -> bool
Negates the argument

    F['!'] (true) // false

### ~
##### int -> int
2's complements the argument

    F['~'] (3) // -4

### +
##### int -> int
Adds the arguments

    F['+'] (3) (3) // 6

### -
##### int -> int
Subtracts the arguments

    F['-'] (3) (3) // 0
    F['-'] (3) (0) // 3

### *
##### int -> int
Multiplies the arguments

    F['*'] (3) (3) // 9

### /
##### int -> int
Divides the arguments

    F['/'] (3) (3) // 1
    F['/'] (3) (1) // 3

### %
##### int -> int
Modulo divides the arguments

    F['%'] (3) (3) // 0
    F['%'] (3) (1) // 0

### |
##### int -> int
Bitwise Or the arguments

    F['|'] (3) (3) // 3

### ||
##### bool -> bool
Logical Or the arguments

(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['||'] (true) (true) // true

### &
##### int -> int
Bitwise And the arguments

    F['&'] (3) (3) // 3

### &&
##### bool -> bool
Logical And the arguments

(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['&&'] (true) (true) // true

### ^
##### int -> int
Bitwise Xor the arguments

    F['^'] (3) (3) // 0

### ??
##### 'a -> 'a -> 'a
If (arg 1) is defined

Then return (arg 1)

Else return (arg 2)

note: the arguments are evaluated eagerly so this does not short-circuit

    F['??'] (9) (3) // 9
    F['??'] (undefined) (3) // 3

### ~??
##### 'a -> 'a -> 'a
If (arg 2) is defined

Then return (arg 2)

Else return (arg 1)

Note: the arguments are evaluated eagerly so this does not short-circuit

    F['~??'] (3) (9) // 9
    F['~??'] (3) (undefined) // 3

### ?:
##### bool -> 'a -> 'a -> 'a
(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['?:'] (true) (3) (9) // 3
    F['?:'] (false) (3) (9) // 9

### ~?:
##### 'a -> 'a -> bool -> 'a
(note: the arguments are evaluated eagerly so this does not short-circuit)

    F['~?:'] (3) (9) (true) // 3
    F['~?:'] (3) (9) (false) // 9

### |>
### @@
##### 'a -> ('a -> 'b) -> 'b
Pipes (arg 1) into (arg 2)

    F['|>'] (3) (F['+'] (3)) // 6

### <|
##### ('a -> 'b) -> 'a -> 'b
Pipes (arg 2) into (arg 1)

    F['<|'] (F['+'] (3)) (3) // 6

### <<
##### ('a -> 'b) -> ('c -> 'a) -> ('c -> 'a)
Function composes the arguments

    var f = F['>>'] (F['+'] (3)) (F['*'] (3))
    f (3) // 12

### >>
##### ('a -> 'b) -> ('c -> 'a) -> ('c -> 'a)
Reverse function composes the arguments

    var f = F['>>'] (F['+'] (3)) (F['*'] (3))
    f (3) // 18

### neg
##### ('a -> bool) -> ('a -> bool)
Negates the predicate

    var f = F.neg (F['='] ('Hint: 3?'))
    f ('Hint: 3?') // false

### try
##### bool -> (unit -> 'a) list -> 'a
Invokes the first function in (arg 2)

If the function throws an exception
Then
&nbsp;&nbsp;&nbsp;&nbsp;If (arg 1) is true

&nbsp;&nbsp;&nbsp;&nbsp;Then the exception is printed to console

&nbsp;&nbsp;&nbsp;&nbsp;Recurse this function with (arg 1) and the remainder of (arg 2)

Else the result is returned


    F.try (true) ([
        () => throw F.e,
        () => throw F.e,
        () => throw F.e,
        () => 'Hint: 3?',
    ]) // 'Hint: 3?' // each exception is printed

### swap
##### ('a -> 'b -> 'c) -> ('b -> 'a -> 'c)
Swaps the order of the next two arguments of the given function

    var f = F.swap (F['-'])
    f (3) (0) // -3

### delay
##### int -> (unit -> unit) -> unit
Calls the given function after waiting the given time in ms

    F.delay (3) (() => F.log ('Hint: 3?')) // waits 3ms and then prints 'Hint: 3?'

### tap
##### ('a -> 'b) -> 'a -> 'a
Pipes argument 2 to argument 1 and then returns argument 2
Note: for side-effecting when you want to retain the reference

    F.tap (F.log) ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'

### rcomp
##### (? -> ?) list -> (? -> ?)
Reverse function composes the argument

    var f = F.rcomp ([
        F.tap (F.log),
        F['='] ('Hint: 3?'),
        F.tap (F.log),
    ])
    f ('Hint: 3?') // true // prints 'Hint: 3?' then 'true'

### c
##### unit -> (? -> ?) list -> (? -> ?)
Reverse function composes the argument, but with a temporary DSL

    var f = F.c () (
        F.tap (F.log)
        >> F['='] ('Hint: 3?')
        >> F.tap (F.log)
    )
    f ('Hint: 3?') // true // prints 'Hint: 3?' then 'true'

### p
##### ? -> (? -> ?) list -> ?
Pipes (arg 1) to the reverse function composed (arg 2), but with a temporary DSL

    F.p ('Hint: 3?') (
        F.tap (F.log)
        >> F['='] ('Hint: 3?')
        >> F.tap (F.log)
    ) == true // prints 'Hint: 3?' then 'true'

### memoize
##### ('a -> 'b) -> ('a -> 'b)
Returns a memoized version of the function
The memoization has O(n) lookup

    var f = F.memoize (F.log)
    f ('Hint: 3?') // prints 'Hint: 3?'
    f ('Hint: 3?') // does nothing

### times
##### int -> (unit -> unit) -> unit
Invokes (arg 2) (arg 1) times

    F.times (3) (() => F.log ('Hint: 3?')) // prints 'Hint: 3?' 3 times

### after
##### int -> ('a -> 'b') -> ('a -> unit/'b)
Returns a version of (arg 2) that does nothing and returns undefined until the (arg 1)th time when it reverts to normal

    var f = F.after (3) (F.tap (F.log))
    f ('Hint: 3?') // undefined // does nothing
    f ('Hint: 3?') // undefined // does nothing
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'

### before
##### int -> ('a -> 'b') -> ('a -> unit/'b)
Returns a version of (arg 2) that operates normally until the (arg 1)th time when it starts doing nothing and returns undefined

    var f = F.before (3) (F.tap (F.log))
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'
    f ('Hint: 3?') // 'Hint: 3?' // prints 'Hint: 3?'
    f ('Hint: 3?') // undefined // does nothing

### bind
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
### cons
##### 'a -> 'a list -> 'a list
Appends (arg 1) to the front of (arg 2)

    L.cons (1) ([2, 3, 4]) // [1, 2, 3, 4]

### head
##### 'a list -> 'a
Returns the first element of the list

    L.head ([1, 2, 3]) // 1

### tail
##### 'a list -> 'a list
Returns all elements of the list except the first

    L.tail ([1, 2, 3]) // [2, 3]

### length
##### 'a list -> int
Returns the length of the list

    L.length ([1, 2, 3]) // 3

### is_empty
##### 'a list -> bool
Returns true if the list is empty, false otherwise

    L.is_empty ([]) // true
    L.is_empty ([1, 2, 3]) // false

### get
##### int -> 'a list -> 'a
If (arg 1) is greater than (arg 2)'s length
Then throws an F.e exception
Else returns the element at index (arg 1) in (arg 2) otherwise

    L.get (3) ([1, 2, 3]) // throws F.e
    L.get (3) ([1, 2, 3, 4]) // 4
