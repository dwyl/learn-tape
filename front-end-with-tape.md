# Testing your front end Javascript with Tape

## Why?
Generally it would be nice to only use one testing framework rather than using
separate front end and back end testing frameworks. It means you don't have to flit
between different syntaxes for tests, and that you don't have to bloat your dev
dependencies

## What?
We're going to learn how to use JSDOM alongside tape to test our front end code.

## How?

We're going to have a small example, with some basic DOM manipulation, and we're
going to write some tests for it!

If you haven't already, look through
[the readme of this repo](https://github.com/dwyl/learn-tape/blob/master/README.md)
 to get introduced to tape.

So our example lives in `front-end-testing/lib`, just open the `index.html` in that directory in your browser, it's a basic counter which increments, decrements and resets. Have a look at it and read through the code in `script.js` and make sure you understand it.

So, lets get started!

Inside of `front-end-testing/test` make a file called `test.spec.js`.

Open it in your favourite text editor and lets get started!

First we'll require in tape, JSDOM and fs.
```
var test = require('tape');
// jsdom is a way to create a document object on the backend, we only need the JSDOM constructor from it so we get that out straight away
var JSDOM = require('jsdom').JSDOM;
var fs = require('fs');
```

We then need to get the contents of our html file so that JSDOM can use it to create its own DOM.

```
var html = fs.readFileSync(__dirname + '/../lib/index.html', 'utf8');
```

If you've not used the core node packages before then checkout [learnyounode](https://github.com/workshopper/learnyounode) to get some understanding of the basics of node.

We're now going to get the DOM we'll be using set up.

JSDOM is a constructor which takes the argument of a HTML file as a string, it will then create a DOM (document object model) in the same way a browser would, and we assign it to the variable 'DOM'
```
const DOM = new JSDOM(html);
```

Next we declare a global variable, node is a little different to the browser, if we want something to be in the global scope (as in, available in other files whilst they are being processed by 'require') then we need to specifically declare that. We do this with the 'document' from the DOM we just created so that it can be used by our JS file.

```
global.document = DOM.window.document;
```

this takes the `document` from the DOM object and makes it globally available in the current node environment, this means that when we require in our `script.js` file it won't error due to `document` being undefined, because it is defined with the DOM we just made!

So now we can require our script file in.
```
var frontEndCode = require('../lib/script.js');
```

So now frontEndCode will be an object which is a copy of what we exported using `module.exports` in `script.js`.

So, now lets write some tests!

Our increment and decrement functions both take in a number (or a number as a string), and return that number increased/decreased by one, respectively. If it is passed something which is not a number, or a string which can be coerced to a number, then it should update the Dom to add an error message.

So first off lets write a test for increment for when it's passed the expected arguments.
```
test('test increment function', function(t) {
  var actual = frontEndCode.increment(1);
  var expected = 2;
  t.equal(actual, expected, 'should add one to a number');
  t.end();
});
```
This test is just like the tests from the README.md of this repo as we're doing returning a basic value.

But, as said, if we call it with invalid input it updates the dom with with an error message.

So we can update the test function so it looks like this:
```
test('test increment function', function(t) {
  var actual = frontEndCode.increment(1);
  var expected = 2;
  t.equal(actual, expected, 'should add one to a number');
  frontEndCode.increment('not a number');
  // JSDOM does not support the use of 'node.innerText' so we have to use 'node.textContent'
  // I can access things in the 'document' just like I would be able to in the browser
  actual = document.querySelector('.error').textContent;
  expected = 'Error: Argument passed to increment was not a number';
  t.equal(actual, expected, 'should update error node when a string passed in');
  t.end();
});
```
So let's break down what happens here:
We call our increment function with invalid input
```
frontEndCode.increment('not a number');
```
So we now hope that, as the code in our `script.js` suggests, the div with the class `error` should now have a text node inside which says "Error: Argument passed to increment was not a number".

So we can go get the `textContent` of that div and assign it to a variable, in exactly the same way we would in front end code.
```
actual = document.querySelector('.error').textContent;
```
(since `var actual` has already been declared above in this function's scope, we don't have to declare it, we just have to reassign it.)

Then assign what we expect to a variable:
```
expected = 'Error: Argument passed to increment was not a number';
```
And then we compare them like any other test:
```
t.equal(actual, expected, 'should update error node when a string passed in');
```
