# _Why_ `Tap`?

In _most_ situations **`Tape`** will be _exactly_ what you need
to write and run your Node.js/JavaScript tests. <br />
**`Tape`** is minimalist, fast and has flexibility when you need it.
_Occasionally_ however, the needs of the project
require a few extra features from the testing framework,
that is when we use **`Tap`**.

If you find yourself (_your project_) needing to do "setup"
**`before`** running a test or "teardown" **`after`** the test is complete
(_e.g. resetting a mock or the state of a front-end app_),
***OR*** you have a few hundred/thousand tests which are taking a "long time"
to run (_e.g: more than 10 seconds_),
then you will benefit form switching/upgrading to **`Tap`**.

The **`Tap`** repo has quite a good breakdown of the _reasons_
why you should consider using **`Tap`**:
https://github.com/tapjs/node-tap#why-tap

> _**`Tape`** has 5x more usage than **`Tap`**
according to NPM install stats. <br />
> This is due to a number of factors including "founder effect". <br />
But the fact that **`Tape`** has **fewer features**
has contributed to it's enduring/growing popularity. <br />
Ensure you have **used** **`Tape`** in at least one "real" project
**`before`** considering **`Tap`**, otherwise you risk complexity!_



# _What_?

**`Tap`** is a testing framework that
has a few _useful_ extra features _without_ being "bloated".

+ [x] `beforeEach`
+ [x] `afterEach`
+ [x] _parallel_ test execution
+ [x] built-in code coverage

We will cover each of these features below. <br />

> **`Tap`** has _many_ more "advanced" features,
if you are _curious_ see: https://www.node-tap.org/advanced <br />
But don't get distracted by the "bells and whistles",
focus on building your App/Project and if you find
that you are repeating yourself a lot in your tests,
open an issue describing the problem e.g:

# _How_?

Continuing our theme of a "_vending machine_",
let's consider the following _real world_ use cases:

1. The Vending Machine "runs out" of coins and needs to be _re-filled_!
2. _Multiple_ Vending Machines!

We will add this functionality to the `calculateChange` function
and showcase two useful **`Tap`** features. <br />
Once those basics are covered,
we will dive into something _way_ more _ambitious_!


## 1. Install `Tap` as a Dev Dependency

Start by installing `Tap` ]
and saving it to your `package.json`:

```sh
npm install tap --save-dev
```

## 2. Copy the **`Tape`** Test

Copy the **`Tape`** test
so we can repurpose it for **`Tap`**:
```js
cp test/change-calculator.test.js test/change-tap.test.js
```

## 3. Change the First Line of the `test/change-tap.test.js` File

Open the `test/change-tap.test.js` file and change the _first_ line
to require **`tap`** instead of **`tape`**.

From:
```js
const test = require('tape');
```

To:
```js
const test = require('tap').test;
```

## 4. Run the Test

Run the **`Tap`** tests:

```sh
node test/change-tap.test.js
```

The output is slightly different from **`Tape`**,
but the tests still pass:

