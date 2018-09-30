function appendValue(param) {
  document.getElementById('display').value += param;
}

function calculate() {
  var expression = document.getElementById('display').value;
  document.getElementById('display').value = eval(expression);
}

function clears() {
  console.log("hi");
  document.getElementById('display').value = '';
}
