const test = require('tap').test;
const vendingMachine = require('../lib/vending-machine.js');
const reduceCoinSupply = vendingMachine.reduceCoinSupply;

test('reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]); returns [200, 1]', function (t) {
  const result = reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]);
  const expected = [200, 1];
  t.deepEqual(result, expected);
  t.end();
});

test('reduceCoinSupply remove more coins!', function (t) {
  const COINS = [
    200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
  const remove = [
    200, 200, 200, 200, 200, 200, 200, 200, 200,
    100, 100, 100, 100, 100, 100, 100, 100,
    50, 50, 50, 50, 50, 50, 50,
    20, 20, 20, 20, 20, 20,
    10, 10, 10, 10, 10,
    5, 5, 5, 5,
    2, 2, 2,
    1, 1,
  ];
  const expected = [
    200,
    100, 100,
    50, 50, 50,
    20, 20, 20, 20,
    10, 10, 10, 10, 10,
    5, 5, 5, 5, 5, 5,
    2, 2, 2, 2, 2, 2, 2,
    1, 1, 1, 1, 1, 1, 1, 1
  ];

  const result = reduceCoinSupply(COINS, remove);
  t.deepEqual(result, expected);
  t.end();
});
