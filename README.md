Learn Tape [![Build Status](https://travis-ci.org/dwyl/learn-tape.png?branch=master)](https://travis-ci.org/dwyl/learn-tape) [![Coverage Status](https://coveralls.io/repos/dwyl/learn-tape/badge.png)](https://coveralls.io/r/dwyl/learn-tape) [![Code Climate](https://codeclimate.com/github/dwyl/learn-tape.png)](https://codeclimate.com/github/dwyl/learn-tape) [![devDependency Status](https://david-dm.org/dwyl/learn-tape/dev-status.svg)](https://david-dm.org/dwyl/learn-tape#info=devDependencies)
===========

A *Beginner's Guide* to Test Driven Development (TDD) with ***Tape***.



> **Note**: if you are ***new to Test Driven Development*** (TDD) go to:
> [https://github.com/dwyl/**learn-tdd**](https://github.com/dwyl/learn-tdd)
where here is more general background about testing and a beginner's intro.


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

> Not convinced? read:
https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4

## *What?*

Tape

+ Tape website: https://github.com/substack/tape
+

## *Who?*






## *How?*

### Install

```sh
npm install tape --save-dev
```

You should see some output *confirming* it *installed*:

![Mocha Installed](https://raw.github.com/dwyl/learn-tape/master/images/mocha-installed.png "Mocha Installed Successfully")



### First Tests

#### Create Test Directory

In your project create a new **/test** directory to hold your tests:

```sh
mkdir test
```

#### Create test.js File

Now create a new file `/test/test.js` in your text editor

and write/paste the following code:

```js
var test = require('tape'); // assing the tape library to the variable "test"

test('should return -1 when the value is not present', function (t) {
  t.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so
  t.end()
});
```

#### Run Test

By typing the command **mocha** in your terminal the mocha comand line program
will look for a **/test** directory and run any **.js** files it contains:

```sh
node test/test.js
```

![Test Passes](https://raw.github.com/dwyl/learn-tape/master/images/mocha-1-test-passing.png "Mocha 1 Test Passes")

### A More Useful TDD Example (Cash Register Mini Project)

While I'm the first to agree that *cash-less* payments are the future,
paying with cash is something *everyone* can relate to and is therefore
a good example to use. (*think of better TDD example*? *tell me*!)


#### Basic Requirements

> Given a **Total Payable** and **Cash From Customer**
> Return: **Change To Customer** (notes and coins).

Essentially we are building a *simple* **calculator** that *only does* **subtraction**
(Total - Cash = Change), but also splits the **result** into the various **notes & coins**.

In the UK we have the following Notes & Coins:

![GBP Notes](https://raw.github.com/dwyl/learn-tape/master/images/gbp-notes.jpg "GBP Notes")
![GBP Coins](https://raw.github.com/dwyl/learn-tape/master/images/gbp-coins.jpg "GBP Coins")

see: http://en.wikipedia.org/wiki/Banknotes_of_the_pound_sterling
(technically there are also £100 and even £100,000,000 notes,
but these aren't common so we can leave them out. ;-)

If we use the penny as the unit (i.e. 100 pennies in a pound)
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

Back in your terminal window, re-run the **mocha** command and watch it *fail*:

```sh
mocha
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
