// get the elements from the DOM
const inc = document.querySelector('.inc');
const dec = document.querySelector('.dec');
const reset = document.querySelector('.reset');
const count = document.querySelector('.count');
const error = document.querySelector('.error');

//current count varies, so we have it as a function so we can always get the up to date version
function currentCount() {
  return document.querySelector('.count').textContent;
}

// write the functions
function increment(number) {
  //we want to make sure that the argument being passed in as a number, so we coerce it to be a number
  number = Number(number);
  //if Number is passed something which cannot be coerced to be a number it will return 'NaN' (not a number), you can check if something is NaN with the isNaN function
  if (isNaN(number)) {
    //if the argument passed in is not a number we don't want to do anything and tell the user that something was wrong
    return updateDom(
      'Error: Argument passed to increment was not a number',
      error
    );
  }
  return number + 1;
}

function decrement(number) {
  number = Number(number);
  if (isNaN(number)) {
    return updateDom(
      'Error: Argument passed to decrement was not a number',
      error
    );
  }
  return number - 1;
}

function resetFunc() {
  return 0;
}

function updateDom(text, node) {
  node.textContent = text;
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
// We ignore it for code coverage as it is only here for testing
/*istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    increment: increment,
    decrement: decrement,
    resetFunc: resetFunc,
    updateDom: updateDom,
    currentCount: currentCount,
  };
}
