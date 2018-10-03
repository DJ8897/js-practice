resetLeaveApplicationForm();

function getLeaveApplicationValues() {
  const employeeName = document.getElementById('employeeNameInput').value;
  const managerName = document.getElementById('managerNameInput').value;
  const startDate = document.getElementById('startDateInput').value;
  const endDate = document.getElementById('endDateInput').value;

  return { employeeName, managerName, startDate, endDate };
}

function validateLeaveApplicationInputs(leaveApplicationInputs) {
  let isError = false;
  if (leaveApplicationInputs.employeeName === '') {
    document.getElementById('validateEmployeeName').style.visibility = 'visible';
    isError = true;
  }
  if (leaveApplicationInputs.managerName === '') {
    document.getElementById('validateManagerName').style.visibility = 'visible';
    isError = true;
  }
  if (leaveApplicationInputs.startDate === '') {
    document.getElementById('validateStartDate').style.visibility = 'visible';
    document.getElementById('validateStartDate').innerHTML = 'Please enter start date';
    isError = true;
  } else {
    const date1 = new Date(leaveApplicationInputs.startDate);
    if (date1.toString() === 'Invalid Date') {
      document.getElementById('validateStartDate').style.visibility = 'visible';
      document.getElementById('validateStartDate').innerHTML = 'Please enter valid start date';
      isError = true;
    }
  }
  if (leaveApplicationInputs.endDate === '') {
    document.getElementById('validateEndDate').style.visibility = 'visible';
    document.getElementById('validateEndDate').innerHTML = 'Please enter end date';
    isError = true;
  } else {
    const date2 = new Date(leaveApplicationInputs.endDate);
    if (date2.toString() === 'Invalid Date') {
      document.getElementById('validateEndDate').style.visibility = 'visible';
      document.getElementById('validateEndDate').innerHTML = 'Please enter valid end date';
      isError = true;
    }
  }

  if (isError) {
    return false;
  }
  return true;
}

// function addLeaveApplication() {
//   const leaveApplicationInputs = getLeaveApplicationValues();
//   if (validateLeaveApplicationInputs(leaveApplicationInputs)) {
//     console.log('hi');
//   }
//   console.log('nope');
// }
function addLeaveApplication() {
  const leaveApplicationInputs = getLeaveApplicationValues();
  if (validateLeaveApplicationInputs(leaveApplicationInputs)) {
    var startDate = new Date(leaveApplicationInputs.startDate); // date format must be in mm/DD/yyyy, avu label muki deje date fields ni niche
    var endDate = new Date(leaveApplicationInputs.endDate);
    var diffDays = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    alert(leaveApplicationInputs.employeeName + ' has applied for leave of ' + diffDays + ' days.');
  }
  console.log('nope');
}

function resetLeaveApplicationForm() {
  document.getElementById('leaveApplicationForm').reset();

  document.getElementById('validateEmployeeName').style.visibility = 'hidden';
  document.getElementById('validateManagerName').style.visibility = 'hidden';
  document.getElementById('validateStartDate').style.visibility = 'hidden';
  document.getElementById('validateEndDate').style.visibility = 'hidden';
}

String.prototype.toTitleCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
