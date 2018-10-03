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
  if(leaveApplicationInputs.employeeName === ''){
    document.getElementById('validateEmployeeName').style.visibility = 'visible';
    isError =true;
  }
  if(leaveApplicationInputs.managerName === ''){
    document.getElementById('validateManagerName').style.visibility = 'visible';
    isError =true;
  }
  if(leaveApplicationInputs.startDate === ''){
    document.getElementById('validateStartDate').style.visibility = 'visible';
    document.getElementById('validateStartDate').innerHTML="Please enter valid start date";
    isError =true;
  }
  else{
		const date1 = new Date(leaveApplicationInputs.startDate);
		if(date1.toString() === 'Invalid Date') {
			document.getElementById('validateStartDate').style.visibility = 'visible';
      document.getElementById('validateStartDate').innerHTML="Please enter start date";
      isError =true;
    }
  if(leaveApplicationInputs.endDate === ''){
    document.getElementById('validateEndDate').style.visibility = 'visible';
    isError =true;
  }

  if(isError){
    return false;
  }
  return true;
}

function addLeaveApplication(){
  const leaveApplicationInputs = getLeaveApplicationValues();
  if( validateLeaveApplicationInputs(leaveApplicationInputs)){
    console.log('hi');
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
}
