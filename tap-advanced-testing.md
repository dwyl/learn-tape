<div align="center">
  <img src="https://user-images.githubusercontent.com/194400/47678067-c0ce2180-dbb8-11e8-84c9-061f495e96c2.png"
  alt="TAP">
</div>

# _Why_ `Tap`?

In _most_ situations **`Tape`** will be _exactly_ what you need
to write and run your Node.js/JavaScript tests. <br />
**`Tape`** is minimalist, fast and has flexibility when you need it.  
_Occasionally_ however, the needs of the project
require a few extra features from the testing framework and
that is when we use **`Tap`**.

If you find yourself (_your project_) needing to do "setup"
**`before`** running a test or "teardown" **`after`** the test is complete
(_e.g. resetting a mock or the state of a front-end app_),
**_OR_** you have a few hundred/thousand tests which are taking a "long time"
to run (_e.g: more than 10 seconds_),
then you will benefit form switching/upgrading to **`Tap`**.

The **`Tap`** repo has quite a good breakdown of the _reasons_
why you should consider using **`Tap`**:
https://github.com/tapjs/node-tap#why-tap

> _**`Tape`** has 5x more usage than **`Tap`**
> according to NPM install stats. <br />
> This is due to a number of factors including "founder effect". <br />
> But the fact that **`Tape`** has **fewer features**
> has contributed to it's enduring/growing popularity. <br />
> Ensure you have **used** **`Tape`** in at least one "real" project
> **`before`** considering **`Tap`**, otherwise you risk complexity!_

# _What_?

**`Tap`** is a testing framework that
has a few _useful_ extra features _without_ being "bloated".

- [x] `beforeEach` or `afterEach` for "resetting state" between tests.
- [x] _parallel_ test execution: https://www.node-tap.org/parallel/
- [x] built-in code coverage: https://www.node-tap.org/coverage/

We will cover `beforeEach` by adding a real world "coin supply"
to our vending machine example below. <br />

> **`Tap`** has _many_ more "advanced" features,
> if you are _curious_ see: https://www.node-tap.org/advanced <br />
> But don't get distracted by the "bells and whistles",
> focus on building your App/Project and if you find
> that you are repeating yourself a lot in your tests,
> open an issue describing the problem e.g:

# _How_?

Continuing our theme of a "_vending machine_",
let's consider the following _real world_ use case:
The Vending Machine "runs out" of coins and needs to be _re-filled_!

We will add this functionality to the `calculateChange` function
and showcase a useful **`Tap`** feature: `beforeEach` <br />
Once those basics are covered,
we will dive into something _way_ more _ambitious_!

## 1. Install `Tap` as a Dev Dependency

Start by installing `Tap` ]
and saving it to your `package.json`:

```sh
npm install tap -D
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
const test = require("tape");
```

To:

```js
const test = require("tap").test;
```

## 4. Run the Test

Run the **`Tap`** tests:

```sh
node test/change-tap.test.js
```

The output is slightly different from **`Tape`**,
but the tests still pass:

