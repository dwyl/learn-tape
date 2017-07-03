// get the elements from the DOM
var inc = document.querySelector('.inc');
var dec = document.querySelector('.dec');
var reset = document.querySelector('.reset');
var count = document.querySelector('.count');

//current count varies, so we have it as a function so we can always get the up to date version
function currentCount() {
  return document.querySelector('.count').textContent;
}

// write the functions
function increment(number) {
  number = Number(number);
  if (isNaN(number)) {
    return handleError('Argument passed to increment was not a number');
  }
  return number + 1;
}

function decrement(number) {
  number = Number(number);
  if (isNaN(number)) {
    return handleError('Argument passed to decrement was not a number');
  }
  return number - 1;
}

function resetFunc() {
  return 0;
}

function updateDom(number, node) {
  node.textContent = number;
}

function handleError(errorText) {
  // do something with the error text
  console.log(errorText);
}

//attach the event listeners

inc.addEventListener('click', function() {
  //call increment on the current value of
  // update the dom using increment, passing the current value of count in, and the dom node for the count
  updateDom(increment(currentCount()), count);
});

dec.addEventListener('click', function() {
  updateDom(decrement(currentCount()), count);
});

reset.addEventListener('click', function() {
  updateDom(resetFunc(), count);
});

// initialise count as 0
updateDom(0, count);

// This is for testing with tape, we need to check if we're in node or if we're in the browser, then export if we are in node
/*istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    increment: increment,
    decrement: decrement,
    reset: reset,
    updateDom: updateDom,
    handleError: handleError,
  };
}
