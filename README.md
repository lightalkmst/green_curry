# green_curry: Curried functional programming library

An understanding of the typed lambda calculus and JavaScript type system is recommended for effective use of this library. (Almost) all functions provided by this library are curried.

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

    F.id ('3?') == 'Hint: 3?'

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


  '!': x => ! x,
  '~': x => ! x,

  '+': x => y => x + y,

  '-': x => y => x - y,

  '*': x => y => x * y,

  '/': x => y => x / y,

  '%': x => y => x % y,

  '|': x => y => x | y,

  '||': x => y => x || y,

  '&': x => y => x & y,

  '&&': x => y => x && y,

  '^': x => y => x ^ y,

  '|>': x => f => f (x),
  '@@': x => f => f (x),

  '<|': f => x => f (x),

  '>>': f => g => x => f (g (x)),

  '<<': f => g => x => g (f (x)),
