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
  return coinsAvail.map(function(coin) {

    for(let i = 0; i < change.length; i++) {
      if (change[i] === coin) {
        change.splice(i, 1);
        return; // return early! (removes the coin from the returned array!)
      }
    }

    return coin; // the "supply" of available coins
  }).filter(Boolean); // avoid null values ¯\_(ツ)_/¯ JavaScript ...
}


module.exports = {
  reduceCoinSupply: reduceCoinSupply
}
