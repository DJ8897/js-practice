function calculator() {
  console.log("hi");
  var n1 = document.getElementById('num1').value;
  var n2 = document.getElementById('num2').value;

  var n1 = parseInt(n1);
  var n2 = parseInt(n2);

  var op = document.getElementById('op1').value;

   switch (op) {
     case '+':
       document.getElementById('ans').value = n1 + n2;
       break;
     case '-':
       document.getElementById('ans').value = n1 - n2;
       break;
     case '*':
       document.getElementById('ans').value = n1 * n2;
       break;
     case '/':
       document.getElementById('ans').value = n1 / n2;
       break;
     case '%':
       document.getElementById('ans').value = n1 % n2;
       break;
     default:
       document.getElementById("ans").value = "Not operator";
   }
}
