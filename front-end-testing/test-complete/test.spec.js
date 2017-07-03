var test = require('tape');
//jsdom is a way to create a document object on the backend, we only need the JSDOM constructor from it so we get that out straight away
var JSDOM = require('jsdom').JSDOM;
//we're using fs to read the file
var fs = require('fs');

//read our html file and assign its contents, as a string to 'html'
var html = fs.readFileSync(__dirname + '/../lib/index.html', 'utf8');

//JSDOM is a constructor which takes the argument of a HTML file as a string, it will then create a DOM (document object model) in the same way a browser would, and we assign it to the variable 'DOM'
const DOM = new JSDOM(html);

//Here we declare a global variable, node is a little different to the browser, if we want something to be in the global scope (as in, available in other files whilst they are being processed by 'require') then we need to specifically declare that. We do this with the 'document' from the DOM we just created so that it can be used by our JS file.
global.document = DOM.window.document;

//Now that we have the document globally we can require in the code from our JS file
var frontEndCode = require('../lib/script.js');

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

//the same tests for decrement
test('test decrement function', function(t) {
  var actual = frontEndCode.decrement(1);
  var expected = 0;
  t.equal(actual, expected, 'should add one to a number');
  frontEndCode.decrement('not a number');
  actual = document.querySelector('.error').textContent;
  expected = 'Error: Argument passed to decrement was not a number';
  t.equal(actual, expected, 'should update error node when a string passed in');
  t.end();
});

test('tests the reset function', function(t) {
  var actual = frontEndCode.resetFunc();
  var expected = 0;
  t.equal(actual, expected, 'resetFunc should return zero');
  t.end();
});

//here, like above we update a dom node using updateDom and then check that dom node's textContent against what we passed to updateDom.
test('test the updateDom function', function(t) {
  frontEndCode.updateDom('hello', document.querySelector('.error'));
  var actual = document.querySelector('.error').textContent;
  var expected = 'hello';
  t.equal(
    actual,
    expected,
    "updateDom should update a dom node's textContent with a string passed to updateDom"
  );
  t.end();
});

test('testing currentCount', function(t) {
  var count = document.querySelector('.count');
  //reset the count to zero so that we don't have to worry about it being influenced by previous tests
  frontEndCode.updateDom(frontEndCode.resetFunc(), count);
  var actual = frontEndCode.currentCount();
  var expected = '0';
  t.equal(
    actual,
    expected,
    "currentCount returns the textContent of the 'count' DOM node"
  );
  t.end();
});

//testing our event listeners
test('increment is called properly when the inc button is clicked', function(
  t
) {
  var count = document.querySelector('.count');

  frontEndCode.updateDom(frontEndCode.resetFunc(), count);
  //just like in a browser we can simulate a click by calling the '.click()' method of a DOM node, so we can test our function compilation in the callback to the event listeners
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

// do the same tests for decrement and reset
test('decrement is called properly when the inc button is clicked', function(
  t
) {
  var count = document.querySelector('.count');

  frontEndCode.updateDom(frontEndCode.resetFunc(), count);

  document.querySelector('.dec').click();
  var actual = count.textContent;
  var expected = '-1';
  t.equal(
    actual,
    expected,
    "clicking the '-' button in the DOM should decrement the count by 1"
  );
  t.end();
});

test('reset is called properly when the inc button is clicked', function(t) {
  var count = document.querySelector('.count');

  frontEndCode.updateDom(frontEndCode.resetFunc(), count);

  document.querySelector('.reset').click();
  var actual = count.textContent;
  var expected = '0';
  t.equal(
    actual,
    expected,
    "clicking the 'reset' button in the DOM should reset the count by 0"
  );
  t.end();
});
