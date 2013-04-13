AsyncCallGuard
--------------

Make all calls to a function queued and asynchronously guarded

## NPM
Install the module with: `npm install asynccallguard`

## Usage

```javascript
var AsyncCallGuard = require('asynccallguard');

var w  = 100;

var f  = function(){console.log(Array.prototype.slice.call(arguments));};

var f2 = AsyncCallGuard(f, function MyGuard(fcall){
  //
  // ... Some complex logic here...
  //
  w *= 2;
  console.log('MyGuard was called, waiting for '+w+'ms before running f');
  setTimeout(fcall, w);
});

// Make multiple calls
f2();
f2(1,2);
f2(3,4);
f2(5,6,7);

// Produce:
// MyGuard was called, waiting for 200ms before running f
// []
// MyGuard was called, waiting for 400ms before running f
// [ 1, 2 ]
// MyGuard was called, waiting for 800ms before running f
// [ 3, 4 ]
// MyGuard was called, waiting for 1600ms before running f
// [ 5, 6, 7 ]

```


## Release History
v1.0.0 - Initial commit (13 apr. 2012)

## License
Copyright (c) 2013 Francois-Guillaume Ribreau
Licensed under the MIT license.
