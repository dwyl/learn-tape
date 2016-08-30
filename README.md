Learn Tape [![Build Status](https://travis-ci.org/dwyl/learn-tape.png?branch=master)](https://travis-ci.org/dwyl/learn-tape) [![Coverage Status](https://coveralls.io/repos/dwyl/learn-tape/badge.png)](https://coveralls.io/r/dwyl/learn-tape) [![Code Climate](https://codeclimate.com/github/dwyl/learn-tape.png)](https://codeclimate.com/github/dwyl/learn-tape) [![devDependency Status](https://david-dm.org/dwyl/learn-tape/dev-status.svg)](https://david-dm.org/dwyl/learn-tape#info=devDependencies)
===========

A *Beginner's Guide* to Test Driven Development (TDD) with ***Tape***.



> **Note**: if you are ***new to Test Driven Development*** (TDD) go to:
> [https://github.com/dwyl/**learn-tdd**](https://github.com/dwyl/learn-tdd)
where there is more *general* ***beginner's introduction*** and background about testing.


## *Why?*

***Testing*** your code is ***essential*** to ensuring reliability.  

There are _many_ testing frameworks so it can be
[*difficult to chose*](https://www.ted.com/talks/barry_schwartz_on_the_paradox_of_choice?language=en),
***most*** try to do too much, have ***too many features***
(["_bells and whistles_"](http://dictionary.cambridge.org/dictionary/english/bells-and-whistles) ...)
or ***inject global variables*** into your run-time or have complicated syntax.

The _shortcut_ to chosing our tools is to apply the golden rule:

![perfection-achieved](https://cloud.githubusercontent.com/assets/194400/17927874/c7d06200-69ef-11e6-9ec8-a3c3692aaeed.png)

We use Tape because its' ***minmalist*** (*yet complete and easy to learn*)
***feature-set*** lets you craft ***simple maintainable tests*** that ***run fast***.

### _Reasons_ Why Tape (not XYZ Test Runner/Framework...)

+ ***No configuration*** required. (_works out of the box. but can be configured if needed_)
+ ***NO "Magic" Global Variables*** injected into your run-time
(e.g: `describe`, `it`, `before`, etc.)
+ ***No Shared State*** between tests. (_tape does not encourage you to write messy tests_!)
+ **Bare-minimum** only `require` or `import` into your test file.
+ Tests are "Just JavaScript" so you can run tests as a node script
e.g: `node test/my-test.js`
+ No globally installed "CLI" required
+ Appearance of test output (what you see in your terminal/browser) is fully customisable.

> Read: https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4

## *What?*

Tape is a JavaScript testing framework that works in both Node.js and Browsers.
It lets you write simple tests that are easy to read/maintain.
The _output_ of Tape tape tests is a "***TAP Stream***" which can be
ready by other programs/packages e.g. to display statistics of your tests.

### Background Reading

+ Tape website: https://github.com/substack/tape
+ Test Anything Protocol (TAP) https://testanything.org/
+ Test Anything Protocol - gentler introduction:
https://en.wikipedia.org/wiki/Test_Anything_Protocol


## *Who?*

People who want to write tests for their Node.js or Web Browser JavaScript code.
(*i.e. ALL JavaScript coders!*)

## *How?*

### Install

```sh
npm install tape --save-dev
```

You should see some output *confirming* it *installed*:

![learn-tape-install-save-dev](https://cloud.githubusercontent.com/assets/12497678/18086275/04850802-6ea7-11e6-8e27-ef357daa258c.png)


### First Tepe Test

#### Create Test _Directory_

In your project create a new **/test** directory to hold your tests:

```sh
mkdir test
```

#### Create Test _File_

Now create a new file `/test/learn-tape.test.js` in your text editor.

and write (_or copy-paste_) the following code:

```js
var test = require('tape'); // assign the tape library to the variable "test"

test('should return -1 when the value is not present in Array', function (t) {
  t.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so passes
  t.end();
});
```


#### Run The Test

You run a Tape test by executing the _file_ in your terminal e.g:

```sh
node test/learn-tape.test.js
```

![your-first-tape-test-passing](https://cloud.githubusercontent.com/assets/12497678/18088977/869f9efc-6eb5-11e6-9ed3-20018e32ae9c.png)



> **Note**: we use this naming convention `/test/{test-name}.test.js`
for test files in our projects so that we can keep other "_helper_" files
in the `/test` directory and still be able to _run_ all the _test_ files in the
`/test` directory using a _pattern_: `node ./test/*.test.js`

### Make it _Pass_

Copy the following code into a new file called `test/make-it-pass.test.js`:

```js
var test = require('tape'); // assign the tape library to the variable "test"

function sum (a, b) {
  // your code to make the test pass goes here ...
}

test('sum should return the addition of two numbers', function (t) {
  t.equal(3, sum(1, 2)); // make this test pass by completing the add function!
  t.end();
});
```

Run the file (_script_) in your terminal: `node test/make-it-pass.test.js`

You should see something like this:

![learn-tape-not-passing](https://cloud.githubusercontent.com/assets/194400/18090697/db9393de-6ebd-11e6-92b3-6cf767b1e296.png)

Try writing the code required in the `sum` function to make the test _pass_!

![learn-tape-make-it-pass](https://cloud.githubusercontent.com/assets/194400/18092453/41ab9a30-6ec4-11e6-9bfb-26868d9de7f0.png)


### Mini TDD Project: Change Calculator

#### Basic Requirements

> Given a **Total Payable** and **Cash From Customer**
> Return: **Change To Customer** (notes and coins).

Essentially we are building a *simple* **calculator** that *only does* **subtraction**
(Total - Cash = Change), but also splits the **result** into the various **notes & coins**.

In the UK we have the following Notes & Coins:

![GBP Notes](https://cloud.githubusercontent.com/assets/194400/18094402/3faa2d62-6ecb-11e6-8c32-76fcc1168460.jpeg "GBP Notes")
![GBP Coins](https://cloud.githubusercontent.com/assets/194400/18094436/5b2aca6a-6ecb-11e6-8e97-985edc0469af.jpeg "GBP Coins")

see: http://en.wikipedia.org/wiki/Banknotes_of_the_pound_sterling
(_technically there are also £100 and even £100,000,000 notes,
but these aren't common so we can leave them out._ ;-)

If we use the **penny** as the **unit** (i.e. 100 pennies in a pound)
the notes and coins can be represented as:

- 5000 (£50)
- 2000 (£20)
- 1000 (£10)
-  500 (£5)
-  200 (£2)
-  100 (£1)
-   50 (50p)
-   20 (20p)
-   10 (10p)
-    5 (5p)
-    2 (2p)
-    1 (1p)

this can be represented as an Array:

```javascript
var coins = [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
```

**Note**: the same can be done for any other cash system ($ ¥ €)
simply use the cent, sen or rin as the unit and scale up notes.

#### The First Test

If you are *totally* new to TDD I recommend reading this
[intro article](http://www.agiledata.org/essays/tdd.html) by Scott Ambler
(especially the diagrams) otherwise this (test-fail-code-pass) process
may seem *strange* ...

In **T**est **F**irst **D**evelopment (TFD) we write a test *first* and *then*
write the code that makes the test pass.

so, back in our ./test/**test.js** file add the following line:

```javascript
var C = require('../cash.js');  // our module
```

#### Watch it Fail

Back in your terminal window, re-run the test by executing the command and watch it *fail*:

```sh

```

![Mocha TFD Fail](https://raw.github.com/dwyl/learn-tape/master/images/mocha-tfd-cannot-find-module-first-fail.png "Mocha TFD Fail")

This error ("**Cannot find module '../cash.js'**") is pretty self explanatory.
We haven't created the file yet so test.js is requesting a non-existent file!

> **Q**: Why *deliberately* write a test we *know* is going to *fail*...? <br />
> **A**: To get used to the idea of *only* writing the code required to *pass*
>    the *current* (*failing*) *test*.


#### Create the Module File

Create a new file for our cash register **cash.js**:

```sh
touch cash.js
```

**Note**: We are *not* going to add any code to it just yet.

Re-run the **mocha** command in terminal, it will pass (*zero* tests)

![Mocha Pass 0 Tests](https://raw.github.com/dwyl/learn-tape/master/images/mocha-0-passing.png "Mocha Pass 0 Tests")

Lets add a test to ./test/**test.js** and watch it fail again:

```javascript
var assert = require("assert"); // core module
var C = require('../cash.js');  // our module

describe('Cash Register', function(){
  describe('Module C', function(){
    it('should have a getChange Method', function(){
      assert.equal(typeof C, 'object');
      assert.equal(typeof C.getChange, 'function');
    })
  })
});  
```
Re-run `mocha`:

![Mocha 1 Test Failing](https://raw.github.com/dwyl/learn-tape/master/images/mocha-first-test-failing.png "Mocha 1 Test Failing")

#### Write *Just* Enough Code to Make the Test Pass

Add the following to **cash.js**:

```javascript
var C = {};                    // C Object simplifies exporting the module
C.getChange = function () {    // enough to satisfy the test
    'use strict';
    return true;               // also passes JSLint
};
module.exports = C;            // export the module with a single method
```

Re-run `mocha` (now it passes):

![Mocha 1 Test Passes](https://raw.github.com/dwyl/learn-tape/master/images/mocha-1-test-pass.png "Mocha 1 Test Passes")


#### Write A Real Test

Going back to the requirements, we need our getChange method to accept
two arguments/parameters (**totalPayable** and **cashPaid**) and return an
array containing the coins equal to the difference:

e.g:
```
totalPayable = 210         // £2.10
cashPaid     = 300         // £3.00
dfference    =  90         // 90p
change       = [50,20,20]  // 50p, 20p, 20p
```

Add the following test to ./test/**test.js**:

```javascript
it('getChange(210,300) should equal [50,20,20]', function(){
    assert.deepEqual(C.getChange(210,300), [50,20,20]);
})
```

**Note**: use assert.**deepEqual** for arrays
see: http://stackoverflow.com/questions/13225274/

![Mocha Assertion Error](https://raw.github.com/dwyl/learn-tape/master/images/mocha-assertionError.png "Mocha Assertion Error")

#### Write the Method to Pass the Test

What if I cheat?

```javascript
C.getChange = function (totalPayable, cashPaid) {
    'use strict';
    return [50, 20, 20];    // just enough to pass :-)
};
```

This will pass:

![Mocha Passing](https://raw.github.com/dwyl/learn-tape/master/images/mocha-2-passing.png "Mocha 2 Passing")

This only works *once*. When the Spec (Test) Writer writes the next test, the method will need
to be re-written to satisfy it.

Lets try it.  Work out what you expect:
```
totalPayable = 486           // £4.86
cashPaid     = 1000          // £10.00
dfference    = 514           // £5.14
change       = [500,10,2,2]  // £5, 10p, 2p, 2p
```

Add the following test to ./test/**test.js** and re-run `mocha`:

```javascript
it('getChange(486,1000) should equal [500, 10, 2, 2]', function(){
    assert.deepEqual(C.getChange(486,1000), [500, 10, 2, 2]);
})
```

As expected, our lazy method fails:

![Mocha 3 Test Fails](https://raw.github.com/dwyl/learn-tape/master/images/mocha-2-passing-1-fail.png "Mocha 3rd Test Fails")

#### Keep Cheating or Solve the Problem?

We could keep cheating by writing a series of if statements:

```javascript
C.getChange = function (totalPayable, cashPaid) {
    'use strict';
    if(totalPayable == 486 && cashPaid == 1000)
        return [500, 10, 2, 2];
    else if(totalPayable == 210 && cashPaid == 300)
        return [50, 20, 20];
};
```
The *Arthur Andersen Approach* gets results:

![Mocha 3 Passing](https://raw.github.com/dwyl/learn-tape/master/images/mocha-3-passing.png "Mocha 3 Passing")

But its arguably *more work* than simply *solving* the problem.
Lets do that instead.
(**Note**: this is the *readable* version of the solution! feel free to suggest a more compact algorithm)

```javascript
var C = {};     // C Object simplifies exporting the module
C.coins = [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
C.getChange = function (totalPayable, cashPaid) {
    'use strict';
    var change = [];
    var length = C.coins.length;
    var remaining = cashPaid - totalPayable;          // we reduce this below

    for (var i = 0; i < length; i++) { // loop through array of notes & coins:
        var coin = C.coins[i];

        if(remaining/coin >= 1) { // check coin fits into the remaining amount
            var times = Math.floor(remaining/coin);        // no partial coins

            for(var j = 0; j < times; j++) {     // add coin to change x times
                change.push(coin);
                remaining = remaining - coin;  // subtract coin from remaining
            }
        }
    }
    return change;
};
```

Add one more test to ensure we are *fully* exercising our method:

```
totalPayable = 1487                                 // £14.87  (fourteen pounds and eighty-seven pence)
cashPaid     = 10000                                // £100.00 (one hundred pounds)
dfference    = 8513                                 // £85.13
change       = [5000, 2000, 1000, 500, 10, 2, 1 ]   // £50, £20, £10, £5, 10p, 2p, 1p
```

```javascript
it('getChange(1487,10000) should equal [5000, 2000, 1000, 500, 10, 2, 1 ]', function(){
    assert.deepEqual(C.getChange(1487,10000), [5000, 2000, 1000, 500, 10, 2, 1 ]);
});
```

![Mocha 4 Passing](https://raw.github.com/dwyl/learn-tape/master/images/mocha-4-tests-passing.png "Mocha 4 Passing")


- - -

### Bonus Level

#### Code Coverage

We are using istanbul for code coverage.
If you are new to istanbul check out my brief tutorial:
https://github.com/nelsonic/learn-istanbul

Install istanbul:

```sh
npm install istanbul -g
```

Run the following command to get a coverage report:
```sh
istanbul cover _mocha -- -R spec
```
You should see:

![Istanbul Coverage](https://raw.github.com/dwyl/learn-tape/master/images/istanbul-cover-mocha.png "Istanbul Code Coverage")

or if you prefer the **lcov-report**:

![Istanbul Coverage Report](https://raw.github.com/dwyl/learn-tape/master/images/istanbul-coverage-report.png "Istanbul Code Coverage Report")

> **100% Coverage** for Statements, Branches, Functions and Lines.


#### Travis

If you are new to Travis CI check out my tutorial:
https://github.com/nelsonic/learn-travis

> Visit: https://travis-ci.org/profile
> Enable Travis for learn-travis project

![Travis Enabled](https://raw.github.com/dwyl/learn-tape/master/images/travis-on.png "Travis Enabled")

[![Build Status](https://travis-ci.org/dwyl/learn-tape.png?branch=master)](https://travis-ci.org/dwyl/learn-tape)

![Travis Build Pass](https://raw.github.com/dwyl/learn-tape/master/images/learn-travis-build-passing.png "Travis Build Passing")

Done.

- - -

## tl;dr

#### Why Mocha?

At last count there were 83 testing frameworks *listed* on the node.js
modules page: https://github.com/joyent/node/wiki/modules#wiki-testing
this is *both* a problem (*too much choice* can be
*overwhelming*) and good thing (diversity means new ideas and innovative
solutions can flourish).

There's no hard+fast rule for "*which testing framework is the best one*?"

Over the past 3 years I've tried:
[Assert (Core Module)](http://nodejs.org/api/assert.html),
[Cucumber](https://github.com/cucumber/cucumber-js),
[Expresso](https://github.com/visionmedia/expresso)
[Jasmine](https://github.com/mhevery/jasmine-node),
[Mocha](https://github.com/mochajs/mocha),
[Nodeunit](https://github.com/caolan/nodeunit),
[Should](https://github.com/visionmedia/should.js), and
[Vows](https://github.com/cloudhead/vows)

My **criteria** for chosing a testing framework:

- **Simplicity** (one of TJ's *stated aims*)
- **Elegance** (*especially when written in CoffeeScript*)
- **Speed** (Mocha is *Fast*. 300+ tests run in under a second)
- **Documentation** (plenty of real-world examples: http://mochajs.org)
- **Maturity** (*Battle-tested* by *thousands* of developers!)

Advanced:


### Notes
