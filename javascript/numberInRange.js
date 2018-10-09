function rangeCalc() {
  var startR = document.getElementById('startR').value;
  var endR = document.getElementById('endR').value;
  var n = document.getElementById('num').value;

  if (startR > endR) {
    if (n <= startR && n >= endR) {
      document.getElementById('ans').innerHTML = 'Yup number is in range !!';
    } else {
      document.getElementById('ans').innerHTML = 'Oops!! Not in range.';
    }
  } else {
    if (n >= startR && n <= endR) {
      document.getElementById('ans').innerHTML = 'Yup number is in range !!';
    } else {
      document.getElementById('ans').innerHTML = 'Oops!! Not in range.';
    }
  }
}