![tap-tests-pass](https://user-images.githubusercontent.com/194400/47609430-48d7ee00-da36-11e8-9f3c-f448f78311bb.png)

## 5. New Requirement: Real World Coin "Supply"

In the "real world" the coins in the machine will be given out
as change to the people buying products and may "run out".
Therefore having a _fixed_ Array of coins in the `calculateChange` function
is _artificially_ setting expectations that might not reflect _reality_.

We need a way of (_optionally_) passing
the array of coins into the `calculateChange` function
but having a _default_ array of coins
so the _existing_ tests continue to pass.

> **Note**: for brevity, we are using the _functional_ solution
> to `calculateChange` function. <br />
> If this is unfamiliar to you,
> please see: https://github.com/dwyl/learn-tdd#functional

### 5.1 Add `coinsAvail` (_optional_) parameter to JSDOC

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
 * calculateChange accepts three parameters (totalPayable, cashPaid, coinsAvail)
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

- the argument will be called `coinsAvail` and
- a default value of `COINS` (_the default Array of coins_) will be set
  if the argument is undefined.
- the `[ ]` (_square brackets_) around
  the parameter definition indicates that it's _optional_.

More detail on optional parameters in JSDOC comments, <br />
see: http://usejsdoc.org/tags-param.html#optional-parameters-and-default-values

The _full_ file should now look like this:
[`lib/change-calculator.js`](https://github.com/dwyl/learn-tape/blob/d157a609ad8f2900588b1e118624b6e17d4c36c9/lib/change-calculator.js)

> At this point nothing in the `calculateChange` function or tests has changed,
> so if you run the tests,
> you should see _exactly_ the same output as above in step 4;
> all tests still pass.

### 5.2 Add a _Test_ For the New `coinsAvail` Parameter

Add the following test to your `test/change-tap.test.js` file:

```js
test("Vending Machine has no £1 coins left! calculateChange(1337, 1500, [200, 50, 50, 50, 10, 5, 2, 1]) should equal [100, 50, 10, 2, 1 ]", function(t) {
  const result = calculateChange(1337, 1500, [200, 50, 50, 50, 10, 5, 2, 1]);
  const expected = [50, 50, 50, 10, 2, 1]; // £1.63
  t.deepEqual(result, expected, "calculateChange returns the correct change");
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
module.exports = function calculateChange(totalPayable, cashPaid, coinsAvail) {
  return COINS.reduce(function(change, coin) {
    // etc.
  }, []);
};
```

After:

```js
module.exports = function calculateChange(totalPayable, cashPaid, coinsAvail) {
  const coins = coinsAvail || COINS; // if coinsAvail param undefined use COINS
  return coins.reduce(function(change, coin) {
    // etc.
  }, []);
};
```

This should be _enough_ code to make the test defined above in step 5.2 _pass_.
Save your changes to the `calculateChange` function and re-run the tests:

```sh
node test/change-tap.test.js
```

You should see all the tests _pass_:

![coinsAvail-test-passing](https://user-images.githubusercontent.com/194400/47610513-fbb44600-da4e-11e8-9593-683735cde5a6.png)

That's it, you've satisfied the requirement of allowing a
`coinsAvail` ("Coins Available") array
to be passed into the `calculateChange` function.

But hold on ... are we _really_ testing the _real-world_ scenario
where the coins are _removed_ from the `coinsAvail` ("supply") each time
the Vending Machine gives out change...?

The answer is "No".
All our _previous_ tests assume an infinite supply of coins
and the _latest_ test simply passes in the array of `coinsAvail`,
we are not _removing_ the coins from the `coinsAvail` Array.

### 5.5 Reduce the "Supply" of Available Coins

In the "_real world_" we need to reduce the coins in the vending machine
each time change is given.

Imagine that the vending machine starts out
with a supply of **10** of _each_ coin:

```js
let COINS = [
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1
];
```

This is a total of **80 coins**; 8 coin types x 10 of each type.

Each time the machine returns coins we need to _remove_ them from the supply
otherwise we could end up giving the _incorrect_ change
because the machine may attempt to disburse coins which it does not _have_.

Let's create a new module/function to implement this requirement.

> <small>_**Note**: for the purposes of this tutorial/example we are allocating
> 10 of each type of coin to the "supply". <br />
> If we want represent the **actual** coins in circulation,
> we would need to apportion coins according to their popularity, <br /> see_:
> https://en.wikipedia.org/wiki/Coins_of_the_pound_sterling#Coins_in_circulation > </small>

#### 5.5.1 Create the `lib/vending-machine.js` File

Create the `new` file for the more "advanced" Vending Machine functionality:

```sh
atom lib/vending-machine.js
```

#### 5.5.2 Write JSDOC for the `reduceCoinSupply` function

Following "Documentation Driven Development" (DDD),
we write the JSDOC Documentation comment _first_
and consider the function signature up-front.

```js
/**
 * reduceCoinSupply removes the coins being given as change from the "supply"
 * so that the vending machine does not attempt to give coins it does not have!
 * @param {number} cashPaid the integer amount (in pennies) the person paid
 * @param {array} coinsAvail supply of coins to chose from when giving change.
 * @param {array} changeGiven the list of coins returned as change.
 * @returns {array} list of coins available in the vending machine
 * @example reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]); // [200, 1]
 */
function reduceCoinSupply(coinsAvail, changeGiven) {}
```

By now the JSDOC syntax should be _familiar_ to you.
If not, see: https://github.com/dwyl/learn-jsdoc

> Document-Driven Development as an engineering discipline
> takes a bit of getting used to,
> but it's _guaranteed_ to result in more maintainable code.
> As a beginner, this may not be your primary focus,
> but the more experienced you become as a engineer,
> the more you will value maintainability;
> writing maintainable code is a _super power_ everyone can achieve!

#### 5.5.3 Write a _Test_ for the `reduceCoinSupply` function

Create the file `test/vending-machine.test.js`
and add the following code to it:

```js
const test = require("tap");
const vendingMachine = require("../lib/vending-machine.js");
const reduceCoinSupply = vendingMachine.reduceCoinSupply;

tap.test(
  "reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]); returns [200, 1]",
  function(t) {
    const result = reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]);
    const expected = [200, 1];
    t.deepEqual(
      result,
      expected,
      "reduceCoinSupply reduces the coinsAvail by the coins given as change"
    );
    t.end();
  }
);
```

Save the file and run the test:

```sh
node test/vending-machine.test.js
```

You should see it _fail_:

![reduceCoinSupply-failing-test-not-a-function](https://user-images.githubusercontent.com/194400/47623074-9b7fdb80-db04-11e8-8b79-706d858b3b27.png)

#### 5.5.4 Write _Just Enough_ Code to Make the Test Pass!

In the `lib/vending-machine.js` file,
write _just_ enough code in the `reduceCoinSupply` function body
to make the test pass.

Remember to _export_ the function at the end of the file:

```js
module.exports = {
  reduceCoinSupply: reduceCoinSupply
};
```

Try to solve this challenge yourself (_or in pairs/teams_)
_before_ looking at the "solution":
[`lib/vending-machine.js > reduceCoinSupply`](https://github.com/dwyl/learn-tape/blob/4237175283ff36777fb7631aa52cbbefbf578853/lib/vending-machine.js#L10)

When it passes you should see:

![reduceCoinSupply-test-passing](https://user-images.githubusercontent.com/194400/47623473-e0f2d780-db09-11e8-9dbb-48493ee0352e.png)

#### 5.5.5 Write _Another_ Test Example!

To "_exercise_" the `reduceCoinSupply` function,
let's add another test example. <br />
Add the following test to the `test/vending-machine.test.js` file:

```js
tap.test("reduceCoinSupply remove more coins!", function(t) {
  const COINS = [
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
  const remove = [
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    20,
    20,
    20,
    20,
    20,
    20,
    10,
    10,
    10,
    10,
    10,
    5,
    5,
    5,
    5,
    2,
    2,
    2,
    1,
    1
  ];
  const expected = [
    200,
    100,
    100,
    50,
    50,
    50,
    20,
    20,
    20,
    20,
    10,
    10,
    10,
    10,
    10,
    5,
    5,
    5,
    5,
    5,
    5,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];

  const result = reduceCoinSupply(COINS, remove);
  t.deepEqual(
    result,
    expected,
    "reduceCoinSupply removes coins from supply of coinsAvail"
  );
  t.end();
});
```

You should not need to make any changes to your `reduceCoinSupply` function.
Simply saving the test file and re-running the Tap tests:

```sh
node test/vending-machine.test.js
```

You should see the _both_ tests pass:

![remove-more-coins-passing](https://user-images.githubusercontent.com/194400/47623857-f8cc5a80-db0d-11e8-82da-e828a00e7ca6.png)

So far so good, we have a way of reducing the coins available
but there is still an
["elephant in the room"](https://en.wikipedia.org/wiki/Elephant_in_the_room) ...
how does the Vending Machine **keep track**
of the **coins** it has _**available**_?
i.e the "**state**" of the machine.

### 5.6 How Does the Vending Machine Maintain "State"?

The vending machine needs to "_know_" how many coins it still has,
to avoid trying to give coins it does not have available.

> There are a _number_ of ways of doing "state management".
> Our favourite is the Elm Architecture.
> We wrote a _dedicated_ tutorial for it; see:
> https://github.com/dwyl/learn-elm-architecture-in-javascript <br />
> However to illustrate a _less_ sophisticated state management
> we are using a _global_ `COINS` Array.

#### 5.6.1 Create a Test for the Vending Machine `COINS` "Initial State"

In your `test/vending-machine.test.js` file add the following code:

```js
tap.test("Check Initial Supply of Coins in Vending Machine", function(t) {
  const COINS = [
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
  t.deepEqual(
    vendingMachine.getCoinsAvail(),
    COINS,
    "vendingMachine.getCoinsAvail() gets COINS available in Vending Machine"
  );
  vendingMachine.setCoinsAvail([1, 2, 3]);
  t.deepEqual(
    vendingMachine.getCoinsAvail(),
    [1, 2, 3],
    "vendingMachine.setCoinsAvail allows us to set the COINS available"
  );
  t.end();
});
```

If you run the tests,

```sh
node test/vending-machine.test.js
```

you will see the last one fail:
![coin-supply-test-fail](https://user-images.githubusercontent.com/194400/47670542-5cee2d80-dba5-11e8-820b-811de276d8dd.png)

#### 5.6.2 Write the Code to Make the Test _Pass_

In `lib/vending-machine.js` file,
after the `reduceCoinSupply` function definition,
add the following variable declaration and pair of functions:

```js
// GOLBAL Coins Available Array. 10 of each type of coin.
let COINS = [
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1
];

/**
 * setCoinsAvail a "setter" for the COINS Array
 * @param {Array} coinsAvail the list of available coins
 */
function setCoinsAvail(coinsAvail) {
  COINS = coinsAvail;
}

/**
 * getCoinsAvail a "getter" for the COINS Array
 */
function getCoinsAvail() {
  return COINS;
}
```

We will _use_ the `COINS` array
and both the "getter" and "setter"
in the next step.
For now, simply _export_ "getter" and "setter" so the test will pass:

```js
module.exports = {
  reduceCoinSupply: reduceCoinSupply,
  setCoinsAvail: setCoinsAvail,
  getCoinsAvail: getCoinsAvail
};
```

Re-run the test and watch it _pass_:

![coins-test-passing](https://user-images.githubusercontent.com/194400/47670720-d2f29480-dba5-11e8-8187-48b1b3fa7017.png)

### 5.7 Vending Machine > `sellProduct` Function

We already have a `calculateChange` function
which calculates the change for a given amount of money received
and price of product being purchased,
and we have the `reduceCoinSupply` function which removes coins
from the "supply" the vending machine has.
These can be considered "internal" functions.

Now _all_ we have to do is _combine_ these two functions into a
"public interface" which handles _both_ calculating change
and disbursing the coins from the supply.

#### 5.7.1 Write JSDOC Comment for `sellProduct` Function

Add the following JSDOC comment and function signature to
the `lib/vending-machine.js` file:

```js
/**
 * sellProduct accepts three parameters (totalPayable, coinsPaid and coinsAvail)
 * and calculates the change in "coins" that needs to be returned.
 * @param {number} totalPayable the integer amount (in pennies) to be paid
 * @param {array} coinsPaid the list of coins (in pennies) the person paid
 * @param {array} [coinsAvail=COINS] the list of coins available to select from.
 * @returns {array} list of coins we need to dispense to the person as change
 * @example sellProduct(215, [200, 100]); // returns [50, 20, 10, 5]
 */
function sellProduct(totalPayable, coinsPaid, coinsAvail) {}
```

Things to note here:
the JSDOC and function signature
are _similar_ to the `calculateChange` function
the key distinction is the second parameter: `coinsPaid`.
The vending machine receives a list of _coins_ when the person makes a purchase.

#### 5.7.2 Craft a _Test_ for the `sellProduct` Function

In your `test/vending-machine.test.js` file add the following code:

```js
tap.test(
  "sellProduct(215, [200, 100], COINS) returns [50, 20, 10, 5]",
  function(t) {
    const COINS = vendingMachine.getCoinsAvail();
    const coinsPaid = [200, 100];
    const result = vendingMachine.sellProduct(215, coinsPaid, COINS);
    const expected = [50, 20, 10, 5];
    t.deepEqual(
      result,
      expected,
      "sellProduct returns the correct coins as change"
    );

    // check that the supply of COINS Available in the vendingMachine was reduced:
    t.deepEqual(
      vendingMachine.getCoinsAvail(),
      reduceCoinSupply(COINS, result),
      "running the sellProduct function reduces the COINS the vending machine"
    );
    t.end();
  }
);
```

> <small> _**Note**: you will have noticed both from the JSDOC and
> the test invocation that the `sellProduct` function returns **one**
> array; the list of coins to give the customer as change.
> JavaScript does not have a
> ["tuple"](https://elixir-lang.org/getting-started/basic-types.html)
> primitive
> (which would allow a function to return multiple values),
> so we can either return an `Object` in the `sellProduct` function
> or `return` **just** the Array of coins
> to be given to the customer as change.
> The second assertion in the test shows that the COINS array in
> vendingMachine module is being "mutated" by the `sellProduct` function.
> This is an **undesirable** "**side effect**" but
> this illustrates something you are likely to see in the "wild".
> If you feel "uncomfortable" with this "impure" style, and you should,
> consider learning a functional language like Elm, Elixir or Haskell_ > _JavaScript "works", but it's **ridiculously easy**
> to **inadvertently introduce bugs** and "unsafety".
> which is why [sanctuary](https://github.com/sanctuary-js/sanctuary)
> exists._ </small><br />

If you run the tests:

```sh
node test/vending-machine.test.js
```

you will see the last one _fail_:

![sellProduct-test-fail](https://user-images.githubusercontent.com/194400/47678596-1bb44880-dbba-11e8-8927-892149a201bd.png)

#### 5.7.3 _Implement_ the `sellProduct` Function to Pass the Test

The `sellProduct` function will _invoke_ the `calculateChange` function,
so the _first_ thing we need to do is import it.

At the top of the `lib/vending-machine.js` file,
add the following line:

```js
const calculateChange = require("./change-calculator.js");
```

Now we can implement `sellProduct` which should only a few lines
invoking other functions.
Again, try implementing it yourself (_or in pairs/teams_),
before looking at the
[`vendingMachine.sellProduct` solution]()

Don't forget to **`export`** the `sellProduct` function.

#### 5.7.4 What is the State?

During the execution of our last test for the `sellProduct` function,
the `COINS` array in the Vending Machine has been altered.

Let's write another test to illustrate this.

In your `test/vending-machine.test.js` file add the following code:

```js
tap.test("Check COINS Available Supply in Vending Machine", function(t) {
  const coinsAvail = vendingMachine.getCoinsAvail();
  t.equal(
    coinsAvail.length,
    76,
    "vendingMachine.getCoinsAvail() shows COINS in Vending Machine is " +
      coinsAvail.length
  );
  t.end();
});
```

If you followed all the previous steps the test will pass,
meaning that the `COINS` array in the `vendingMachine`
was _modified_ by the _previous_ (`sellProduct`) test.

![COINS-available-76](https://user-images.githubusercontent.com/194400/47731483-1c9db680-dc5c-11e8-9e22-5fc295ab36d5.png)

The _initial_ state for the `COINS` array
that we defined in step **5.6.2** (_above_)
was **80 Coins**,
but after executing the `sellProduct` test it's **76 coins**.

It both _simulates_ the "**_real world_**" and creates a testing "_headache_";
modifying the `COINS` array (_the vending machine's coins available "state"_)
is _desirable_ because in the _real world_ each time an item is sold
the state of `COINS` _should_ be updated.
But it means we need to "_reset_" the `COINS` array between _tests_
otherwise we will end up writing _coupled_ ("_co-dependent_") tests.

### 5.8 _Reset_ `COINS` State in Vending Machine Between Tests?

Given that the `COINS` state in the vending machine is being
modified by the `sellProduct` function,
and the fact that we don't _want_ tests to be co-dependent,
we _either_ need to "reset" the state of `COINS` _inside_ each test,
**_or_** we need to reset the state of `COINS` _before_ each test.

Here is the difference:

#### 5.8.1 Reset `COINS` State at the Top of _Each_ Test

```js
tap.test("Check COINS Available Supply in Vending Machine", function(t) {
  const COINS = [
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
  vendingMachine.setCoinsAvail(COINS);
  const coinsAvail = vendingMachine.getCoinsAvail();
  t.equal(
    coinsAvail.length,
    80,
    "vendingMachine.getCoinsAvail() shows COINS in Vending Machine is " +
      coinsAvail.length
  );
  t.end();
});

tap.test(
  "sellProduct(1337, [1000, 500], coinsAvail) >> [100, 50, 10, 2, 1]",
  function(t) {
    const COINS = [
      200,
      200,
      200,
      200,
      200,
      200,
      200,
      200,
      200,
      200,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      50,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    vendingMachine.setCoinsAvail(COINS);
    let coinsAvail = vendingMachine.getCoinsAvail();
    const expected = [100, 50, 10, 2, 1];
    const result = vendingMachine.sellProduct(1337, [1000, 500], coinsAvail);
    t.equal(
      result,
      expected,
      "sellProduct(1337, [1000, 500], coinsAvail) is " + result
    );

    coinsAvail = vendingMachine.getCoinsAvail();
    t.equal(
      coinsAvail.length,
      75, // 80 minus the coins dispensed (5)
      "vendingMachine.getCoinsAvail() shows COINS in Vending Machine is " +
        coinsAvail.length
    );
    t.end();
  }
);
```

As you can see these two tests share the same "setup" or "reset state" code:

```js
const COINS = [
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  200,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  50,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1
];
vendingMachine.setCoinsAvail(COINS);
const coinsAvail = vendingMachine.getCoinsAvail();
```

We can _easily_ remove this identical duplication of code
by using one of **`Tap`**'s built-in testing helper functions: `beforeEach`!

#### 5.8.1 Reset `COINS` State `beforeEach` Test

We can re-write the two preceding tests
and eliminate the duplication,
by using the **`Tap`** `beforeEach` function
to reset the test _before_ each test:

```js
tap.beforeEach(function(done) {
  // reset state of COINS before each test:
  const COINS = [
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    200,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
  vendingMachine.setCoinsAvail(COINS);
  done();
});

tap.test("Check COINS Available Supply in Vending Machine", function(t) {
  const coinsAvail = vendingMachine.getCoinsAvail();
  t.equal(
    coinsAvail.length,
    80,
    "vendingMachine.getCoinsAvail() shows COINS in Vending Machine is " +
      coinsAvail.length
  );
  t.end();
});

tap.test(
  "sellProduct(1337, [1000, 500], coinsAvail) >> [100, 50, 10, 2, 1]",
  function(t) {
    let coinsAvail = vendingMachine.getCoinsAvail();
    const expected = [100, 50, 10, 2, 1];
    const result = vendingMachine.sellProduct(1337, [1000, 500], coinsAvail);
    t.deepEqual(
      result,
      expected,
      "sellProduct(1337, [1000, 500], coinsAvail) is " + result
    );

    coinsAvail = vendingMachine.getCoinsAvail();
    t.equal(
      coinsAvail.length,
      75, // 80 minus the coins dispensed (5)
      "vendingMachine.getCoinsAvail() shows COINS in Vending Machine is " +
        coinsAvail.length
    );
    t.end();
  }
);
```

Both of these approaches will give the same _result_:

![before-each-test-passing](https://user-images.githubusercontent.com/194400/47737541-0ea26280-dc69-11e8-96b2-f41257fb802b.png)

But the `beforeEach` approach has an _immediate_ benefit in terms of
reduction of duplicate code in tests
which is less to read (_reduces cognitive load_)
and easier to maintain (_if the "reset state" code needs to be changed,
it's changed in one place_).

# _Now_ What?

If you found this _taster_ on testing with **`Tap`**
helpful, consider reading our more _comprehensive_ Todo List example:
https://github.com/dwyl/todomvc-vanilla-javascript-elm-architecture-example .

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
> you need a geared bicycle for the long stretches!
> Also, if you _never_ ride a bicycle - for whatever reason -
> and don't appreciate the difference between
> single speed and geared bikes this analogy might feel less relevant ...
> in which case we recommend a bit of background reading:
> https://bicycles.stackexchange.com/questions/1983/why-ride-a-single-speed-bike > </small>

<br />

# _Why_ NOT Use `Tap` _Everywhere_?

One of the _benefits_ of Free/Open Source software
is that there is near-zero
["switching cost"](https://en.wikipedia.org/wiki/Switching_barriers).
Since we aren't paying for the code,
the only "cost" to adopting a new tool is **_learning_ time**.

Given that **`Tap`** is a "drop-in replacement" for **`Tape`**
in _most_ cases, the switching cost is just **`npm install tap -D`**
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
and running them in **_parallel_** significantly reduces waiting time.

For an _extended_ practical example of where writing tests with **`Tap`**
_instead_ of **`Tape`** was worth the switch,
see: https://github.com/dwyl/todomvc-vanilla-javascript-elm-architecture-example .
