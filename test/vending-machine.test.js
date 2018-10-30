const tap = require('tap');
const vendingMachine = require('../lib/vending-machine.js');
const reduceCoinSupply = vendingMachine.reduceCoinSupply;

tap.test('reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]); returns [200, 1]', function (t) {
  const result = reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]);
  const expected = [200, 1];
  t.deepEqual(result, expected,
    'reduceCoinSupply reduces the coinsAvail by the coins given as change');
  t.end();
});

tap.test('reduceCoinSupply remove more coins!', function (t) {
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
  t.deepEqual(result, expected,
    'reduceCoinSupply removes coins from supply of coinsAvail');
  t.end();
});

tap.test('Check Initial Supply of Coins in Vending Machine', function (t) {
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
  t.deepEqual(vendingMachine.getCoinsAvail(), COINS,
    'vendingMachine.getCoinsAvail() gets COINS available in Vending Machine');
  vendingMachine.setCoinsAvail([1,2,3]);
  t.deepEqual(vendingMachine.getCoinsAvail(), [1,2,3],
    'vendingMachine.setCoinsAvail allows us to set the COINS available');
  t.end();
});

tap.test('sellProduct(215, [200, 100], COINS) returns [50, 20, 10, 5]', function (t) {
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
  vendingMachine.setCoinsAvail(COINS);
  const coinsPaid = [200, 100];
  const result = vendingMachine.sellProduct(215, coinsPaid,
      vendingMachine.getCoinsAvail());
  const expected = [50, 20, 10, 5];
  t.deepEqual(result, expected,
    'sellProduct returns the correct coins as change');
  // check that the supply of COINS Available in the vendingMachine was reduced:
  t.deepEqual(vendingMachine.getCoinsAvail(), reduceCoinSupply(COINS, result),
    'running the sellProduct function reduces the COINS the vending machine');
  t.end();
});

tap.test('Check COINS Available Supply in Vending Machine', function (t) {
  const coinsAvail = vendingMachine.getCoinsAvail()
  t.equal(coinsAvail.length, 76,
    'vendingMachine.getCoinsAvail() shows COINS in Vending Machine is ' +
    coinsAvail.length);
  t.end();
});
