const calculateChange = require('./change-calculator.js');

/**
 * reduceCoinSupply removes the coins being given as change from the "supply"
 * so that the vending machine does not attempt to give coins it does not have!
 * @param {number} cashPaid the integer amount (in pennies) the person paid
 * @param {array} [coinsAvail=COINS] the supply of coins to select change from.
 * @param {array} changeGiven the list of coins returned as change.
 * @returns {array} list of coins available in the vending machine
 * @example reduceCoinSupply([200, 100, 50, 10, 1], [100, 50, 10]); // [200, 1]
 */
function reduceCoinSupply (coinsAvail, changeGiven) {

  let change = changeGiven.slice(); // clone changeGiven Array non-destructively
  return coinsAvail.map(function (coin) {

    for (let i = 0; i < change.length; i++) {
      if (change[i] === coin) {
        change.splice(i, 1);
        return; // return early! (removes the coin from the returned array!)
      }
    }

    return coin; // the "supply" of available coins
  }).filter(Boolean); // avoid null values ¯\_(ツ)_/¯ JavaScript ...
}

// GOLBAL Coins Available Array.
let COINS = [
  200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
  50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

/**
 * setCoinsAvail a "setter" for the COINS Array
 * @param {Array} coinsAvail the list of available coins
 */
function setCoinsAvail (coinsAvail) {
  COINS = coinsAvail;
}

/**
 * getCoinsAvail (a "getter") retrieves the COINS Array
 */
function getCoinsAvail () {
  return COINS;
}

/**
 * sellProduct accepts three parameters (totalPayable, coinsPaid and coinsAvail)
 * and calculates the change in "coins" that needs to be returned.
 * @param {number} totalPayable the integer amount (in pennies) to be paid
 * @param {array} coinsPaid the list of coins (in pennies) the person paid
 * @param {array} [coinsAvail=COINS] the list of coins available to select from.
 * @returns {array} list of coins we need to dispense to the person as change
 * @example sellProduct(215, [200, 100]); // returns [50, 20, 10, 5]
 */
function sellProduct (totalPayable, coinsPaid, coinsAvail) {
  const cashPaid = coinsPaid.reduce( function(sum, c) { return sum + c }, 0);
  const change = calculateChange(totalPayable, cashPaid, coinsAvail);
  // remove the coins we are about to return as change from the coinsAvail:
  setCoinsAvail(reduceCoinSupply(coinsAvail, change));
  return change;
}


module.exports = {
  reduceCoinSupply: reduceCoinSupply,
  setCoinsAvail: setCoinsAvail,
  getCoinsAvail: getCoinsAvail,
  sellProduct: sellProduct
}
