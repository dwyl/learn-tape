

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

}
