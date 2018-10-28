const test = require('tap').test;
const vendingMachine = require('../lib/vending-machine.js');
const reduceCoinSupply = vendingMachine.reduceCoinSupply;

test('reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]); returns [200, 1]', function (t) {
  const result = reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]);
  const expected = [200, 1];
  t.deepEqual(result, expected);
  t.end();
});
