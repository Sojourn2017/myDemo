// greet,js

module.exports = function() {
  var greeter = document.createElement('div');
  greeter.innerText = "Hello webpack!";
  return greeter;
};