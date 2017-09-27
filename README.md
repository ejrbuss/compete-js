# compete-js

A small library to help with coding competitions.

Coding competitions ofen require programmers to write small toy programs
that take input from a file or the command line and produce output to
submit. When competing you should be as focused as possible on the problem
at hand, not handling IO. `compete-js` provides a minimalist interface for
accepting input from files and the command line, and outputting them to a
file.

## Usage

To use `compete-js` just include `compete.js` from this repo's root folder.
The file exports a single function, `challenge`. It expects any number
of response functions as arguments. The response function should take as
its argument a single line of input. That input can come from a file or
the command line. Each response function is piped into the next from left
to right (like a shell command of the form `function1 | function2 | ...`).
Below is a simple example of a response that prints which line of input it is recieving.

```js
const challenge = require('./compete'); // bring in compete-js

// The response function
let   n        = 1;
const response = line => `${n++}: ${response}`:

// The challenge and response
challenge({ out : 'out.txt' }, response);
```

As shown in the example above, the first argument to challenge can be an options object. The following options are available:
 - `out` Provide an output path which will recieve responses
 - `clear=true` Deletes the output file if it exists when starting the
 challenge
 - `trim=true` Trims whitespace from input lines and only requests a
 response for non-empty lines
 - `newline=true` Automatically inserts a newline between responses
 - `echo=true` Echo responses to stdout

 For the above example we could have the following text in a file named
 `in.text`.

```txt
hello
world
```

Using the command line we can call the example as well as enter new input
on the command line. Responses will be shown on the command line as well as
sent to `out.txt`.

```bash
$ node my-js-file.js in.txt
1: hello
2: world
!
3: !
^C
$ cat out.txt
1: hello
2: world
3: !
$
```

An example of implementing FizzBuzz as a response can be found in the
`examples` folder of this repo.

## Contact
Email ejrbuss@gmail.com

Twitter [@ejrbuss](https://twitter.com/ejrbuss)

If you are interested in my other work checkout my
[website](https://ejrbuss.net)