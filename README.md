# green_curry: Curried functional programming library

An understanding of the typed lambda calculus is required for effective use of this library.
(Almost) all functions provided by this library are curried.
An understanding of the JavaScript type system is recommended for greater use of this library (my type signatures are not exact).

The contents of this package are organized into submodules.

F: general functions and constants

L: lists (arrays)
note: lists are assumed to be dense

M: maps (objects)

S: strings

## globalize
This method can be called to pull the included submodules into the top-level to obviate the need for fully-qualifying the asset
All examples on this page will assume this has already been called

    var green_curry = require ('green_curry')
    green_curry.F.log ('Hint: 3?')
    green_curry.globalize ()
    F.log ('Hint: 3?')

## F (general functions and constants)
### e
##### obj
Constant exception object thrown by this library

### id
##### 'a -> 'a
The identity function

    F.id ('Hint: 3?') == 'Hint: 3?'

### const
##### 'a -> unit -> 'a
Generates a constant function

    var f = F.const ('Hint: 3?')
    f () == 'Hint: 3?'
    var f = F.const ('9')
    f () == '9'

### ignore
##### 'a -> unit
Does nothing

    F.ignore ('Hint: 3?') // does nothing

### exec
##### (unit -> 'a) -> 'a
Executes the given function

    F.exec (() => 'Hint: 3?') == 'Hint: 3?'

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
    f ('Hint: 3?') // logs to console

### eval
##### string -> 'a
A wrapper for eval that will always operate within calling scope
An unaliased call to eval will operate within the calling scope
An aliased call to eval will operate at the global scope

    var a = 'Hint: 3?'
    eval ('a') == 'Hint: 3?'
    var f = eval
    f ('a') == undefined
    var f = F.eval
    f ('a') == 'Hint: 3?'

### =
### ==
##### 'a -> 'a -> bool
Compares the arguments with soft equality

    F['=='] ('Hint: 3?') ('Hint: 3?') == true
    F['=='] ('Hint: 3?') ('9') == false

### ===
##### 'a -> 'a -> bool
Compares the arguments with hard equality

    F['==='] ('Hint: 3?') ('Hint: 3?') == true
    F['==='] ('Hint: 3?') ('9') == false

### !=
### <>
##### 'a -> 'a -> bool
Compares the arguments with soft inequality

    F['!='] ('Hint: 3?') ('Hint: 3?') == false
    F['!='] ('Hint: 3?') ('9') == true

### !==
##### 'a -> 'a -> bool
Compares the arguments with hard inequality

    F['!=='] ('Hint: 3?') ('Hint: 3?') == false
    F['!=='] ('Hint: 3?') ('9') == true

### !
##### bool -> bool
Negates the argument

    F['!'] (true) == false

### ~
##### int -> int
2's complements the argument

    F['~'] (3) == -4

### +
##### int -> int
Adds the arguments

    F['+'] (3) (3) == 6

### -
##### int -> int
Subtracts the arguments

    F['-'] (3) (3) == 0
    F['-'] (3) (0) == 3

### *
##### int -> int
Multiplies the arguments

    F['*'] (3) (3) == 9

### /
##### int -> int
Divides the arguments

    F['/'] (3) (3) == 1
    F['/'] (3) (1) == 3

### %
##### int -> int
Modulo divides the arguments

    F['%'] (3) (3) == 0
    F['%'] (3) (1) == 0

### |
##### int -> int
Bitwise Or the arguments

    F['|'] (3) (3) == 3

### ||
##### bool -> bool
Logical Or the arguments
Note: the arguments are evaluated eagerly so this cannot be used like the native operator for control flow

    F['||'] (true) (true) == true

### &
##### int -> int
Bitwise And the arguments

    F['&'] (3) (3) == 3

### &&
##### bool -> bool
Logical And the arguments
Note: the arguments are evaluated eagerly so this cannot be used like the native operator for control flow

    F['&&'] (true) (true) == true

### ^
##### int -> int
Bitwise Xor the arguments

    F['^'] (3) (3) == 0

### |>
### @@
##### 'a -> ('a -> 'b) -> 'b
Pipes the first argument to the second argument

    F['|>'] (3) (F['+'] (3)) == 6

### <|
##### ('a -> 'b) -> 'a -> 'b
Pipes the second argument to the first argument

    F['<|'] (F['+'] (3)) (3) == 6

### <<
##### ('a -> 'b) -> ('c -> 'a) -> 'c -> 'a
Function composes the arguments

    var f = F['>>'] (F['+'] (3)) (F['*'] (3))
    f (3) == 12

### >>
##### ('a -> 'b) -> ('c -> 'a) -> 'c -> 'a
Reverse function composes the arguments

    var f = F['>>'] (F['+'] (3)) (F['*'] (3))
    f (3) == 18

