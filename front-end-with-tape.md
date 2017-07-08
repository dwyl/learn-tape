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

So our example lives in `front-end-testing/lib`, just open the `index.html` in
that directory in your browser, it's a basic counter which increments, decrements
 and resets. Have a look at it and read through the code in `script.js` and make
  sure you understand it.

The first thing to note from this is the `if` statement at the bottom.

```js
/*istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    increment: increment,
    decrement: decrement,
    resetFunc: resetFunc,
    updateDom: updateDom,
    currentCount: currentCount,
  };
}
```

This just stops the browser from trying to process `module.exports` so that we
don't get any console errors when the code is run in actual browser
(if `module` is `undefined` then trying to access properties from it will result
 in an error).

We need to use `module.exports` still so that we can require it into our test file.

We use `/*istanbul ignore next*/` as we do not want this if statement to effect
 our coverage. If you've not used istanbul before check out our
 [`learn-istanbul`](https://github.com/dwyl/learn-istanbul) repo.

So, lets get started!

Inside of the `front-end-testing` directory make a new directory called `test`
and inside of the new `front-end-testing/test` directory you just created
create a file called `test.spec.js`.

Open it in your favourite text editor and lets get started!

First we'll require in tape, JSDOM and fs.
```js
var test = require('tape');
// jsdom is a way to create a document object on the backend, we only need the
// JSDOM constructor from it so we get that out straight away
var JSDOM = require('jsdom').JSDOM;
var fs = require('fs');
```

We then need to get the contents of our html file so that JSDOM can use it to
create its own DOM.

```js
var html = fs.readFileSync(__dirname + '/../lib/index.html', 'utf8');
```

If you've not used the core node packages before then checkout
[learnyounode](https://github.com/workshopper/learnyounode) to get some
understanding of the basics of node.

We're now going to get the DOM we'll be using set up.

JSDOM is a constructor which takes the argument of a HTML file as a string, it
will then create a DOM (document object model) in the same way a browser would,
and we assign it to the variable 'DOM'
```js
const DOM = new JSDOM(html);
```

Next we declare a global variable, node is a little different to the browser,
if we want something to be in the global scope (as in, available in other files
whilst they are being processed by 'require') then we need to specifically
declare that. We do this with the 'document' from the DOM we just created so that
 it can be used by our JS file.

```js
global.document = DOM.window.document;
```

this takes the `document` from the DOM object and makes it globally available in
the current node environment, this means that when we require in our `script.js`
file it won't error due to `document` being undefined, because it is defined
with the DOM we just made!

So now we can require our script file in.
```js
var frontEndCode = require('../lib/script.js');
```

So now frontEndCode will be an object which is a copy of what we exported using
`module.exports` in `script.js`.

So, now lets write some tests!

Our increment and decrement functions both take in a number (or a number as a
string), and return that number increased/decreased by one, respectively. If it
is passed something which is not a number, or a string which can be coerced to a
number, then it should update the Dom to add an error message.

So first off lets write a test for increment for when it's passed the expected
arguments.
```js
test('test increment function', function(t) {
  var actual = frontEndCode.increment(1);
  var expected = 2;
  t.equal(actual, expected, 'should add one to a number');
  t.end();
});
```
This test is just like the tests from the README.md of this repo as we're doing
returning a basic value.

But, as said, if we call it with invalid input it updates the dom with with an
error message.

So we can update the test function so it looks like this:
```js
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
```js
frontEndCode.increment('not a number');
```
So we now hope that, as the code in our `script.js` suggests, the div with the
class `error` should now have a text node inside which says "Error: Argument
passed to increment was not a number".

So we can go get the `textContent` of that div and assign it to a variable, in
exactly the same way we would in front end code.
```js
actual = document.querySelector('.error').textContent;
```
(since `var actual` has already been declared above in this function's scope, we
don't have to declare it, we just have to reassign it.)

Then assign what we expect to a variable:
```js
expected = 'Error: Argument passed to increment was not a number';
```
And then we compare them like any other test:
```js
t.equal(actual, expected, 'should update error node when a string passed in');
```

Now, save your file, go to your terminal and run:
```
npm run front-end-test
```
You should see something which looks like this:
![picture of a terminal showing two passing tests](https://user-images.githubusercontent.com/21139983/27822341-4269c296-609d-11e7-928c-4d98dfbbfe7b.png)

Now run:
```
npm run front-end-coverage
```
You should see something like this:
![picture of test coverage](https://user-images.githubusercontent.com/21139983/27822333-3ab87a56-609d-11e7-8e33-905a5132f09e.png)

### Now you try!

Our aim (as it always is) is to bring this up to 100% coverage!

Now that we've walked through how to write a test for the increment function, you
should now be able to have a go at writing tests for the `decrement`, `resetFunc`,
`currentCount`, and `updateDom` functions!

If you get stuck you can take a look in the `front-end-testing/test-complete` to
see how we've written our tests.

Run `npm run front-end-test` whenever you write a test to make sure it's passing
(don't forget to use `t.end()`).

When you've written tests for all of those functions run `npm run front-end-coverage`
, and you should see something like this:
![picture of a terminal showing increased coverage](https://user-images.githubusercontent.com/21139983/27823988-e61a302e-60a2-11e7-91ba-a8d8a3aa1a96.png)

If your coverage is looking lower on any of the options then look at your tests,
are you testing all of the functions? Are you testing all possible outcomes of
each function?

### Let's get that coverage up to :100:

The last bits to test are our event listeners, since inside of the functions
passed as the arguments to the event listeners we compose our functions, we need
to make sure this composition is behaving as we expect it to.

We know each function on its own is behaving as expected, as we just wrote
passing unit tests for them, but now we want to test how they are put together.

We can do this by simulating a `click` on the button!

So, let's start with increment again, set up a new test just as we have been:
```js
test('increment is called properly when the inc button is clicked', function(t) {

});
```

now we want to make sure that `count` is at zero, just in case the previous code
has effected it, so we pull in the count node and update it:
```js
var count = document.querySelector('.count');

frontEndCode.updateDom(frontEndCode.resetFunc(), count);
```

Now, we want to simulate a click on our "+" button, just like in a browser we
can call `.click()` on any dom node to simulate a click on it! So we can add:
```js
document.querySelector('.inc').click();
```
And under that we can set up an expected, actual and a test by using our JSDOM.
```js
var actual = count.textContent;
var expected = '1';
t.equal(
  actual,
  expected,
  "clicking the '+' button in the DOM should increment the count by 1"
);
t.end();
```
You should now have a test that looks like this:
```js
test('increment is called properly when the inc button is clicked', function(t) {
  var count = document.querySelector('.count');

  frontEndCode.updateDom(frontEndCode.resetFunc(), count);

  document.querySelector('.inc').click();
  var actual = count.textContent;
  var expected = '1';
  t.equal(
    actual,
    expected,
    "clicking the '+' button in the DOM should increment the count by 1"
  );
  t.end();
});
```
run `npm run front-end-test` and watch the test pass. :tada:

Now, write a test for the event listener for the "-" and "reset" buttons, in a
really similar way to what we've just done.

Once you've done that run `npm run front-end-coverage` again and bask in the
glory of your 100% coverage! Just think of the badge on your repo when you get
this on your own projects!

Now you can use tape for your front end and back end code, and get 100% test
coverage everywhere!

## Further reading
+ [JSDOM documentation](https://github.com/tmpvar/jsdom)
+ Testing online/offline functionality using JDOM [stack overflow answer](https://stackoverflow.com/questions/44678841/simulating-going-online-offline-with-jsdom)