![tap-tests-pass](https://user-images.githubusercontent.com/194400/47609430-48d7ee00-da36-11e8-9f3c-f448f78311bb.png)

## 5. New Requirement: Real World Coin Supply

In the "real world" the coins in the machine will be given out
as change to the people buying products and may "run out".
Therefore having a _fixed_ Array of coins in the `calculateChange` function
is _artificially_ setting expectations that might not reflect _reality_.

We need a way of (_optionally_) passing
the array of coins into the `calculateChange` function
but having a _default_ array of coins
so the _existing_ tests continue to pass.


> **Note**: for brevity, we are using the _functional_ solution
to `calculateChange` function. <br />
If this is unfamiliar to you,
please see: https://github.com/dwyl/learn-tdd#functional

### 5.1 Add `coinsAvail` (_optional_) parameter to JSDOC

Add a _new_ parameter to the JSDOC comment (_above the function_):

Before:
```js
/**
 * calculateChange accepts two parameters (totalPayable and cashPaid)
 * and calculates the change in "coins" that needs to be returned.
 * @param {number} totalPayable the integer amount (in pennies) to be paid
 * @param {number} cashPaid the integer amount (in pennies) the person paid
 * @returns {array} list of coins we need to dispense to the person as change
 * @example calculateChange(215, 300); // returns [50, 20, 10, 5]
 */
```

After:
```js
/**
 * calculateChange accepts two parameters (totalPayable and cashPaid)
 * and calculates the change in "coins" that needs to be returned.
 * @param {number} totalPayable the integer amount (in pennies) to be paid
 * @param {number} cashPaid the integer amount (in pennies) the person paid
 * @param {array} [coinsAvail=COINS] the list of coins available to select from.
 * @returns {array} list of coins we need to dispense to the person as change
 * @example calculateChange(215, 300); // returns [50, 20, 10, 5]
 */
```

The important bit is:
```js
 * @param {array} [coinsAvail=COINS] the list of coins available to select from.
```

`[coinsAvail=COINS]` means:
+ the argument will be called `coinsAvail` and
+ a default value of `COINS` (_the default Array of coins_) will be set
if the argument is undefined.
+ the `[ ]` (_square brackets_) around
the parameter definition indicates that it's _optional_.

More detail on optional parameters in JSDOC comments, <br />
see: http://usejsdoc.org/tags-param.html#optional-parameters-and-default-values

The _full_ file should now look like this:
[`lib/change-calculator.js`](https://github.com/dwyl/learn-tape/blob/d157a609ad8f2900588b1e118624b6e17d4c36c9/lib/change-calculator.js)


> At this point nothing in the `calculateChange` function or tests has changed,
so if you run the tests,
you should see _exactly_ the same output as above in step 4;
all tests still pass.


### 5.2 Add a _Test_ For the New `coinsAvail` Parameter

Add the following test to your `test/change-tap.test.js` file:

```js
test('Vending Machine has no £1 coins left! calculateChange(1337, 1500, [200, 50, 50, 50, 10, 5, 2, 1]) should equal [100, 50, 10, 2, 1 ]', function (t) {
  const result = calculateChange(1337, 1500, [200, 50, 50, 50, 10, 5, 2, 1]);
  const expected = [50, 50, 50, 10, 2, 1 ]; // £1.63
  t.deepEqual(result, expected);
  t.end();
});
```

Run the **`Tap`** tests:

```sh
node test/change-tap.test.js
```

You should see the test _fail_:

![tap-test-fail](https://user-images.githubusercontent.com/194400/47610486-539e7d00-da4e-11e8-9989-2c39bc2403e7.png)



### 5.3 Add `coinsAvail` (_optional_) Parameter to `calculateChange` Function

Now that we've written the JSDOC for our function,
let's add the `coinsAvail` parameter to the `calculateChange` function:

Before:
```js
module.exports = function calculateChange (totalPayable, cashPaid) {
  ...
}
```

After:
```js
module.exports = function calculateChange (totalPayable, cashPaid, coinsAvail) {
  ...
}
```

The tests will still not pass. Re-run them and see for yourself.

### 5.4 _Implement_ Default value `COINS` when `coinsAvail` is `undefined`

Given that the `coinsAvail` parameter is _optional_ we need
a default value to work with in our function,
let's create a `coins` function-scoped variable
and use _conditional assignment_ to set `COINS` as the default value
of the Array if `coinsAvail` is undefined:

Before:
```js
module.exports = function calculateChange (totalPayable, cashPaid, coinsAvail) {
  return COINS.reduce(function (change, coin) {
    // etc.
  }, []);
}
```

After:
```js
module.exports = function calculateChange (totalPayable, cashPaid, coinsAvail) {
  const coins = coinsAvail || COINS; // if coinsAvail param undefined use COINS
  return coins.reduce(function (change, coin) {
    // etc.  
  }, []);
}
```

This should be enough code to make the test defined above in step 5.2 _pass_.
Save your chances to the `calculateChange` function and re-run the tests:

```sh
node test/change-tap.test.js
```

You should see all the tests _pass_:

![coinsAvail-test-passing](https://user-images.githubusercontent.com/194400/47610513-fbb44600-da4e-11e8-9593-683735cde5a6.png)

That's it, you've satisfied the requirement of allowing a
`coinsAvail` ("Coins Available") array
to be passed into the `calculateChange` function.

But hold on ... are we _really_ testing the _real-world_ scenario
where the coins are _removed_ from the `coinsAvail` each time
the Vending Machine gives out change...?







<!--
<br /><br /><br />

## Analogy: _Single_ Speed vs. _Geared_ Bicycle


To the _untrained_ observer,


<div align="center">
    <a href="https://user-images.githubusercontent.com/194400/46041154-102cb800-c10a-11e8-8646-153a77b53408.jpg">
        <img width="700px" src="https://user-images.githubusercontent.com/194400/47200839-8a4e0680-d36f-11e8-9419-96e8c0ca968e.jpg"
        alt="single speed bicycle - perfect for short trips on fairly flat ground">
    </a>
</div>
<br />

**`Tape`** is like a **single speed** bicycle;
lightweight, fewer "moving parts", less to learn and _fast_! <br />
_Perfect_ for **_short_ trips** on _relatively_ **_flat_ terrain**.
_Most_ journeys in cities fit this description.
_Most_ of the time you won't _need_ anything more than this
for commuting from home to work, going to the shops, etc.


<div align="center">
    <a href="https://user-images.githubusercontent.com/194400/46041153-102cb800-c10a-11e8-9c51-3c16eb81db4c.jpg">
        <img width="700px" src="https://user-images.githubusercontent.com/194400/47200840-8a4e0680-d36f-11e8-8634-2fcf80eedee5.jpg"
        alt="geared bicycle bicycle - for longer distances and hilly terrain">
    </a>
</div>
<br />

**`Tap`** is the bicycle _with **gears**_
that allows you to tackle different _terrain_.
"Gears" in the context of writing unit/end-to-end tests
is having a `t.spawn` (_run tests in a separate process_),
or running tests in parallel so they finish faster;
i.e. reducing the _effort_ required to cover the same distance
and in some cases speeding up the execution of your test suite.



> <small> **Note**: This analogy falls down if your commuting distance is far;
you need a geared bicycle for the long stretches!
Also, if you _never_ ride a bicycle - for whatever reason -
and don't appreciate the difference between
single speed and geared bikes this analogy might feel less relevant ...
in which case we recommend a bit of background reading:
https://bicycles.stackexchange.com/questions/1983/why-ride-a-single-speed-bike
</small>

<br />

# _Why_ NOT Use `Tap` _Everywhere_?

One of the _benefits_ of Free/Open Source software
is that there is near-zero
["switching cost"](https://en.wikipedia.org/wiki/Switching_barriers).
Since we aren't paying for the code,
the only "cost" to adopting a new tool is **_learning_ time**.

Given that **`Tap`** is a "drop-in replacement" for **`Tape`**
in _most_ cases, the switching cost is just **`npm install tap --save-dev`**
followed by a find-and-replace across the files in your project from:
**`require('tape')`** to **`require('tap').test`**.

Over the last 5 years @dwyl we have tested **200+** projects using **`Tape`**
(_both Open Source and Client projects_).
We have no reason for "_complaint_" or criticism of **`Tape`**,
we will _not_ be spending time switching
our _existing_ projects from **`Tape`** to **`Tap`**
because in most cases, there is **no _need_**;
[YAGNI!](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

Where we _are_ using **`Tap`** is for the _massive_ projects
where we either need to do a lot of state re-setting e.g: **`t.afterEach`**
or simply where test runs take longer than 10 seconds
(_because we have lots of end-to-end tests_)
and running them in ***parallel*** significantly reduces waiting time.

For an _extended_ practical example of where writing tests with **`Tap`**
_instead_ of **`Tape`** was worth the switch,
see: https://github.com/dwyl/todomvc-vanilla-javascript-elm-architecture-example

-->
