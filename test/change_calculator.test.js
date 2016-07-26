var test = require('tape'); // assing the tape library to the variable "test"
var C = require('../lib/change_calculator.js');  // our module

test('should return -1 when the value is not present', function (t) {
  t.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so
  t.end()
});
